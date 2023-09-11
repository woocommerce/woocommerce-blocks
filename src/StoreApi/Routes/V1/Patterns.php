<?php

namespace Automattic\WooCommerce\StoreApi\Routes\V1;

use Automattic\WooCommerce\Blocks\AI\Connection;
use Automattic\WooCommerce\StoreApi\Exceptions\RouteException;

/**
 * Patterns class.
 */
class Patterns extends AbstractRoute {
	/**
	 * The route identifier.
	 *
	 * @var string
	 */
	const IDENTIFIER = 'patterns';

	/**
	 * The routes schema.
	 *
	 * @var string
	 */
	const SCHEMA_TYPE = 'pattern';

	/**
	 * Get the path of this REST route.
	 *
	 * @return string
	 */
	public function get_path() {
		return '/patterns/';
	}

	/**
	 * Get method arguments for this REST route.
	 *
	 * @return array An array of endpoints.
	 */
	public function get_args() {
		return [
			[
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => [ $this, 'get_response' ],
				'permission_callback' => '__return_true',
				'args'                => $this->get_collection_params(),
			],
			'schema' => [ $this->schema, 'get_public_item_schema' ],
		];
	}

	/**
	 * Get a single item.
	 *
	 * @throws RouteException On error.
	 * @param \WP_REST_Request $request Request object.
	 * @return \WP_REST_Response
	 */
	protected function get_route_response( \WP_REST_Request $request ) {
		// @TODO: add the response.

		return rest_ensure_response( $this->schema->get_item_response( '' ) );
	}

	/**
	 * Populate Patterns
	 *
	 * @param string $store_description Store description.
	 *
	 * @return bool
	 */
	public function populate_patterns( $store_description ) {
		if ( empty( $store_description ) ) {
			$store_description = get_option( 'woo_ai_describe_store_description' );

			if ( ! is_string( $store_description ) ) {
				return false;
			}
		}

		// @TODO finish populating patterns.

		$ai_connection = new Connection();

		return true;
	}
}
