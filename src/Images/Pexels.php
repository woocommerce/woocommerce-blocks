<?php

namespace Automattic\WooCommerce\Blocks\Images;

use Automattic\WooCommerce\Blocks\AI\Connection;
use Automattic\WooCommerce\Blocks\Patterns\PatternUpdater;

/**
 * Pexels API client.
 *
 * @internal
 */
class Pexels {

	/**
	 * The Pexels API endpoint.
	 */
	const EXTERNAL_MEDIA_PEXELS_ENDPOINT = '/wpcom/v2/external-media/list/pexels';

	/**
	 * Returns the list of images for the given search criteria.
	 *
	 * @param Connection $ai_connection The AI connection.
	 * @param string     $token The JWT token.
	 * @param string     $business_description The business description.
	 *
	 * @return array|\WP_Error Array of images, or WP_Error if the request failed.
	 */
	public function get_images( $ai_connection, $token, $business_description ) {
		if ( str_word_count( $business_description ) === 1 ) {
			$search_term = $business_description;
		} else {
			$search_term = $this->define_search_term( $ai_connection, $token, $business_description );
		}

		if ( is_wp_error( $search_term ) ) {
			return $search_term;
		}

		$required_images = $this->total_number_required_images();

		if ( is_wp_error( $required_images ) ) {
			return $required_images;
		}

		$returned_images = $this->request( $search_term );

		if ( is_wp_error( $returned_images ) ) {
			return $returned_images;
		}

		$refined_images = $this->refine_returned_images_results( $ai_connection, $token, $business_description, $returned_images );

		if ( is_wp_error( $refined_images ) ) {
			return $returned_images;
		}

		$refined_images_count = count( $refined_images );

		$i      = 0;
		$errors = array();
		while ( $refined_images_count < $required_images && $i < 5 ) {
			$i ++;
			$search_term = $this->define_search_term( $ai_connection, $token, $business_description );

			if ( is_wp_error( $search_term ) ) {
				$errors[] = $search_term;
				continue;
			}

			$images_to_add = $this->request( $search_term );

			if ( is_wp_error( $images_to_add ) ) {
				$errors[] = $images_to_add;
				continue;
			}

			$images_to_add = $this->refine_returned_images_results( $ai_connection, $token, $business_description, $images_to_add );

			if ( is_wp_error( $images_to_add ) ) {
				$errors[] = $images_to_add;
				continue;
			}

			$refined_images = array_merge( $refined_images, $images_to_add );
		}

		if ( $refined_images_count < $required_images && ! empty( $errors ) ) {
			return new \WP_Error( 'ai_service_unavailable', __( 'AI Service is unavailable, try again later.', 'woo-gutenberg-products-block' ), $errors );
		}

		if ( empty( $refined_images ) ) {
			return new \WP_Error( 'woocommerce_no_images_found', __( 'No images found.', 'woo-gutenberg-products-block' ) );
		}

		return $refined_images;
	}

	/**
	 * Define the search term to be used on Pexels using the AI endpoint.
	 *
	 * The search term is a shorter description of the business.
	 *
	 * @param Connection $ai_connection The AI connection.
	 * @param string     $token The JWT token.
	 * @param string     $business_description The business description.
	 *
	 * @return mixed|\WP_Error
	 */
	private function define_search_term( $ai_connection, $token, $business_description ) {
		$prompt = sprintf( 'Based on the description "%s", generate one word that precisely describe what this business is selling. The returned word should be as accurate as possible to describe the products sold, do not include any adjectives or descriptions of the qualities of the product. The generated word must exist in the english dictionary and not be a proper name, the returned word should be simple, do not add any explanations.', $business_description );

		$response = $ai_connection->fetch_ai_response( $token, $prompt, 30 );

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		if ( ! isset( $response['completion'] ) ) {
			return new \WP_Error( 'search_term_definition_failed', __( 'The search term definition failed.', 'woo-gutenberg-products-block' ) );
		}

		return $response['completion'];
	}

