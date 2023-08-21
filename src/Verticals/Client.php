<?php

namespace Automattic\WooCommerce\Blocks\Verticals;

/**
 * Verticals API client.
 */
class Client {
	const ENDPOINT = 'https://public-api.wordpress.com/wpcom/v2/site-verticals';

	/**
	 * Make a request to the Verticals API.
	 *
	 * @param string $url The endpoint URL.
	 *
	 * @return array|\WP_Error The response body, or WP_Error if the request failed.
	 */
	private function request( string $url ) {
		$response = wp_remote_get( $url );
		if ( is_wp_error( $response ) ) {
			return $response;
		}

		$response_code = wp_remote_retrieve_response_code( $response );
		$response_body = json_decode( wp_remote_retrieve_body( $response ), true );
		if ( 200 !== $response_code ) {
			return new \WP_Error( $response_code, $response_body['message'] );
		}

		return $response_body;
	}

	/**
	 * Returns a list of verticals that have images.
	 *
	 * @return array|\WP_Error Array of verticals, or WP_Error if the request failed.
	 */
	public function get_verticals() {
		$response = $this->request( self::ENDPOINT );
		if ( is_wp_error( $response ) ) {
			return $response;
		}

		return array_filter(
			$response,
			function ( $vertical ) {
				return $vertical['has_vertical_images'];
			}
		);
	}

	/**
	 * Returns the list of images for the given vertical ID.
	 *
	 * @param int $vertical_id The vertical ID.
	 *
	 * @return array|\WP_Error Array of images, or WP_Error if the request failed.
	 */
	public function get_vertical_images( int $vertical_id ) {
		return $this->request( self::ENDPOINT . '/' . $vertical_id . '/images' );
	}
}
