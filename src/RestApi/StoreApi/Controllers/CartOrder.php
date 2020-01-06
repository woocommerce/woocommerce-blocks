<?php
/**
 * Cart Order controller.
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
 * Cart Order API.
 *
 * Creates orders based on cart contents.
 */
class CartOrder extends RestController {
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
	protected $rest_base = 'cart/order';

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
		$this->schema = new OrderSchema();
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
					'methods'  => RestServer::CREATABLE,
					'callback' => array( $this, 'create_item' ),
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
	 *
	 * Based on WC_Checkout::create_order.
	 *
	 * @param RestRequest $request Full details about the request.
	 * @return RestError|RestResponse
	 */
	public function create_item( $request ) {
		$schema = $this->get_item_schema();

		try {
			$order = $this->create_order_from_cart( $request );

			// Store data sent with the request.
			if ( isset( $request['billing_address'] ) ) {
				$allowed_billing_values = array_intersect_key( $request['billing_address'], $schema['properties']['billing_address']['properties'] );
				foreach ( $allowed_billing_values as $key => $value ) {
					$order->{"set_billing_$key"}( $value );
				}
			}

			if ( isset( $request['shipping_address'] ) ) {
				$allowed_shipping_values = array_intersect_key( $request['shipping_address'], $schema['properties']['shipping_address']['properties'] );
				foreach ( $allowed_shipping_values as $key => $value ) {
					$order->{"set_shipping_$key"}( $value );
				}
			}

			if ( isset( $request['customer_note'] ) ) {
				$order->set_customer_note( $request['customer_note'] );
			}

			$order->save();

			// Store Order ID in session so we can look it up later.
			WC()->session->set( 'order_awaiting_payment', $order->get_id() );

			$response = $this->prepare_item_for_response( $order, $request );
			$response->set_status( 201 );

			return $response;
		} catch ( Exception $e ) {
			return new RestError( 'checkout-error', $e->getMessage() );
		}
	}

	/**
	 * Create order and set props based on global settings.
	 *
	 * @param RestRequest $request Full details about the request.
	 * @return \WC_Order A new order object.
	 */
	protected function create_order_from_cart( $request ) {
		$order = new \WC_Order();
		$order->set_created_via( 'store-api' );
		$order->set_currency( get_woocommerce_currency() );
		$order->set_prices_include_tax( 'yes' === get_option( 'woocommerce_prices_include_tax' ) );
		$order->set_customer_id( get_current_user_id() );
		$order->set_customer_ip_address( \WC_Geolocation::get_ip_address() );
		$order->set_customer_user_agent( wc_get_user_agent() );

		$this->set_props_from_cart( $order, $request );
		$this->create_line_items_from_cart( $order, $request );

		return $order;
	}

	/**
	 * Set order totals based on those calculated by the cart.
	 *
	 * @param \WC_Order   $order Object to prepare for the response.
	 * @param RestRequest $request Full details about the request.
	 */
	protected function set_props_from_cart( &$order, $request ) {
		$order->set_cart_hash( WC()->cart->get_cart_hash() );
		$order->set_shipping_total( WC()->cart->get_shipping_total() );
		$order->set_discount_total( WC()->cart->get_discount_total() );
		$order->set_discount_tax( WC()->cart->get_discount_tax() );
		$order->set_cart_tax( WC()->cart->get_cart_contents_tax() + WC()->cart->get_fee_tax() );
		$order->set_shipping_tax( WC()->cart->get_shipping_tax() );
		$order->set_total( WC()->cart->get_total( 'edit' ) );
		$order->add_meta_data( 'is_vat_exempt', WC()->cart->get_customer()->get_is_vat_exempt() ? 'yes' : 'no' );
	}

	/**
	 * Create order line items.
	 *
	 * @param \WC_Order   $order Object to prepare for the response.
	 * @param RestRequest $request Full details about the request.
	 */
	protected function create_line_items_from_cart( &$order, $request ) {
		WC()->checkout->create_order_line_items( $order, WC()->cart );
		WC()->checkout->create_order_fee_lines( $order, WC()->cart );
		WC()->checkout->create_order_shipping_lines( $order, WC()->session->get( 'chosen_shipping_methods' ), WC()->shipping()->get_packages() );
		WC()->checkout->create_order_tax_lines( $order, WC()->cart );
		WC()->checkout->create_order_coupon_lines( $order, WC()->cart );
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
	 * @param \WC_Order   $object Object to prepare for the response.
	 * @param RestRequest $request Request object.
	 * @return RestResponse Response object.
	 */
	public function prepare_item_for_response( $object, $request ) {
		$response = [];

		if ( $object instanceof \WC_Order ) {
			$response = $this->schema->get_item_response( $object );
		}
		return rest_ensure_response( $response );
	}
}
