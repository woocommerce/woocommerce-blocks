<?php
namespace Automattic\WooCommerce\StoreApi\Schemas\V1;

use Automattic\WooCommerce\StoreApi\Utilities\ValidationUtils;

/**
 * AddressSchema class.
 *
 * Provides a generic address schema for composition in other schemas.
 */
abstract class AbstractAddressSchema extends AbstractSchema {
	/**
	 * Term properties.
	 *
	 * @internal Note that required properties don't require values, just that they are included in the request.
	 * @return array
	 */
	public function get_properties() {
		return [
			'first_name' => [
				'description' => __( 'First name', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'required'    => true,
			],
			'last_name'  => [
				'description' => __( 'Last name', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'required'    => true,
			],
			'company'    => [
				'description' => __( 'Company', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'required'    => true,
			],
			'address_1'  => [
				'description' => __( 'Address', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'required'    => true,
			],
			'address_2'  => [
				'description' => __( 'Apartment, suite, etc.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'required'    => true,
			],
			'city'       => [
				'description' => __( 'City', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'required'    => true,
			],
			'state'      => [
				'description' => __( 'State/County code, or name of the state, county, province, or district.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'required'    => true,
			],
			'postcode'   => [
				'description' => __( 'Postal code', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'required'    => true,
			],
			'country'    => [
				'description' => __( 'Country/Region code in ISO 3166-1 alpha-2 format.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'required'    => true,
			],
			'phone'      => [
				'description' => __( 'Phone', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'required'    => true,
			],
		];
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
		$validation_util = new ValidationUtils();

		$address               = array_merge( array_fill_keys( array_keys( $this->get_properties() ), '' ), (array) $address );
		$address['country']    = wc_strtoupper( sanitize_text_field( wp_unslash( $address['country'] ) ) );
		$address['first_name'] = sanitize_text_field( wp_unslash( $address['first_name'] ) );
		$address['last_name']  = sanitize_text_field( wp_unslash( $address['last_name'] ) );
		$address['company']    = sanitize_text_field( wp_unslash( $address['company'] ) );
		$address['address_1']  = sanitize_text_field( wp_unslash( $address['address_1'] ) );
		$address['address_2']  = sanitize_text_field( wp_unslash( $address['address_2'] ) );
		$address['city']       = sanitize_text_field( wp_unslash( $address['city'] ) );
		$address['state']      = $validation_util->format_state( sanitize_text_field( wp_unslash( $address['state'] ) ), $address['country'] );
		$address['postcode']   = $address['postcode'] ? wc_format_postcode( sanitize_text_field( wp_unslash( $address['postcode'] ) ), $address['country'] ) : '';
		$address['phone']      = sanitize_text_field( wp_unslash( $address['phone'] ) );
		return $address;
	}

	/**
	 * Validate the given address object.
	 *
	 * @see rest_validate_value_from_schema
	 *
	 * @param array            $address Value being sanitized.
	 * @param \WP_REST_Request $request The Request.
	 * @param string           $param The param being sanitized.
	 * @return true|\WP_Error
	 */
	public function validate_callback( $address, $request, $param ) {
		$errors          = new \WP_Error();
		$address         = $this->sanitize_callback( $address, $request, $param );
		$validation_util = new ValidationUtils();

		if ( ! empty( $address['country'] ) && ! in_array( $address['country'], array_keys( wc()->countries->get_countries() ), true ) ) {
			$errors->add(
				'invalid_country',
				sprintf(
					/* translators: %s valid country codes */
					__( 'Invalid country code provided. Must be one of: %s', 'woo-gutenberg-products-block' ),
					implode( ', ', array_keys( wc()->countries->get_countries() ) )
				)
			);
			return $errors;
		}

		if ( ! empty( $address['state'] ) && ! $validation_util->validate_state( $address['state'], $address['country'] ) ) {
			$errors->add(
				'invalid_state',
				sprintf(
					/* translators: %1$s given state, %2$s valid states */
					__( 'The provided state (%1$s) is not valid. Must be one of: %2$s', 'woo-gutenberg-products-block' ),
					esc_html( $address['state'] ),
					implode( ', ', array_keys( $validation_util->get_states_for_country( $address['country'] ) ) )
				)
			);
		}

		if ( ! empty( $address['postcode'] ) && ! \WC_Validation::is_postcode( $address['postcode'], $address['country'] ) ) {
			$errors->add(
				'invalid_postcode',
				__( 'The provided postcode / ZIP is not valid', 'woo-gutenberg-products-block' )
			);
		}

		if ( ! empty( $address['phone'] ) && ! \WC_Validation::is_phone( $address['phone'] ) ) {
			$errors->add(
				'invalid_phone',
				__( 'The provided phone number is not valid', 'woo-gutenberg-products-block' )
			);
		}

		return $errors->has_errors( $errors ) ? $errors : true;
	}
}
