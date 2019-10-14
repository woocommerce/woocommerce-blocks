<?php
/**
 * Cart/Empty controller.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\StoreApi\Controllers;

defined( 'ABSPATH' ) || exit;

use \WP_Error as RestError;
use \WP_REST_Server as RestServer;
use \WP_REST_Response as RestResponse;
use Automattic\WooCommerce\Blocks\StoreApi\Schemas\CartItemSchema;
use Automattic\WooCommerce\Blocks\StoreApi\Utilities\CartController;

/**
 * Cart/Empty API.
 */
class CartEmpty extends Cart {
	/**
	 * Route base.
	 *
	 * @var string
	 */
	protected $rest_base = 'cart/empty';

	/**
	 * Register routes.
	 */
	public function register_routes() {
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			[
				[
					'methods'             => RestServer::DELETABLE,
					'callback'            => array( $this, 'empty_cart' ),
					'permission_callback' => '__return_true',
				],
				'schema' => array( $this, 'get_public_item_schema' ),
			],
			true
		);
	}

	/**
	 * Creates one item from the collection.
	 *
	 * @param \WP_Rest_Request $request Full data about the request.
	 * @return \WP_Error|\WP_REST_Response Response object on success, or WP_Error object on failure.
	 */
	public function empty_cart( $request ) {
		$controller = new CartController();
		$cart_items = $controller->get_items();

		if ( 0 === count( $cart_items ) ) {
			return new RestError(
				'woocommerce_rest_cart_already_empty',
				__( 'The cart is already empty.', 'woo-gutenberg-products-block' ),
				array(
					'status' => 400,
				)
			);
		}

		$previous = $this->get_items( $request );
		$response = new RestResponse();
		$response->set_data(
			array(
				'deleted'  => true,
				'previous' => $previous->get_data(),
			)
		);

		$controller->empty_cart();

		return $response;
	}
}
