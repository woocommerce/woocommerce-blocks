<?php
/**
 * Cart items route.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\RestApi\StoreApi\Routes;

defined( 'ABSPATH' ) || exit;

use Automattic\WooCommerce\Blocks\RestApi\StoreApi\Utilities\CartController;

/**
 * CartItems class.
 */
class CartItems extends AbstractRoute {
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
		return '/cart/items';
	}

	/**
	 * Get method arguments for this REST route.
	 *
	 * @return array An array of endpoints.
	 */
	public function get_args() {
		return [
			[
				'methods'  => \WP_REST_Server::READABLE,
				'callback' => [ $this, 'get_response' ],
				'args'     => [
					'context' => $this->get_context_param( [ 'default' => 'view' ] ),
				],
			],
			[
				'methods'  => \WP_REST_Server::CREATABLE,
				'callback' => array( $this, 'post_response' ),
				'args'     => $this->schema->get_endpoint_args_for_item_schema( \WP_REST_Server::CREATABLE ),
			],
			[
				'methods'  => \WP_REST_Server::DELETABLE,
				'callback' => [ $this, 'delete_response' ],
			],
			'schema' => [ $this->schema, 'get_public_item_schema' ],
		];
	}

	/**
	 * Get a collection of cart items.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_Error|\WP_REST_Response
	 */
	public function get_response( $request ) {
		$controller = new CartController();
		$cart_items = $controller->get_cart_items();
		$items      = [];

		foreach ( $cart_items as $cart_item ) {
			$data    = $this->prepare_item_for_response( $cart_item, $request );
			$items[] = $this->prepare_response_for_collection( $data );
		}

		$response = rest_ensure_response( $items );

		return $response;
	}

	/**
	 * Creates one item from the collection.
	 *
	 * @param \WP_REST_Request $request Full data about the request.
	 * @return \WP_Error|\WP_REST_Response Response object on success, or WP_Error object on failure.
	 */
	public function post_response( $request ) {
		// Do not allow key to be specified during creation.
		if ( ! empty( $request['key'] ) ) {
			return new \WP_Error( 'woocommerce_rest_cart_item_exists', __( 'Cannot create an existing cart item.', 'woo-gutenberg-products-block' ), array( 'status' => 400 ) );
		}

		$controller = new CartController();
		$result     = $controller->add_to_cart(
			[
				'id'        => $request['id'],
				'quantity'  => $request['quantity'],
				'variation' => $request['variation'],
			]
		);

		if ( is_wp_error( $result ) ) {
			return $result;
		}

		$response = rest_ensure_response( $this->prepare_item_for_response( $controller->get_cart_item( $result ), $request ) );
		$response->set_status( 201 );
		return $response;
	}

	/**
	 * Deletes all items in the cart.
	 *
	 * @param \WP_Rest_Request $request Full data about the request.
	 * @return \WP_Error|\WP_REST_Response Response object on success, or WP_Error object on failure.
	 */
	public function delete_response( $request ) {
		$controller = new CartController();
		$controller->empty_cart();
		return new \WP_REST_Response( [], 200 );
	}

	/**
	 * Prepare links for the request.
	 *
	 * @param array            $cart_item Object to prepare.
	 * @param \WP_REST_Request $request Request object.
	 * @return array
	 */
	protected function prepare_links( $cart_item, $request ) {
		$base  = $this->get_namespace() . $this->get_path();
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
