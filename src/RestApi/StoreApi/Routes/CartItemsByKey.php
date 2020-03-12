<?php
/**
 * Cart item route.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\RestApi\StoreApi\Routes;

defined( 'ABSPATH' ) || exit;

use Automattic\WooCommerce\Blocks\RestApi\StoreApi\Utilities\CartController;

/**
 * CartItemsByKey class.
 */
class CartItemsByKey extends AbstractRoute {
	/**
	 * Get the namespace for this route.
	 *
	 * @return string
	 */
	public function get_namespace() {
		return 'wc/store';
	}

	/**
	 * Get the path of this REST route.
	 *
	 * @return string
	 */
	public function get_path() {
		return '/cart/items/(?P<key>[\w-]{32})';
	}

	/**
	 * Get method arguments for this REST route.
	 *
	 * @return array An array of endpoints.
	 */
	public function get_args() {
		return [
			'args'   => [
				'key' => [
					'description' => __( 'Unique identifier for the item within the cart.', 'woo-gutenberg-products-block' ),
					'type'        => 'string',
				],
			],
			[
				'methods'  => \WP_REST_Server::READABLE,
				'callback' => [ $this, 'get_response' ],
				'args'     => [
					'context' => $this->get_context_param( [ 'default' => 'view' ] ),
				],
			],
			[
				'methods'  => \WP_REST_Server::EDITABLE,
				'callback' => array( $this, 'put_response' ),
				'args'     => $this->schema->get_endpoint_args_for_item_schema( \WP_REST_Server::EDITABLE ),
			],
			[
				'methods'  => \WP_REST_Server::DELETABLE,
				'callback' => [ $this, 'delete_response' ],
			],
			'schema' => [ $this->schema, 'get_public_item_schema' ],
		];
	}

	/**
	 * Get a single cart items.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_Error|\WP_REST_Response
	 */
	public function get_response( $request ) {
		$controller = new CartController();
		$cart_item  = $controller->get_cart_item( $request['key'] );

		if ( ! $cart_item ) {
			return new \WP_Error( 'woocommerce_rest_cart_invalid_key', __( 'Cart item does not exist.', 'woo-gutenberg-products-block' ), array( 'status' => 404 ) );
		}

		$data     = $this->prepare_item_for_response( $cart_item, $request );
		$response = rest_ensure_response( $data );

		return $response;
	}

	/**
	 * Update a single cart item.
	 *
	 * @param \WP_Rest_Request $request Full data about the request.
	 * @return \WP_Error|\WP_REST_Response Response object on success, or WP_Error object on failure.
	 */
	public function put_response( $request ) {
		$controller = new CartController();
		$cart       = $controller->get_cart_instance();
		$cart_item  = $controller->get_cart_item( $request['key'] );

		if ( ! $cart_item ) {
			return new \WP_Error( 'woocommerce_rest_cart_invalid_key', __( 'Cart item does not exist.', 'woo-gutenberg-products-block' ), array( 'status' => 404 ) );
		}

		if ( isset( $request['quantity'] ) ) {
			$cart->set_quantity( $request['key'], $request['quantity'] );
		}

		return rest_ensure_response( $this->prepare_item_for_response( $controller->get_cart_item( $request['key'] ), $request ) );
	}

	/**
	 * Delete a single cart item.
	 *
	 * @param \WP_Rest_Request $request Full data about the request.
	 * @return \WP_Error|\WP_REST_Response Response object on success, or WP_Error object on failure.
	 */
	public function delete_response( $request ) {
		$controller = new CartController();
		$cart       = $controller->get_cart_instance();
		$cart_item  = $controller->get_cart_item( $request['key'] );

		if ( ! $cart_item ) {
			return new \WP_Error( 'woocommerce_rest_cart_invalid_key', __( 'Cart item does not exist.', 'woo-gutenberg-products-block' ), array( 'status' => 404 ) );
		}

		$cart->remove_cart_item( $request['key'] );

		return new \WP_REST_Response( null, 204 );
	}

	/**
	 * Prepare links for the request.
	 *
	 * @param array            $cart_item Object to prepare.
	 * @param \WP_REST_Request $request Request object.
	 * @return array
	 */
	protected function prepare_links( $cart_item, $request ) {
		$base  = $this->namespace . '/' . $this->rest_base;
		$links = array(
			'self'       => array(
				'href' => rest_url( trailingslashit( $base ) . $cart_item['key'] ),
			),
			'collection' => array(
				'href' => rest_url( $base ),
			),
		);
		return $links;
	}
}
