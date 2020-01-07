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
		add_filter( 'woocommerce_default_order_status', array( $this, 'default_order_status' ) );

		try {
			// Create or retrieve the draft order for the current cart.
			$order_object  = $this->create_order_from_cart( $request );
			$reserve_stock = $this->reserve_stock_for_draft_order( $order_object );

			if ( is_wp_error( $reserve_stock ) ) {
				// Something went wrong - return error.
				$response = $reserve_stock;
			} else {
				$response = $this->prepare_item_for_response( $order_object, $request );
				$response->set_status( 201 );
			}
		} catch ( Exception $e ) {
			$response = new RestError( 'checkout-error', $e->getMessage() );
		}

		remove_filter( 'woocommerce_default_order_status', array( $this, 'default_order_status' ) );

		return $response;
	}

	/**
	 * Put a temporary hold on stock for this order.
	 *
	 * @throws RestException Exception when stock cannot be reserved.
	 * @param \WC_Order $order Order object.
	 * @return bool|RestError
	 */
	protected function reserve_stock_for_draft_order( $order ) {
		global $wpdb;

		try {
			// Remove any holds that already exist for this order.
			$wpdb->delete( $wpdb->wc_reserved_stock, [ 'order_id' => $order->get_id() ] );

			$hold_stock_minutes = (int) get_option( 'woocommerce_hold_stock_minutes', 0 );
			$stock_to_reserve   = [];

			// Loop over line items and check each item may be purchased.
			foreach ( $order->get_items() as $item ) {
				if ( ! $item->is_type( 'line_item' ) ) {
					continue;
				}

				$product = $item->get_product();

				if ( ! $product->is_in_stock() ) {
					throw new RestException(
						'woocommerce_rest_cart_order_product_not_in_stock',
						sprintf(
							/* translators: %s: product name */
							__( '%s is out of stock and cannot be purchased.', 'woo-gutenberg-products-block' ),
							$product->get_name()
						),
						403
					);
				}

				// If stock management if off, no need to reserve any stock here.
				if ( ! $product->managing_stock() || $product->backorders_allowed() ) {
					continue;
				}

				$stocked_product_id = $product->get_stock_managed_by_id();

				if ( ! isset( $stock_to_reserve[ $stocked_product_id ] ) ) {
					$stock_to_reserve[ $stocked_product_id ] = 0;
				}

				// Query for any existing holds on stock for this item. @todo join for post status.
				$reserved_stock = $wpdb->get_var(
					$wpdb->prepare(
						"
						SELECT SUM( stock_table.`stock_quantity` ) FROM $wpdb->wc_reserved_stock stock_table
						LEFT JOIN $wpdb->posts posts ON stock_table.`order_id` = posts.ID
						WHERE stock_table.`product_id` = %d
						AND posts.post_status = 'wc-draft'
						",
						$stocked_product_id
					)
				);

				// Deals with legacy stock reservation which the core Woo checkout performs.
				$reserved_stock += ( $hold_stock_minutes > 0 ) ? wc_get_held_stock_quantity( $product ) : 0;

				if ( ( $product->get_stock_quantity() - $reserved_stock - $stock_to_reserve[ $stocked_product_id ] ) < $item->get_quantity() ) {
					throw new RestException(
						'woocommerce_rest_cart_order_product_not_enough_stock',
						sprintf(
							/* translators: %s: product name */
							__( 'Not enough units of %s are available in stock to fulfil this order.', 'woo-gutenberg-products-block' ),
							$product->get_name()
						),
						403
					);
				}

				// Queue this reservation for later DB insertion.
				$stock_to_reserve[ $stocked_product_id ] += $item->get_quantity();
			}

			$stock_to_reserve = array_filter( $stock_to_reserve );

			if ( $stock_to_reserve ) {
				$stock_to_reserve_rows = [];

				foreach ( $stock_to_reserve as $product_id => $stock_quantity ) {
					$stock_to_reserve_rows[] = '(' . esc_sql( $order->get_id() ) . ',"' . esc_sql( $product_id ) . '","' . esc_sql( $stock_quantity ) . '")';
				}

				$values = implode( ',', $stock_to_reserve_rows );

				$wpdb->query(
					"INSERT INTO {$wpdb->wc_reserved_stock} ( order_id, product_id, stock_quantity ) VALUES {$values};" // phpcs:ignore
				);
			}
		} catch ( RestException $e ) {
			return new RestError( $e->getErrorCode(), $e->getMessage(), array( 'status' => $e->getCode() ) );
		}

		return true;
	}

	/**
	 * Create order and set props based on global settings.
	 *
	 * @param RestRequest $request Full details about the request.
	 * @return \WC_Order A new order object.
	 */
	protected function create_order_from_cart( $request ) {
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
	protected function set_props_from_cart( &$order, $request ) {
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
	 * @param \WC_Order   $order Object to prepare for the response.
	 * @param RestRequest $request Full details about the request.
	 */
	protected function create_line_items_from_cart( &$order, $request ) {
		$draft_order_cart_hash = $order->get_cart_hash();

		if ( WC()->cart->get_cart_hash() === $draft_order_cart_hash ) {
			return;
		}

		if ( $draft_order_cart_hash ) {
			$order->remove_order_items();
		}

		WC()->checkout->create_order_line_items( $order, WC()->cart );
		WC()->checkout->create_order_fee_lines( $order, WC()->cart );
		WC()->checkout->create_order_shipping_lines( $order, WC()->session->get( 'chosen_shipping_methods' ), WC()->shipping()->get_packages() );
		WC()->checkout->create_order_tax_lines( $order, WC()->cart );
		WC()->checkout->create_order_coupon_lines( $order, WC()->cart );

		$order->set_cart_hash( WC()->cart->get_cart_hash() );
	}

	/**
	 * Set props from API request.
	 *
	 * @param \WC_Order   $order Object to prepare for the response.
	 * @param RestRequest $request Full details about the request.
	 */
	protected function set_props_from_request( &$order, $request ) {
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
