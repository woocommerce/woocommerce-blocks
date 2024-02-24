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
		$address['email'] = sanitize_text_field( wp_unslash( $address['email'] ) );
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
	 * Convert a term object into an object suitable for the response.
	 *
	 * @param \WC_Order|\WC_Customer $address An object with billing address.
	 *
	 * @throws RouteException When the invalid object types are provided.
	 * @return array
	 */
	public function get_item_response( $address ) {
		$validation_util = new ValidationUtils();
		if ( ( $address instanceof \WC_Customer || $address instanceof \WC_Order ) ) {
			$billing_country = $address->get_billing_country();
			$billing_state   = $address->get_billing_state();

			if ( ! $validation_util->validate_state( $billing_state, $billing_country ) ) {
				$billing_state = '';
			}

			if ( $address instanceof \WC_Order ) {
				// get additional fields from order.
				$additional_address_fields = $this->additional_fields_controller->get_all_fields_from_order( $address );
			} elseif ( $address instanceof \WC_Customer ) {
				// get additional fields from customer.
				$additional_address_fields = $this->additional_fields_controller->get_all_fields_from_customer( $address );
			}

			$additional_address_fields = array_reduce(
				array_keys( $additional_address_fields ),
				function( $carry, $key ) use ( $additional_address_fields ) {
					if ( 0 === strpos( $key, '/billing/' ) ) {
						$value         = $additional_address_fields[ $key ];
						$key           = str_replace( '/billing/', '', $key );
						$carry[ $key ] = $value;
					}
					return $carry;
				},
				[]
			);

			$address_object = \array_merge(
				[
					'first_name' => $address->get_billing_first_name(),
					'last_name'  => $address->get_billing_last_name(),
					'company'    => $address->get_billing_company(),
					'address_1'  => $address->get_billing_address_1(),
					'address_2'  => $address->get_billing_address_2(),
					'city'       => $address->get_billing_city(),
					'state'      => $billing_state,
					'postcode'   => $address->get_billing_postcode(),
					'country'    => $billing_country,
					'email'      => $address->get_billing_email(),
					'phone'      => $address->get_billing_phone(),
				],
				$additional_address_fields
			);

			// Add any missing keys from additional_fields_controller to the address response.
			foreach ( $this->additional_fields_controller->get_address_fields_keys() as $field ) {
				if ( isset( $address_object[ $field ] ) ) {
					continue;
				}
				$address_object[ $field ] = '';
			}

			return $this->prepare_html_response( $address_object );
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
