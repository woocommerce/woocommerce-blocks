<?php

namespace Automattic\WooCommerce\Blocks\Images;

use Automattic\WooCommerce\Blocks\AI\Connection;

/**
 * Pexels API client.
 */
class Pexels {

	/**
	 * The Pexels API endpoint.
	 */
	const ENDPOINT = 'https://api.pexels.com/v1/search';

	/**
	 * Returns the list of images for the given search criteria.
	 *
	 * @param Connection $ai_connection The AI connection.
	 * @param string     $token The JWT token.
	 * @param string     $business_description The business description.
	 * @param int        $per_page The number of images to return.
	 *
	 * @return array|\WP_Error Array of images, or WP_Error if the request failed.
	 */
	public function get_images( $ai_connection, $token, $business_description, $per_page = 30 ) {
		$search_term = $this->define_search_term( $ai_connection, $token, $business_description );

		if ( is_wp_error( $search_term ) ) {
			return $search_term;
		}

		$request_url = add_query_arg(
			array(
				'query'    => $search_term,
				'per_page' => $per_page,
			),
			self::ENDPOINT
		);

		return $this->request( esc_url( $request_url ) );
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
		$prompt = 'Select a keyword that better describes the following business: ' . $business_description;

		$response = $ai_connection->fetch_ai_response( $token, $prompt );

		if ( is_wp_error( $response ) || ! isset( $response['completion'] ) ) {
			return new \WP_Error( 'search_term_definition_failed', __( 'The search term definition failed.', 'woo-gutenberg-products-block' ) );
		}

		return $response['completion'];
	}

	/**
	 * Make a request to the Pexels API.
	 *
	 * @param string $url The endpoint URL.
	 *
	 * @return array|\WP_Error The response body, or WP_Error if the request failed.
	 */
	private function request( string $url ) {
		$auth = defined( 'STOCK_IMAGES_PEXELS_API_KEY' ) ? STOCK_IMAGES_PEXELS_API_KEY : null;

		if ( ! $auth ) {
			return new \WP_Error( 'pexels_api_error', __( 'Unable to fetch images from the Pexels API: tru again later.', 'woo-gutenberg-products-block' ) );
		}

		$response = wp_remote_get(
			$url,
			array(
				'headers' => array( 'Authorization' => $auth ),
				'timeout' => 30,
			)
		);

		$response_code = wp_remote_retrieve_response_code( $response );
		$response_body = json_decode( wp_remote_retrieve_body( $response ), true );

		$error_data = array();
		if ( is_wp_error( $response ) ) {
			$error_data['code']    = $response->get_error_code();
			$error_data['message'] = $response->get_error_message();
		}

		if ( 200 !== $response_code ) {
			$error_data['status'] = $response_code;
			if ( isset( $response_body['message'] ) ) {
				$error_data['message'] = $response_body['message'];
			}
			if ( isset( $response_body['code'] ) ) {
				$error_data['code'] = $response_body['code'];
			}
		}

		if ( ! empty( $error_data ) ) {
			return new \WP_Error( 'pexels_api_error', __( 'Request to the Pexels API failed.', 'woo-gutenberg-products-block' ), $error_data );
		}

		return $response_body['photos'] ?? $response_body;
	}
}
