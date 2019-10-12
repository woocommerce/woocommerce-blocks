<?php
/**
 * Cart/Add controller.
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
 * Cart/Add API.
 */
class CartAdd extends RestContoller {

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
	protected $rest_base = 'cart/add';

	/**
	 * Register routes.
	 */
	public function register_routes() {
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			[
				[
					'methods'             => RestServer::CREATABLE,
					'callback'            => array( $this, 'create_item' ),
					'permission_callback' => array( $this, 'create_item_permissions_check' ),
					'args'                => $this->get_endpoint_args_for_item_schema( RestServer::CREATABLE ),
				],
				'schema' => array( $this, 'get_public_item_schema' ),
			],
			true
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
	 * Checks if a given request has access to create items.
	 *
	 * @param \WP_REST_Request $request Full data about the request.
	 * @return \WP_Error|bool True if the request has access to create items, WP_Error object otherwise.
	 */
	public function create_item_permissions_check( $request ) {
		return true;
	}

	/**
	 * Creates one item from the collection.
	 *
	 * @param \WP_REST_Request $request Full data about the request.
	 * @return \WP_Error|\WP_REST_Response Response object on success, or WP_Error object on failure.
	 */
	public function create_item( $request ) {
		if ( ! empty( $request['key'] ) ) {
			return new Error( 'woocommerce_rest_cart_item_exists', __( 'Cannot create existing cart item.', 'woo-gutenberg-products-block' ), array( 'status' => 400 ) );
		}

		$schema     = new CartItemSchema();
		$controller = new CartController();
		$result     = $controller->add_to_cart(
			[
				'id'       => $request['id'],
				'quantity' => $request['quantity'],
			]
		);

		if ( is_wp_error( $result ) ) {
			return $result;
		}

		return rest_ensure_response( $schema->get_object_for_response( $controller->get_item( $result ) ) );
	}
}
