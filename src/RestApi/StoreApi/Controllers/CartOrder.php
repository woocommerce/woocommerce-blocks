<?php
/**
 * Cart Order controller.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\RestApi\StoreApi\Controllers;

defined( 'ABSPATH' ) || exit;

use \WP_Error;
use \WP_REST_Server as RestServer;
use \WP_REST_Controller as RestController;
use \WP_REST_Response as RestResponse;
use \WP_REST_Request as RestRequest;
use \WC_REST_Exception as RestException;
use Automattic\WooCommerce\Blocks\RestApi\StoreApi\Schemas\OrderSchema;
use Automattic\WooCommerce\Blocks\RestApi\StoreApi\Utilities\ReserveStock;

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
					'args'     => array_merge(
						$this->get_endpoint_args_for_item_schema( RestServer::CREATABLE ),
						array(
							'shipping_rates' => array(
								'description' => __( 'Selected shipping rates to apply to the order.', 'woo-gutenberg-products-block' ),
								'type'        => 'array',
								'required'    => true,
								'items'       => [
									'type'       => 'object',
									'properties' => [
										'rate_id' => [
											'description' => __( 'ID of the shipping rate.', 'woo-gutenberg-products-block' ),
											'type'        => 'string',
										],
									],
								],
							),
						)
					),
				],
				'schema' => [ $this, 'get_public_item_schema' ],
			]
		);
	}

	/**
	 * Converts the global cart to an order object.
	 *
	 * @todo Since this relies on the cart global so much, why doesn't the core cart class do this?
	 *
	 * Based on WC_Checkout::create_order.
	 *
	 * @param RestRequest $request Full details about the request.
	 * @return WP_Error|RestResponse
	 */
	public function create_item( $request ) {
		try {
			// If part of the request, first update shipping selections so that cart totals are correct.
			$this->select_shipping_rates( $request );

			// Create or retrieve the draft order for the current cart.
			$order_object = $this->create_order_from_cart( $request );

			// Try to reserve stock, if available.
			$this->reserve_stock( $order_object );

			$response = $this->prepare_item_for_response( $order_object, $request );
			$response->set_status( 201 );
			return $response;
		} catch ( RestException $e ) {
			return new WP_Error( $e->getErrorCode(), $e->getMessage(), $e->getCode() );
		} catch ( Exception $e ) {
			return new WP_Error( 'create-order-error', $e->getMessage(), [ 'status' => 500 ] );
		}
	}

	/**
	 * Select shipping rates and store in session.
	 *
	 * @throws RestException Exception when shipping is invalid.
	 * @param RestRequest $request Full details about the request.
	 */
	protected function select_shipping_rates( RestRequest $request ) {
		if ( ! isset( $request['shipping_rates'] ) ) {
			return;
		}

		$chosen_shipping_methods = [];

		foreach ( $request['shipping_rates'] as $shipping_rate ) {
			if ( ! isset( $shipping_rate['rate_id'] ) ) {
				continue;
			}
			$chosen_shipping_methods[] = $shipping_rate['rate_id'];
		}

		WC()->session->set( 'chosen_shipping_methods', $chosen_shipping_methods );
		WC()->cart->calculate_shipping();
		WC()->cart->calculate_totals();
	}

	/**
	 * Put a temporary hold on stock for this order.
	 *
	 * @throws RestException Exception when stock cannot be reserved.
	 * @param \WC_Order $order Order object.
	 */
	protected function reserve_stock( \WC_Order $order ) {
		$reserve_stock_helper = new ReserveStock();
		$result               = $reserve_stock_helper->reserve_stock_for_order( $order );

		if ( is_wp_error( $result ) ) {
			throw new RestException( $result->get_error_code(), $result->get_error_message(), $result->get_error_data( 'status' ) );
		}
	}

	/**
	 * Create order and set props based on global settings.
	 *
	 * @param RestRequest $request Full details about the request.
	 * @return \WC_Order A new order object.
	 */
	protected function create_order_from_cart( RestRequest $request ) {
		add_filter( 'woocommerce_default_order_status', array( $this, 'default_order_status' ) );

		$order = $this->get_order_object();
		$order->set_status( 'draft' );
		$order->set_created_via( 'store-api' );
		$order->set_currency( get_woocommerce_currency() );
		$order->set_prices_include_tax( 'yes' === get_option( 'woocommerce_prices_include_tax' ) );
		$order->set_customer_id( get_current_user_id() );
		$order->set_customer_ip_address( \WC_Geolocation::get_ip_address() );
		$order->set_customer_user_agent( wc_get_user_agent() );

		$this->set_props_from_cart( $order, $request );
		$this->create_line_items_from_cart( $order, $request );
		$this->set_props_from_request( $order, $request );

		$order->save();

		remove_filter( 'woocommerce_default_order_status', array( $this, 'default_order_status' ) );

		// Store Order ID in session so we can look it up later.
		WC()->session->set( 'draft_order_id', $order->get_id() );

		return $order;
	}

	/**
	 * Get an order object, either using a current draft order, or returning a new one.
	 *
	 * @return \WC_Order A new order object.
	 */
	protected function get_order_object() {
		$draft_order_id = WC()->session->get( 'draft_order_id' );
		$draft_order    = $draft_order_id ? wc_get_order( $draft_order_id ) : false;

		if ( $draft_order && $draft_order->has_status( 'draft' ) && 'store-api' === $draft_order->get_created_via() ) {
			return $draft_order;
		}

		return new \WC_Order();
	}

	/**
	 * Changes default order status to draft for orders created via this API.
	 *
	 * @return string
	 */
	public function default_order_status() {
		return 'draft';
	}

	/**
	 * Set order totals based on those calculated by the cart.
	 *
	 * @param \WC_Order   $order Object to prepare for the response.
	 * @param RestRequest $request Full details about the request.
	 */
	protected function set_props_from_cart( \WC_Order $order, RestRequest $request ) {
		$order->set_shipping_total( WC()->cart->get_shipping_total() );
		$order->set_discount_total( WC()->cart->get_discount_total() );
		$order->set_discount_tax( WC()->cart->get_discount_tax() );
		$order->set_cart_tax( WC()->cart->get_cart_contents_tax() + WC()->cart->get_fee_tax() );
		$order->set_shipping_tax( WC()->cart->get_shipping_tax() );
		$order->set_total( WC()->cart->get_total( 'edit' ) );
		$order->update_meta_data( 'is_vat_exempt', WC()->cart->get_customer()->get_is_vat_exempt() ? 'yes' : 'no' );
	}

	/**
	 * Create order line items.
	 *
	 * @todo Knowing if items changed between the order and cart can be complex. Line items are ok because there is a
	 * hash, but no hash exists for other line item types. Having a normalised set of data between cart and order, or
	 * additional hashes, would be useful in the future and to help refactor this code.
	 *
	 * @param \WC_Order   $order Object to prepare for the response.
	 * @param RestRequest $request Full details about the request.
	 */
	protected function create_line_items_from_cart( \WC_Order $order, RestRequest $request ) {
		// We only need to update line items if the cart changed.
		if ( WC()->cart->get_cart_hash() !== $order->get_cart_hash() ) {
			$order->remove_order_items( 'line_item' );
			$order->set_cart_hash( WC()->cart->get_cart_hash() );
			WC()->checkout->create_order_line_items( $order, WC()->cart );
		}

		// This checks to see if coupons have changed between the cart and the order.
		if ( array_diff( $order->get_coupon_codes(), WC()->cart->get_applied_coupons() ) ) {
			$order->remove_order_items( 'coupon' );
			WC()->checkout->create_order_coupon_lines( $order, WC()->cart );
		}

		// There is no way to know if fees changed, so recreate them here.
		$order->remove_order_items( 'fee' );
		WC()->checkout->create_order_fee_lines( $order, WC()->cart );

		// There is no way to know if shipping changed, so recreate it here.
		$order->remove_order_items( 'shipping' );
		WC()->checkout->create_order_shipping_lines( $order, WC()->session->get( 'chosen_shipping_methods' ), WC()->shipping()->get_packages() );

		// There is no way to know if taxes changed, so recreate it here.
		$order->remove_order_items( 'tax' );
		WC()->checkout->create_order_tax_lines( $order, WC()->cart );

	}

	/**
	 * Set props from API request.
	 *
	 * @param \WC_Order   $order Object to prepare for the response.
	 * @param RestRequest $request Full details about the request.
	 */
	protected function set_props_from_request( \WC_Order $order, RestRequest $request ) {
		$schema = $this->get_item_schema();

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
