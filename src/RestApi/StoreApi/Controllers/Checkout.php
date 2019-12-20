<?php
/**
 * Checkout controller.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\RestApi\StoreApi\Controllers;

defined( 'ABSPATH' ) || exit;

use \WP_Error as RestError;
use \WP_REST_Server as RestServer;
use \WP_REST_Controller as RestController;
use \WP_REST_Response as RestResponse;
use \WP_REST_Request as RestRequest;
use \WC_REST_Exception as RestException;
use Automattic\WooCommerce\Blocks\RestApi\StoreApi\Schemas\OrderSchema;

/**
 * Checkout API.
 */
class Checkout extends RestController {
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
	protected $rest_base = 'checkout';

	/**
	 * Schema class instance.
	 *
	 * @var object
	 */
	protected $order_schema;

	/**
	 * Setup API class.
	 */
	public function __construct() {
		$this->order_schema = new OrderSchema();
	}

	/**
	 * Register routes.
	 */
	public function register_routes() {
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/order',
			[
				[
					'methods'  => RestServer::CREATABLE,
					'callback' => array( $this, 'create_order_from_cart' ),
					'args'     => $this->get_endpoint_args_for_item_schema( RestServer::CREATABLE ),
				],
				'schema' => [ $this, 'get_public_item_schema' ],
			]
		);
	}

	/**
	 * Converts the global cart to an order object.
	 *
	 * @todo Since this relies on the cart global so much, why doesn't the core cart class do this?
	 * @todo set payment method
	 * @todo set customer note
	 * @todo handle cart hash
	 *
	 * Based on WC_Checkout::create_order.
	 */
	public function create_order_from_cart() {
		$cart_hash = WC()->cart->get_cart_hash();

		try {
			$order = new \WC_Order();
			$order->set_created_via( 'store-api' );

			// Store customer data.
			$order->set_customer_id( get_current_user_id() );
			// $order->set_customer_ip_address( WC_Geolocation::get_ip_address() );
			$order->set_customer_user_agent( wc_get_user_agent() );
			$order->add_meta_data( 'is_vat_exempt', WC()->cart->get_customer()->get_is_vat_exempt() ? 'yes' : 'no' );

			// Store totals.
			$order->set_currency( get_woocommerce_currency() );
			$order->set_prices_include_tax( 'yes' === get_option( 'woocommerce_prices_include_tax' ) );
			$order->set_shipping_total( WC()->cart->get_shipping_total() );
			$order->set_discount_total( WC()->cart->get_discount_total() );
			$order->set_discount_tax( WC()->cart->get_discount_tax() );
			$order->set_cart_tax( WC()->cart->get_cart_contents_tax() + WC()->cart->get_fee_tax() );
			$order->set_shipping_tax( WC()->cart->get_shipping_tax() );
			$order->set_total( WC()->cart->get_total( 'edit' ) );

			// Store line items.
			WC()->checkout->create_order_line_items( $order, WC()->cart );
			WC()->checkout->create_order_fee_lines( $order, WC()->cart );
			WC()->checkout->create_order_shipping_lines( $order, WC()->session->get( 'chosen_shipping_methods' ), WC()->shipping()->get_packages() );
			WC()->checkout->create_order_tax_lines( $order, WC()->cart );
			WC()->checkout->create_order_coupon_lines( $order, WC()->cart );

			$order->save();

			return $this->prepare_item_for_response( $order, $request );
		} catch ( Exception $e ) {
			return new RestError( 'checkout-error', $e->getMessage() );
		}
	}

	/**
	 * Get the cart.
	 *
	 * @param RestRequest $request Full details about the request.
	 * @return RestError|RestResponse
	 */
	public function get_item( $request ) {
		/*
		$controller = new CartController();
		$cart       = $controller->get_cart_instance();

		if ( ! $cart || ! $cart instanceof \WC_Cart ) {
			return new RestError( 'woocommerce_rest_cart_error', __( 'Unable to retrieve cart.', 'woo-gutenberg-products-block' ), array( 'status' => 500 ) );
		}*/

		return $this->prepare_item_for_response( [], $request );
	}

	/**
	 * Cart item schema.
	 *
	 * @return array
	 */
	public function get_item_schema() {
		return $this->order_schema->get_item_schema();
	}

	/**
	 * Prepares a single item output for response.
	 *
	 * @param mixed       $object Object to prepare for the response.
	 * @param RestRequest $request Request object.
	 * @return RestResponse Response object.
	 */
	public function prepare_item_for_response( $object, $request ) {
		$response = [];

		if ( $object instanceof \WC_Order ) {
			$response = $this->order_schema->get_item_response( $object );
		}
		return rest_ensure_response( $response );
	}
}
