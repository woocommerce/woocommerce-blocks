<?php

namespace Automattic\WooCommerce\Blocks\AI;

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
	public function prompt_ai( $prompt ) {
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
	 * @return array|\Automattic\Jetpack\Connection\WP_Error|\WP_Error
	 */
	public function get_jwt_token() {
		if ( ! class_exists( 'Jetpack_Options' ) ) {
			return new \WP_Error( 'no-jetpack-options', 'No Jetpack_Options class found' );
		}

		$site_id = \Jetpack_Options::get_option( 'id' );

		$response = \Automattic\Jetpack\Connection\Client::wpcom_json_api_request_as_user(
			"/sites/$site_id/jetpack-openai-query/jwt",
			'2',
			array(
				'method'  => 'POST',
				'headers' => array( 'Content-Type' => 'application/json; charset=utf-8' ),
			),
			wp_json_encode( array() )
		);

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		$json = json_decode( wp_remote_retrieve_body( $response ) );

		if ( ! isset( $json->token ) ) {
			return new \WP_Error( 'no-token', 'No token returned from WPCOM' );
		}

		return $json->token;
	}
}
