<?php
namespace Automattic\WooCommerce\StoreApi\Schemas\V1;

use Automattic\WooCommerce\StoreApi\Exceptions\RouteException;
use Automattic\WooCommerce\StoreApi\Utilities\ValidationUtils;

/**
 * BillingAddressSchema class.
 *
 * Provides a generic billing address schema for composition in other schemas.
 */
class BillingAddressSchema extends AbstractAddressSchema {
	/**
	 * The schema item name.
	 *
	 * @var string
	 */
	protected $title = 'billing_address';

	/**
	 * The schema item identifier.
	 *
	 * @var string
	 */
	const IDENTIFIER = 'billing-address';

	/**
	 * Term properties.
	 *
	 * @return array
	 */
	public function get_properties() {
		$properties = parent::get_properties();
		return array_merge(
			$properties,
			[
				'email' => [
					'description' => __( 'Email', 'woo-gutenberg-products-block' ),
					'type'        => 'string',
					'context'     => [ 'view', 'edit' ],
					'required'    => true,
				],
			]
		);
	}

	/**
	 * Sanitize and format the given address object.
	 *
	 * @param array            $address Value being sanitized.
	 * @param \WP_REST_Request $request The Request.
	 * @param string           $param The param being sanitized.
	 * @return array
	 */
	public function sanitize_callback( $address, $request, $param ) {
		$address          = parent::sanitize_callback( $address, $request, $param );
		$address['email'] = wc_clean( wp_unslash( $address['email'] ) );
		return $address;
	}

	/**
	 * Validate the given address object.
	 *
	 * @param array            $address Value being sanitized.
	 * @param \WP_REST_Request $request The Request.
	 * @param string           $param The param being sanitized.
	 * @return true|\WP_Error
	 */
	public function validate_callback( $address, $request, $param ) {
		$errors  = parent::validate_callback( $address, $request, $param );
		$address = $this->sanitize_callback( $address, $request, $param );
		$errors  = is_wp_error( $errors ) ? $errors : new \WP_Error();

		if ( ! empty( $address['email'] ) && ! is_email( $address['email'] ) ) {
			$errors->add(
				'invalid_email',
				__( 'The provided email address is not valid', 'woo-gutenberg-products-block' )
			);
		}

		return $errors->has_errors( $errors ) ? $errors : true;
	}

	/**
	 * Returns the address data in array format.
	 *
	 * @param \WC_Order|\WC_Customer $customer_or_order An object with shipping address.
	 * @return array|null
	 */
	public function get_address_data( $customer_or_order ) {
		if ( ( $customer_or_order instanceof \WC_Customer || $customer_or_order instanceof \WC_Order ) ) {
			$validation_util = new ValidationUtils();
			$billing_country = $customer_or_order->get_billing_country();
			$billing_state   = $customer_or_order->get_billing_state();

			if ( ! $validation_util->validate_state( $billing_state, $billing_country ) ) {
				$billing_state = '';
			}

			return [
				'first_name' => $customer_or_order->get_billing_first_name(),
				'last_name'  => $customer_or_order->get_billing_last_name(),
				'company'    => $customer_or_order->get_billing_company(),
				'address_1'  => $customer_or_order->get_billing_address_1(),
				'address_2'  => $customer_or_order->get_billing_address_2(),
				'city'       => $customer_or_order->get_billing_city(),
				'state'      => $billing_state,
				'postcode'   => $customer_or_order->get_billing_postcode(),
				'country'    => $billing_country,
				'email'      => $customer_or_order->get_billing_email(),
				'phone'      => $customer_or_order->get_billing_phone(),
			];
		}
		return null;
	}

	/**
	 * Convert a term object into an object suitable for the response.
	 *
	 * @param \WC_Order|\WC_Customer $customer_or_order An object with billing address.
	 *
	 * @throws RouteException When the invalid object types are provided.
	 * @return stdClass
	 */
	public function get_item_response( $customer_or_order ) {
		$address = $this->get_address_data( $customer_or_order );

		if ( ! is_null( $address ) ) {
			return (object) $this->prepare_html_response( $address );
		}

		throw new RouteException(
			'invalid_object_type',
			sprintf(
				/* translators: Placeholders are class and method names */
				__( '%1$s requires an instance of %2$s or %3$s for the address', 'woo-gutenberg-products-block' ),
				'BillingAddressSchema::get_item_response',
				'WC_Customer',
				'WC_Order'
			),
			500
		);
	}
}
