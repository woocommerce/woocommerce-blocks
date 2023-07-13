<?php
namespace Automattic\WooCommerce\StoreApi\Routes\V1;

use Automattic\WooCommerce\StoreApi\Utilities\DraftOrderTrait;
use Automattic\WooCommerce\StoreApi\Utilities\UpdateCustomerTrait;

/**
 * CartUpdateCustomer class.
 *
 * Updates the customer billing and shipping addresses, recalculates the cart totals, and returns an updated cart.
 */
class CartUpdateCustomer extends AbstractCartRoute {
	use DraftOrderTrait;
	use UpdateCustomerTrait;

	/**
	 * The route identifier.
	 *
	 * @var string
	 */
	const IDENTIFIER = 'cart-update-customer';

	/**
	 * Get the path of this REST route.
	 *
	 * @return string
	 */
	public function get_path() {
		return '/cart/update-customer';
	}

	/**
	 * Handle the request and return a valid response for this endpoint.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return \WP_REST_Response
	 */
	protected function get_route_post_response( \WP_REST_Request $request ) {
		$cart     = $this->cart_controller->get_cart_instance();
		$customer = wc()->customer;

		// Get data from request object and merge with customer object, then sanitize.
		$billing  = $this->schema->billing_address_schema->sanitize_callback(
			wp_parse_args(
				$request['billing_address'] ?? [],
				$this->get_customer_billing_address( $customer )
			),
			$request,
			'billing_address'
		);
		$shipping = $this->schema->billing_address_schema->sanitize_callback(
			wp_parse_args(
				$request['shipping_address'] ?? [],
				$this->get_customer_shipping_address( $customer )
			),
			$request,
			'shipping_address'
		);

		// If the cart does not need shipping, shipping address is forced to match billing address unless defined.
		if ( ! $cart->needs_shipping() && ! isset( $request['shipping_address'] ) ) {
			$shipping = $billing;
		}

		// Run validation and sanitization now that the cart and customer data is loaded.
		$billing  = $this->schema->billing_address_schema->sanitize_callback( $billing, $request, 'billing_address' );
		$shipping = $this->schema->shipping_address_schema->sanitize_callback( $shipping, $request, 'shipping_address' );

		// Validate data now everything is clean..
		$validation_check = $this->validate_address_params( $request, $billing, $shipping );

		if ( is_wp_error( $validation_check ) ) {
			return rest_ensure_response( $validation_check );
		}

		$customer->set_props(
			array(
				'billing_first_name'  => $billing['first_name'] ?? null,
				'billing_last_name'   => $billing['last_name'] ?? null,
				'billing_company'     => $billing['company'] ?? null,
				'billing_address_1'   => $billing['address_1'] ?? null,
				'billing_address_2'   => $billing['address_2'] ?? null,
				'billing_city'        => $billing['city'] ?? null,
				'billing_state'       => $billing['state'] ?? null,
				'billing_postcode'    => $billing['postcode'] ?? null,
				'billing_country'     => $billing['country'] ?? null,
				'billing_phone'       => $billing['phone'] ?? null,
				'billing_email'       => $billing['email'] ?? null,
				'shipping_first_name' => $shipping['first_name'] ?? null,
				'shipping_last_name'  => $shipping['last_name'] ?? null,
				'shipping_company'    => $shipping['company'] ?? null,
				'shipping_address_1'  => $shipping['address_1'] ?? null,
				'shipping_address_2'  => $shipping['address_2'] ?? null,
				'shipping_city'       => $shipping['city'] ?? null,
				'shipping_state'      => $shipping['state'] ?? null,
				'shipping_postcode'   => $shipping['postcode'] ?? null,
				'shipping_country'    => $shipping['country'] ?? null,
				'shipping_phone'      => $shipping['phone'] ?? null,
			)
		);

		wc_do_deprecated_action(
			'woocommerce_blocks_cart_update_customer_from_request',
			array(
				$customer,
				$request,
			),
			'7.2.0',
			'woocommerce_store_api_cart_update_customer_from_request',
			'This action was deprecated in WooCommerce Blocks version 7.2.0. Please use woocommerce_store_api_cart_update_customer_from_request instead.'
		);

		/**
		 * Fires when the Checkout Block/Store API updates a customer from the API request data.
		 *
		 * @since 7.2.0
		 *
		 * @param \WC_Customer $customer Customer object.
		 * @param \WP_REST_Request $request Full details about the request.
		 */
		do_action( 'woocommerce_store_api_cart_update_customer_from_request', $customer, $request );

		$customer->save();

		$this->cart_controller->calculate_totals();

		return rest_ensure_response( $this->schema->get_item_response( $cart ) );
	}
}
