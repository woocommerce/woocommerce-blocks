<?php
namespace Automattic\WooCommerce\StoreApi\Schemas\V1;

use Automattic\WooCommerce\StoreApi\Utilities\ValidationUtils;
use Automattic\WooCommerce\Blocks\Domain\Services\CheckoutFields;
use Automattic\WooCommerce\StoreApi\Schemas\ExtendSchema;
use Automattic\WooCommerce\StoreApi\SchemaController;
use Automattic\WooCommerce\Blocks\Package;
/**
 * AddressSchema class.
 *
 * Provides a generic address schema for composition in other schemas.
 */
abstract class AbstractAddressSchema extends AbstractSchema {

	/**
	 * Additional fields controller.
	 *
	 * @var CheckoutFields
	 */
	protected $additional_fields_controller;

	/**
	 * Constructor.
	 *
	 * @param ExtendSchema     $extend ExtendSchema instance.
	 * @param SchemaController $controller Schema Controller instance.
	 */
	public function __construct( ExtendSchema $extend, SchemaController $controller ) {
		parent::__construct( $extend, $controller );
		$this->additional_fields_controller = Package::container()->get( CheckoutFields::class );
	}
	/**
	 * Term properties.
	 *
	 * @internal Note that required properties don't require values, just that they are included in the request.
	 * @return array
	 */
	public function get_properties() {
		return array_merge(
			[
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
			],
			$this->get_additional_address_fields_schema(),
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
		$validation_util = new ValidationUtils();
		$address         = array_merge( array_fill_keys( array_keys( $this->get_properties() ), '' ), (array) $address );
		$address         = array_reduce(
			array_keys( $address ),
			function( $carry, $key ) use ( $address, $validation_util ) {
				switch ( $key ) {
					case 'country':
						$carry[ $key ] = wc_strtoupper( sanitize_text_field( wp_unslash( $address[ $key ] ) ) );
						break;
					case 'state':
						$carry[ $key ] = $validation_util->format_state( sanitize_text_field( wp_unslash( $address[ $key ] ) ), $address['country'] );
						break;
					case 'postcode':
						$carry[ $key ] = $address['postcode'] ? wc_format_postcode( sanitize_text_field( wp_unslash( $address['postcode'] ) ), $address['country'] ) : '';
						break;
					default:
						$carry[ $key ] = sanitize_text_field( wp_unslash( $address[ $key ] ) );
						break;
				}
				return $carry;
			},
			[]
		);

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

	/**
	 * Get additional address fields schema.
	 *
	 * @return array
	 */
	protected function get_additional_address_fields_schema() {
		$additional_fields_keys = $this->additional_fields_controller->get_address_fields_keys();

		$fields = array_merge( $this->additional_fields_controller->get_core_fields(), $this->additional_fields_controller->get_additional_fields() );

		$address_fields = array_filter(
			$fields,
			function( $key ) use ( $additional_fields_keys ) {
				return in_array( $key, $additional_fields_keys, true );
			},
			ARRAY_FILTER_USE_KEY
		);

		$schema = [];
		foreach ( $address_fields as $key => $field ) {
			$schema[ $key ] = [
				'description' => $field['label'],
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'required'    => true,
			];
		}
		return $schema;
	}
}
