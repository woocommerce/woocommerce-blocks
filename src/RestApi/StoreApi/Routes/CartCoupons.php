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
 * CartCoupons class.
 */
class CartCoupons extends AbstractRoute {
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
		return '/cart/coupons';
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
				'callback' => [ $this, 'post_response' ],
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
	 * Get a collection of cart coupons.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_Error|\WP_REST_Response
	 */
	public function get_response( $request ) {
		$controller   = new CartController();
		$cart_coupons = $controller->get_cart_coupons();
		$items        = [];

		foreach ( $cart_coupons as $coupon_code ) {
			$response = rest_ensure_response( $this->schema->get_item_response( $coupon_code ) );
			$response->add_links( $this->prepare_links( $coupon_code, $request ) );

			$response = $this->prepare_response_for_collection( $response );
			$items[]  = $response;
		}

		$response = rest_ensure_response( $items );

		return $response;
	}

	/**
	 * Add a coupon to the cart and return the result.
	 *
	 * @param \WP_REST_Request $request Full data about the request.
	 * @return \WP_Error|\WP_REST_Response Response object on success, or WP_Error object on failure.
	 */
	public function post_response( $request ) {
		if ( ! wc_coupons_enabled() ) {
			return new \WP_Error( 'woocommerce_rest_cart_coupon_disabled', __( 'Coupons are disabled.', 'woo-gutenberg-products-block' ), array( 'status' => 404 ) );
		}

		$controller = new CartController();

		try {
			$controller->apply_coupon( $request['code'] );
		} catch ( \WC_REST_Exception $e ) {
			return new \WP_Error( $e->getErrorCode(), $e->getMessage(), array( 'status' => $e->getCode() ) );
		}

		$response = $this->get_item( $request );

		if ( $response instanceof \WP_Error ) {
			return $response;
		}

		$response = rest_ensure_response( $response );
		$response->set_status( 201 );

		return $response;
	}

	/**
	 * Deletes all coupons in the cart.
	 *
	 * @param \WP_REST_Request $request Full data about the request.
	 * @return \WP_Error|\WP_REST_Response Response object on success, or WP_Error object on failure.
	 */
	public function delete_response( $request ) {
		$controller = new CartController();
		$cart       = $controller->get_cart_instance();
		$cart->remove_coupons();
		$cart->calculate_totals();

		return new \WP_REST_Response( [], 200 );
	}

	/**
	 * Prepare links for the request.
	 *
	 * @param string           $coupon_code Coupon code.
	 * @param \WP_REST_Request $request Request object.
	 * @return array
	 */
	protected function prepare_links( $coupon_code, $request ) {
		$base  = $this->get_namespace() . $this->get_path();
		$links = array(
			'self'       => array(
				'href' => rest_url( trailingslashit( $base ) . $coupon_code ),
			),
			'collection' => array(
				'href' => rest_url( $base ),
			),
		);
		return $links;
	}
}
