<?php
/**
 * Cart controller.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\RestApi\StoreApi\Controllers;

defined( 'ABSPATH' ) || exit;

use \WP_Error as RestError;
use \WP_REST_Server as RestServer;
use \WP_REST_Controller as RestController;
use \WC_REST_Exception as RestException;
use Automattic\WooCommerce\Blocks\RestApi\StoreApi\Schemas\CartSchema;
use Automattic\WooCommerce\Blocks\RestApi\StoreApi\Utilities\CartController;

/**
 * Cart API.
 *
 * @since 2.5.0
 */
class Cart extends RestController {
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
	 * Schema class instance.
	 *
	 * @var object
	 */
	protected $schema;

	/**
	 * Setup API class.
	 */
	public function __construct() {
		$this->schema = new CartSchema();
	}

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
					'callback' => [ $this, 'get_item' ],
					'args'     => [
						'context' => $this->get_context_param( [ 'default' => 'view' ] ),
					],
				],
				'schema' => [ $this, 'get_public_item_schema' ],
			]
		);
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/apply-coupon',
			[
				[
					'methods'  => 'POST',
					'callback' => [ $this, 'apply_coupon' ],
					'args'     => [
						'code' => [
							'description' => __( 'Unique identifier for the coupon within the cart.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
						],
					],
				],
				'schema' => [ $this, 'get_public_item_schema' ],
			]
		);
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/remove-coupon',
			[
				[
					'methods'  => 'POST',
					'callback' => [ $this, 'remove_coupon' ],
					'args'     => [
						'code' => [
							'description' => __( 'Unique identifier for the coupon within the cart.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
						],
					],
				],
				'schema' => [ $this, 'get_public_item_schema' ],
			]
		);
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/select-shipping-rate/(?P<package_id>[\d]+)',
			[
				'args'   => [
					'package_id' => array(
						'description' => __( 'The ID of the package being shipped.', 'woo-gutenberg-products-block' ),
						'type'        => 'integer',
						'required'    => true,
					),
					'rate_id'    => [
						'description' => __( 'The chosen rate ID for the package.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'required'    => true,
					],
				],
				[
					'methods'  => 'POST',
					'callback' => [ $this, 'select_shipping_rate_for_package' ],
				],
				'schema' => [ $this, 'get_public_item_schema' ],
			]
		);
	}

	/**
	 * Select a shipping rate for the cart.
	 *
	 * This selects a shipping rate for a package and adds it to an array of selected shipping rates.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_Error|\WP_REST_Response
	 */
	public function select_shipping_rate_for_package( $request ) {
		if ( ! wc_shipping_enabled() ) {
			return new RestError( 'woocommerce_rest_shipping_disabled', __( 'Shipping is disabled.', 'woo-gutenberg-products-block' ), array( 'status' => 404 ) );
		}

		if ( ! isset( $request['package_id'] ) || ! is_numeric( $request['package_id'] ) ) {
			return new RestError( 'woocommerce_rest_cart_missing_package_id', __( 'Invalid Package ID.', 'woo-gutenberg-products-block' ), array( 'status' => 403 ) );
		}

		$controller = new CartController();
		$cart       = $controller->get_cart_instance();

		if ( ! $cart || ! $cart instanceof \WC_Cart ) {
			return new RestError( 'woocommerce_rest_cart_error', __( 'Unable to retrieve cart.', 'woo-gutenberg-products-block' ), array( 'status' => 500 ) );
		}

		$package_id = absint( $request['package_id'] );
		$rate_id    = wc_clean( wp_unslash( $request['rate_id'] ) );

		try {
			$controller->select_shipping_rate( $package_id, $rate_id );
		} catch ( RestException $e ) {
			return new RestError( $e->getErrorCode(), $e->getMessage(), array( 'status' => $e->getCode() ) );
		}

		$data     = $this->prepare_item_for_response( $cart, $request );
		$response = rest_ensure_response( $data );

		return $response;
	}
	/**
	 * Apply a coupon to the cart.
	 *
	 * This works like the CartCoupons endpoint, but returns the entire cart when finished to avoid multiple requests.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_Error|\WP_REST_Response
	 */
	public function apply_coupon( $request ) {
		if ( ! wc_coupons_enabled() ) {
			return new RestError( 'woocommerce_rest_cart_coupon_disabled', __( 'Coupons are disabled.', 'woo-gutenberg-products-block' ), array( 'status' => 404 ) );
		}

		$controller  = new CartController();
		$cart        = $controller->get_cart_instance();
		$coupon_code = wc_format_coupon_code( $request['code'] );

		if ( ! $cart || ! $cart instanceof \WC_Cart ) {
			return new RestError( 'woocommerce_rest_cart_error', __( 'Unable to retrieve cart.', 'woo-gutenberg-products-block' ), array( 'status' => 500 ) );
		}

		try {
			$controller->apply_coupon( $coupon_code );
		} catch ( RestException $e ) {
			return new RestError( $e->getErrorCode(), $e->getMessage(), array( 'status' => $e->getCode() ) );
		}

		$data     = $this->prepare_item_for_response( $cart, $request );
		$response = rest_ensure_response( $data );

		return $response;
	}

	/**
	 * Remove a coupon from the cart.
	 *
	 * This works like the CartCoupons endpoint, but returns the entire cart when finished to avoid multiple requests.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_Error|\WP_REST_Response
	 */
	public function remove_coupon( $request ) {
		if ( ! wc_coupons_enabled() ) {
			return new RestError( 'woocommerce_rest_cart_coupon_disabled', __( 'Coupons are disabled.', 'woo-gutenberg-products-block' ), array( 'status' => 404 ) );
		}

		$controller  = new CartController();
		$cart        = $controller->get_cart_instance();
		$coupon_code = wc_format_coupon_code( $request['code'] );

		if ( ! $cart || ! $cart instanceof \WC_Cart ) {
			return new RestError( 'woocommerce_rest_cart_error', __( 'Unable to retrieve cart.', 'woo-gutenberg-products-block' ), array( 'status' => 500 ) );
		}

		if ( ! $controller->has_coupon( $coupon_code ) ) {
			return new RestError( 'woocommerce_rest_cart_coupon_invalid_code', __( 'Coupon does not exist in the cart.', 'woo-gutenberg-products-block' ), array( 'status' => 404 ) );
		}

		$cart = $controller->get_cart_instance();
		$cart->remove_coupon( $coupon_code );
		$cart->calculate_totals();

		$data     = $this->prepare_item_for_response( $cart, $request );
		$response = rest_ensure_response( $data );

		return $response;
	}

	/**
	 * Get the cart.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return \WP_Error|\WP_REST_Response
	 */
	public function get_item( $request ) {
		$controller = new CartController();
		$cart       = $controller->get_cart_instance();

		if ( ! $cart || ! $cart instanceof \WC_Cart ) {
			return new RestError( 'woocommerce_rest_cart_error', __( 'Unable to retrieve cart.', 'woo-gutenberg-products-block' ), array( 'status' => 500 ) );
		}

		$data     = $this->prepare_item_for_response( $cart, $request );
		$response = rest_ensure_response( $data );

		return $response;
	}

	/**
	 * Cart item schema.
	 *
	 * @return array
	 */
	public function get_item_schema() {
		return $this->schema->get_item_schema();
	}

	/**
	 * Prepares a single item output for response.
	 *
	 * @param array            $cart    Cart array.
	 * @param \WP_REST_Request $request Request object.
	 * @return \WP_REST_Response Response object.
	 */
	public function prepare_item_for_response( $cart, $request ) {
		return rest_ensure_response( $this->schema->get_item_response( $cart ) );
	}
}