	/**
	 * Refine the results returned by Pexels API.
	 *
	 * @param  Connection $ai_connection  The AI connection.
	 * @param  string     $token  The JWT token.
	 * @param  string     $business_description  The business description.
	 * @param  array      $returned_images  The returned images.
	 *
	 * @return array|\WP_Error The refined images, or WP_Error if the request failed.
	 */
	private function refine_returned_images_results( $ai_connection, $token, $business_description, $returned_images ) {
		$image_titles = array();
		foreach ( $returned_images as $returned_image ) {
			if ( isset( $returned_image['title'] ) ) {
				$image_titles[] = $returned_image['title'];
			}
		}

		$prompt = sprintf( 'Compare the following business description: "%s" with the image titles listed in the JSON below: if the image is not aligned with what the business is selling, delete the description from the list. Do not include any explanations or introductions to the response. The JSON is: %s', $business_description, wp_json_encode( $image_titles ) );

		$response = $ai_connection->fetch_ai_response( $token, $prompt, 30 );

		if ( is_wp_error( $response ) || ! isset( $response['completion'] ) ) {
			return $returned_images;
		}

		$filtered_image_titles = json_decode( $response['completion'] );

		if ( ! is_array( $filtered_image_titles ) ) {
			$response = $ai_connection->fetch_ai_response( $token, $prompt, 30 );

			if ( is_wp_error( $response ) || ! isset( $response['completion'] ) ) {
				return $returned_images;
			}

			$filtered_image_titles = json_decode( $response['completion'] );
		}

		if ( ! is_array( $filtered_image_titles ) ) {
			return new \WP_Error( 'ai_service_unavailable', __( 'AI Service is unavailable, try again later.', 'woo-gutenberg-products-block' ) );
		}

		// Remove the images that are not aligned with the business description.
		foreach ( $returned_images as $returned_image ) {
			if ( isset( $returned_image['title'] ) && ! in_array( $returned_image['title'], $filtered_image_titles, true ) ) {
				unset( $returned_image );
			}
		}

		return $returned_images;
	}

	/**
	 * Make a request to the Pexels API.
	 *
	 * @param string $search_term The search term to use.
	 * @param int    $per_page The number of images to return.
	 *
	 * @return array|\WP_Error The response body, or WP_Error if the request failed.
	 */
	private function request( string $search_term, int $per_page = 100 ) {
		$request = new \WP_REST_Request( 'GET', self::EXTERNAL_MEDIA_PEXELS_ENDPOINT );

		$request->set_param( 'search', esc_html( $search_term ) );
		$request->set_param( 'number', $per_page );
		$request->set_param( 'size', 'small' );

		$response      = rest_do_request( $request );
		$response_data = $response->get_data();

		if ( $response->is_error() ) {
			$error_msg = [
				'code' => $response->get_status(),
				'data' => $response_data,
			];

			return new \WP_Error( 'pexels_api_error', __( 'Request to the Pexels API failed.', 'woo-gutenberg-products-block' ), $error_msg );
		}

		$response = $response_data['media'] ?? $response_data;

		if ( is_array( $response ) ) {
			shuffle( $response );

			return $response;
		}

		return array();
	}

	/**
	 * Total number of required images.
	 *
	 * @return array|\WP_Error The total number of required images, or WP_Error if the request failed.
	 */
	private function total_number_required_images() {
		$patterns_dictionary = PatternUpdater::get_patterns_dictionary();

		if ( is_wp_error( $patterns_dictionary ) ) {
			return $patterns_dictionary;
		}

		$required_images = 0;
		foreach ( $patterns_dictionary as $pattern ) {
			if ( isset( $pattern['images_total'] ) && $pattern['images_total'] > 0 ) {
				$required_images += $pattern['images_total'];
			}
		}

		// Adding +6 images for the dummy products.
		$required_images += 6;

		return $required_images;
	}
}
