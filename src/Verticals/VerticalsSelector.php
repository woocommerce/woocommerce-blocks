<?php

namespace Automattic\WooCommerce\Blocks\Verticals;

use Automattic\WooCommerce\Blocks\AI\Connection;
use Automattic\WooCommerce\Blocks\Verticals\Client as VerticalsAPIClient;


/**
 * VerticalsSelector class.
 */
class VerticalsSelector {
	public const STORE_DESCRIPTION_OPTION_KEY = 'woo_ai_describe_store_description';

	/**
	 * The verticals API client.
	 *
	 * @var VerticalsAPIClient
	 */
	private $verticals_api_client;

	/**
	 * The AI Connection.
	 *
	 * @var Connection
	 */
	private $ai_connection;

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->verticals_api_client = new VerticalsAPIClient();
		$this->ai_connection        = new Connection();
	}

	/**
	 * Gets the vertical id that better matches the business description using the GPT API.
	 *
	 * @param string $business_description The business description.
	 *
	 * @return string|\WP_Error The vertical id, or WP_Error if the request failed.
	 */
	public function get_vertical_id( $business_description = '' ) {
		if ( empty( $business_description ) ) {
			$business_description = $this->get_business_description();
		}

		if ( empty( $business_description ) ) {
			return new \WP_Error(
				'empty_business_description',
				__( 'The business description is empty.', 'woo-gutenberg-products-block' )
			);
		}

		$verticals = $this->verticals_api_client->get_verticals();
		if ( is_wp_error( $verticals ) ) {
			return $verticals;
		}

		$prompt  = $this->build_prompt( $verticals, $business_description );
		$site_id = $this->ai_connection->get_site_id();

		if ( is_wp_error( $site_id ) ) {
			return $site_id;
		}

		$token = $this->ai_connection->get_jwt_token( $site_id );

		if ( is_wp_error( $token ) ) {
			return $token;
		}

		$answer = $this->ai_connection->fetch_ai_response( $token, $prompt );

		if ( is_wp_error( $answer ) ) {
			return $answer;
		}

		return $this->parse_answer( $answer );
	}

	/**
	 * Get the business description from the AI settings in WooCommerce.
	 *
	 * @return string The business description.
	 */
	private function get_business_description(): string {
		return get_option( self::STORE_DESCRIPTION_OPTION_KEY, '' );
	}

	/**
	 * Build the prompt to send to the GPT API.
	 *
	 * @param array  $verticals The list of verticals.
	 * @param string $business_description The business description.
	 *
	 * @return string The prompt to send to the GPT API.
	 */
	private function build_prompt( array $verticals, string $business_description ): string {
		$verticals = array_map(
			function ( $vertical ) {
				return "[ID=${vertical['id']}, Name=\"${vertical['name']}\"]";
			},
			$verticals
		);

		if ( empty( $verticals ) ) {
			return '';
		}

		$verticals = implode( ', ', $verticals );

		return sprintf(
			'Filter the objects provided below and return the one that has a title that better matches this' .
			' description of an online store with the following description: "%s". Objects: %s.' .
			' The response should include exclusively the ID of the object that better matches' .
			' the description in the following format: [id=selected_id]. Do not include other text or explanation.',
			$business_description,
			$verticals
		);
	}

	/**
	 * Parse the answer from the GPT API and return the id of the selected vertical.
	 *
	 * @param string $answer The answer from the GPT API.
	 *
	 * @return string The id of the selected vertical.
	 */
	private function parse_answer( string $answer ): string {
		$pattern = '/\[id=(\d+)]/';

		if ( preg_match( $pattern, $answer, $matches ) ) {
			return $matches[1];
		}

		return '';
	}
}
