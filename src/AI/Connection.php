<?php

namespace Automattic\WooCommerce\Blocks\AI;

use Automattic\Jetpack\Connection\Client;

/**
 * Class Connection
 */
class Connection {

	/**
	 * Send a POST request to the AI API.
	 *
	 * @param string $prompt Prompt to send to the API.
	 *
	 * @return string
	 */
	public function post_request( $prompt ) {
		$api_url = 'https://public-api.wordpress.com/wpcom/v2/text-completion';
		$token   = $this->get_jwt_token();

		$response = wp_remote_post(
			$api_url,
			array(
				'body'    =>
					array(
						'feature' => 'woocommerce_blocks_patterns',
						'prompt'  => $prompt,
						'token'   => $token,
					),
				'timeout' => 15,
			)
		);

		if ( is_wp_error( $response ) ) {
			return $response->get_error_message();
		} else {
			$body = wp_remote_retrieve_body( $response );

			return json_decode( $body, true );
		}
	}

	/**
	 * Fetch the JWT token.
	 *
	 * @return string|\WP_Error The JWT token or a WP_Error object.
	 */
	public function get_jwt_token() {
		if ( ! class_exists( 'Jetpack_Options' ) ) {
			return new \WP_Error( 'no-jetpack-options', 'No Jetpack_Options class found' );
		}

		$site_id = \Jetpack_Options::get_option( 'id' );
		$request = Client::wpcom_json_api_request_as_user(
			sprintf( '/sites/%d/jetpack-openai-query/jwt', $site_id ),
			'2',
			array(
				'method'  => 'POST',
				'headers' => array( 'Content-Type' => 'application/json; charset=utf-8' ),
			)
		);

		$response = json_decode( wp_remote_retrieve_body( $request ) );

		if ( $response instanceof \WP_Error ) {
			return new \WP_Error( $response->get_error_code(), esc_html__( 'Failed to generate JWT token', 'woo-gutenberg-products-block' ), $response->get_error_message() );
		}

		if ( ! isset( $response->token ) ) {
			return new \WP_Error( $response->code, esc_html__( 'Failed to retrieve the JWT token: Try again later.', 'woo-gutenberg-products-block' ), $response->data );
		}

		return $response->token;
	}
}
