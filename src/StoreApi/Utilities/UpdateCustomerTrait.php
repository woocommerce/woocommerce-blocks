<?php
namespace Automattic\WooCommerce\StoreApi\Utilities;

use Automattic\WooCommerce\StoreApi\Utilities\ValidationUtils;

/**
 * UpdateCustomerTrait
 *
 * Shared functionality for updating customer data.
 */
trait UpdateCustomerTrait {
	/**
	 * Get method arguments for this REST route.
	 *
	 * @return array An array of endpoints.
	 */
	public function get_args() {
		return [
			[
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => [ $this, 'get_response' ],
				'permission_callback' => '__return_true',
				'args'                => [
					'billing_address'  => [
						'description'       => __( 'Billing address.', 'woo-gutenberg-products-block' ),
						'type'              => 'object',
						'context'           => [ 'view', 'edit' ],
						'properties'        => $this->schema->billing_address_schema->get_properties(),
						'sanitize_callback' => null,
					],
					'shipping_address' => [
						'description'       => __( 'Shipping address.', 'woo-gutenberg-products-block' ),
						'type'              => 'object',
						'context'           => [ 'view', 'edit' ],
						'properties'        => $this->schema->shipping_address_schema->get_properties(),
						'sanitize_callback' => null,
					],
				],
			],
			'schema'      => [ $this->schema, 'get_public_item_schema' ],
			'allow_batch' => [ 'v1' => true ],
		];
	}

	/**
	 * Validate address params now they are populated.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @param array            $billing Billing address.
	 * @param array            $shipping Shipping address.
	 * @return \WP_Error|true
	 */
	protected function validate_address_params( $request, $billing, $shipping ) {
		$posted_billing  = isset( $request['billing_address'] );
		$posted_shipping = isset( $request['shipping_address'] );
		$invalid_params  = array();
		$invalid_details = array();

		if ( $posted_billing ) {
			$billing_validation_check = $this->schema->billing_address_schema->validate_callback( $billing, $request, 'billing_address' );

			if ( false === $billing_validation_check ) {
				$invalid_params['billing_address'] = __( 'Invalid parameter.', 'woo-gutenberg-products-block' );
			} elseif ( is_wp_error( $billing_validation_check ) ) {
				$invalid_params['billing_address']  = implode( ' ', $billing_validation_check->get_error_messages() );
				$invalid_details['billing_address'] = \rest_convert_error_to_response( $billing_validation_check )->get_data();
			}
		}

		if ( $posted_shipping ) {
			$shipping_validation_check = $this->schema->shipping_address_schema->validate_callback( $shipping, $request, 'shipping_address' );

			if ( false === $shipping_validation_check ) {
				$invalid_params['shipping_address'] = __( 'Invalid parameter.', 'woo-gutenberg-products-block' );
			} elseif ( is_wp_error( $shipping_validation_check ) ) {
				$invalid_params['shipping_address']  = implode( ' ', $shipping_validation_check->get_error_messages() );
				$invalid_details['shipping_address'] = \rest_convert_error_to_response( $shipping_validation_check )->get_data();
			}
		}

		if ( $invalid_params ) {
			return new \WP_Error(
				'rest_invalid_param',
				/* translators: %s: List of invalid parameters. */
				sprintf( __( 'Invalid parameter(s): %s', 'woo-gutenberg-products-block' ), implode( ', ', array_keys( $invalid_params ) ) ),
				[
					'status'  => 400,
					'params'  => $invalid_params,
					'details' => $invalid_details,
				]
			);
		}

		return true;
	}

	/**
	 * Get full customer billing address.
	 *
	 * @param \WC_Customer $customer Customer object.
	 * @return array
	 */
	protected function get_customer_billing_address( \WC_Customer $customer ) {
		$validation_util = new ValidationUtils();
		$billing_country = $customer->get_billing_country();
		$billing_state   = $customer->get_billing_state();

		/**
		 * There's a bug in WooCommerce core in which not having a state ("") would result in us validating against the store's state.
		 * This resets the state to an empty string if it doesn't match the country.
		 *
		 * @todo Removing this handling once we fix the issue with the state value always being the store one.
		 */
		if ( ! $validation_util->validate_state( $billing_state, $billing_country ) ) {
			$billing_state = '';
		}
		return [
			'first_name' => $customer->get_billing_first_name(),
			'last_name'  => $customer->get_billing_last_name(),
			'company'    => $customer->get_billing_company(),
			'address_1'  => $customer->get_billing_address_1(),
			'address_2'  => $customer->get_billing_address_2(),
			'city'       => $customer->get_billing_city(),
			'state'      => $billing_state,
			'postcode'   => $customer->get_billing_postcode(),
			'country'    => $billing_country,
			'phone'      => $customer->get_billing_phone(),
			'email'      => $customer->get_billing_email(),
		];
	}

	/**
	 * Get full customer shipping address.
	 *
	 * @param \WC_Customer $customer Customer object.
	 * @return array
	 */
	protected function get_customer_shipping_address( \WC_Customer $customer ) {
		return [
			'first_name' => $customer->get_shipping_first_name(),
			'last_name'  => $customer->get_shipping_last_name(),
			'company'    => $customer->get_shipping_company(),
			'address_1'  => $customer->get_shipping_address_1(),
			'address_2'  => $customer->get_shipping_address_2(),
			'city'       => $customer->get_shipping_city(),
			'state'      => $customer->get_shipping_state(),
			'postcode'   => $customer->get_shipping_postcode(),
			'country'    => $customer->get_shipping_country(),
			'phone'      => $customer->get_shipping_phone(),
		];
	}
}
