<?php
/**
 * Cart Coupons route.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\RestApi\StoreApi\Routes;

defined( 'ABSPATH' ) || exit;

use Automattic\WooCommerce\Blocks\RestApi\StoreApi\Utilities\CartController;

/**
 * CartCouponsByCode class.
 */
class CartCouponsByCode extends AbstractRoute {
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
		return '/cart/coupons/(?P<code>[\w-]+)';
	}

	/**
	 * Get method arguments for this REST route.
	 *
	 * @return array An array of endpoints.
	 */
	public function get_args() {
		return [
			'args'   => [
				'code' => [
					'description' => __( 'Unique identifier for the coupon within the cart.', 'woo-gutenberg-products-block' ),
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
				'methods'  => \WP_REST_Server::DELETABLE,
				'callback' => [ $this, 'delete_response' ],
			],
			'schema' => [ $this->schema, 'get_public_item_schema' ],
		];
	}

	/**
	 * Get a single cart coupon.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_Error|\WP_REST_Response
	 */
	public function get_response( $request ) {
		$controller = new CartController();

		if ( ! $controller->has_coupon( $request['code'] ) ) {
			return new \WP_Error( 'woocommerce_rest_cart_coupon_invalid_code', __( 'Coupon does not exist in the cart.', 'woo-gutenberg-products-block' ), array( 'status' => 404 ) );
		}

		return rest_ensure_response( $this->schema->get_item_response( $coupon_code ) );
	}

	/**
	 * Delete a single cart coupon.
	 *
	 * @param \WP_REST_Request $request Full data about the request.
	 * @return \WP_Error|\WP_REST_Response Response object on success, or WP_Error object on failure.
	 */
	public function delete_response( $request ) {
		$controller = new CartController();

		if ( ! $controller->has_coupon( $request['code'] ) ) {
			return new \WP_Error( 'woocommerce_rest_cart_coupon_invalid_code', __( 'Coupon does not exist in the cart.', 'woo-gutenberg-products-block' ), array( 'status' => 404 ) );
		}

		$cart = $controller->get_cart_instance();
		$cart->remove_coupon( $request['code'] );
		$cart->calculate_totals();

		return new \WP_REST_Response( null, 204 );
	}
}
