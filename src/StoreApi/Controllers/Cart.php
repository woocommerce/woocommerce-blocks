<?php
/**
 * Cart controller.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\StoreApi\Controllers;

defined( 'ABSPATH' ) || exit;

use \WP_Error as Error;
use \WP_REST_Server as RestServer;
use \WP_REST_Controller as RestContoller;
use Automattic\WooCommerce\Blocks\StoreApi\Schemas\CartItemSchema;
use Automattic\WooCommerce\Blocks\StoreApi\Utilities\CartController;

/**
 * Cart API.
 */
class Cart extends RestContoller {

	/**
	 * Endpoint namespace.
	 *
	 * @var string
	 */
	protected $namespace = 'wc/store';

	/**
	 * Route base.
	 *
	 * @var string
	 */
	protected $rest_base = 'cart';

	/**
	 * Register routes.
	 */
	public function register_routes() {
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			[
				[
					'methods'  => RestServer::READABLE,
					'callback' => [ $this, 'get_items' ],
					'args'     => [
						'context' => $this->get_context_param( [ 'default' => 'view' ] ),
					],
				],
				'schema' => [ $this, 'get_public_item_schema' ],
			],
			true
		);

		// Individual cart items.
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/(?P<id>[\s]+)',
			[
				'args'   => [
					'id' => [
						'description' => __( 'Unique identifier for the resource.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
					],
				],
				[
					'methods'  => RestServer::READABLE,
					'callback' => [ $this, 'get_item' ],
					'args'     => [
						'context' => $this->get_context_param( [ 'default' => 'view' ] ),
					],
				],
				'schema' => [ $this, 'get_public_item_schema' ],
			]
		);
	}

	/**
	 * Cart item schema.
	 *
	 * @return array
	 */
	public function get_item_schema() {
		return ( new CartItemSchema() )->get_item_schema();
	}

	/**
	 * Get a collection of cart items.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_Error|\WP_REST_Response
	 */
	public function get_items( $request ) {
		$schema = new CartItemSchema();
		$cart   = wc()->cart->get_cart();
		$items  = array_filter( array_map( [ $schema, 'get_object_for_response' ], array_values( $cart ) ) );

		return $items;
	}

	/**
	 * Get a single cart items.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_Error|\WP_REST_Response
	 */
	public function get_item( $request ) {
		$schema    = new CartItemSchema();
		$cart_item = wc()->cart->get_cart_item( $request['id'] );

		if ( ! $cart_item ) {
			return new Error( 'woocommerce_rest_cart_invalid_id', __( 'Invalid cart item ID.', 'woo-gutenberg-products-block' ), array( 'status' => 404 ) );
		}

		$object   = $schema->get_object_for_response( $cart_item );
		$response = rest_ensure_response( $object );

		return $response;
	}
}
