<?php
namespace Automattic\WooCommerce\Blocks\StoreApi\Schemas;

use Automattic\WooCommerce\Blocks\RestApi\Routes;

/**
 * BillingAddressSchema class.
 *
 * Provides a generic billing address schema for composition in other schemas.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 */
class BillingAddressSchema extends AbstractSchema {
	/**
	 * The schema item name.
	 *
	 * @var string
	 */
	protected $title = 'billing_address';

	/**
	 * Term properties.
	 *
	 * @return array
	 */
	public function get_properties() {
		return [
			'first_name' => [
				'description' => __( 'First name', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
			],
			'last_name'  => [
				'description' => __( 'Last name', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
			],
			'company'    => [
				'description' => __( 'Company', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
			],
			'address_1'  => [
				'description' => __( 'Address', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
			],
			'address_2'  => [
				'description' => __( 'Apartment, suite, etc.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
			],
			'city'       => [
				'description' => __( 'City', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
			],
			'state'      => [
				'description' => __( 'State/County code, or name of the state, county, province, or district.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
			],
			'postcode'   => [
				'description' => __( 'Postal code', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
			],
			'country'    => [
				'description' => __( 'Country/Region code in ISO 3166-1 alpha-2 format.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
			],
			'email'      => [
				'description' => __( 'Email', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'format'      => 'email',
				'context'     => [ 'view', 'edit' ],
			],
			'phone'      => [
				'description' => __( 'Phone', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
			],
		];
	}

	/**
	 * Convert a term object into an object suitable for the response.
	 *
	 * @param \WC_Order|\WC_Customer $address An object with billing address.
	 *
	 * @throws RouteException When the invalid object types are provided.
	 * @return stdClass
	 */
	public function get_item_response( $address ) {
		if ( ( $address instanceof \WC_Customer || $address instanceof \WC_Order ) ) {
			return (object) $this->prepare_html_response(
				[
					'first_name' => $address->get_billing_first_name(),
					'last_name'  => $address->get_billing_last_name(),
					'company'    => $address->get_billing_company(),
					'address_1'  => $address->get_billing_address_1(),
					'address_2'  => $address->get_billing_address_2(),
					'city'       => $address->get_billing_city(),
					'state'      => $address->get_billing_state(),
					'postcode'   => $address->get_billing_postcode(),
					'country'    => $address->get_billing_country(),
					'email'      => $address->get_billing_email(),
					'phone'      => $address->get_billing_phone(),
				]
			);
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
