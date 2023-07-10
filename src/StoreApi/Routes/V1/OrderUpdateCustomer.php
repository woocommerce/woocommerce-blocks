<?php
namespace Automattic\WooCommerce\StoreApi\Routes\V1;

use Automattic\WooCommerce\StoreApi\SchemaController;
use Automattic\WooCommerce\StoreApi\Schemas\v1\AbstractSchema;
use Automattic\WooCommerce\StoreApi\Utilities\OrderAuthorizationTrait;
use Automattic\WooCommerce\StoreApi\Utilities\OrderController;
use Automattic\WooCommerce\StoreApi\Utilities\UpdateCustomerTrait;

/**
 * OrderUpdateCustomer class.
 *
 * Updates the customer billing and shipping addresses and returns an updated order--taxes should be recalculated.
 */
class OrderUpdateCustomer extends AbstractRoute {
	use OrderAuthorizationTrait;
	use UpdateCustomerTrait {
		get_args as protected get_update_customer_args;
	}

	/**
	 * The route identifier.
	 *
	 * @var string
	 */
	const IDENTIFIER = 'order-update-customer';

	/**
	 * The schema item identifier.
	 *
	 * @var string
	 */
	const SCHEMA_TYPE = 'order';

	/**
	 * Order controller class instance.
	 *
	 * @var OrderController
	 */
	protected $order_controller;

	/**
	 * Constructor.
	 *
	 * @param SchemaController $schema_controller Schema Controller instance.
	 * @param AbstractSchema   $schema Schema class for this route.
	 */
	public function __construct( SchemaController $schema_controller, AbstractSchema $schema ) {
		parent::__construct( $schema_controller, $schema );

		$this->order_controller = new OrderController();
	}

	/**
	 * Get the path of this REST route.
	 *
	 * @return string
	 */
	public function get_path() {
		return '/order/(?P<id>[\d]+)/update-customer';
	}

	/**
	 * Get method arguments for this REST route.
	 *
	 * @return array An array of endpoints.
	 */
	public function get_args() {
		$args = $this->get_update_customer_args();

		foreach ( $args as $index => $arg ) {
			$args[ $index ]['permission_callback'] = [ $this, 'is_authorized' ];
		}

		return $args;
	}

	/**
	 * Handle the request and return a valid response for this endpoint.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return \WP_REST_Response
	 */
	protected function get_route_post_response( \WP_REST_Request $request ) {
		$order_id = absint( $request['id'] );
		$order    = wc_get_order( $order_id );

		// Get data from request object and merge with order customer data, then sanitize.
		$billing  = $this->schema->billing_address_schema->sanitize_callback(
			wp_parse_args(
				$request['billing_address'] ?? [],
				$order->get_address( 'billing' )
			),
			$request,
			'billing_address'
		);
		$shipping = $this->schema->billing_address_schema->sanitize_callback(
			wp_parse_args(
				$request['shipping_address'] ?? [],
				$order->get_address( 'shipping' )
			),
			$request,
			'shipping_address'
		);

		// If the order does not need shipping, shipping address is forced to match billing address unless defined.
		if ( ! $order->needs_shipping_address() && ! isset( $request['shipping_address'] ) ) {
			$shipping = $billing;
		}

		// Validate data, now everything is clean.
		$validation_check = $this->validate_address_params( $request, $billing, $shipping );

		if ( is_wp_error( $validation_check ) ) {
			return rest_ensure_response( $validation_check );
		}

		/**
		 * Fires when the Checkout Block/Store API updates a customer from the API request data.
		 *
		 * @since
		 *
		 * @param \WC_Customer $customer Customer object.
		 * @param \WP_REST_Request $request Full details about the request.
		 */
		do_action( 'woocommerce_store_api_order_update_customer_from_request', $customer, $request );

		$order->set_billing_address( $billing );
		$order->set_shipping_address( $shipping );
		$order->save();
		$order->calculate_totals();

		return rest_ensure_response( $this->schema->get_item_response( $order ) );
	}
}
