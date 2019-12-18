<?php
/**
 * Customer schema.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\RestApi\StoreApi\Schemas;

defined( 'ABSPATH' ) || exit;

use \WC_Customer as CustomerObject;

/**
 * CustomerSchema class.
 */
class CustomerSchema extends AbstractSchema {
	/**
	 * The schema item name.
	 *
	 * @var string
	 */
	protected $title = 'customer';

	/**
	 * Customer schema properties.
	 *
	 * @return array
	 */
	protected function get_properties() {
		return [
			'id'         => [
				'description' => __( 'Unique identifier for the resource.', 'woo-gutenberg-products-block' ),
				'type'        => 'integer',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'username'   => [
				'description' => __( 'Customer login name.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'first_name' => [
				'description' => __( 'Customer first name.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'arg_options' => [
					'sanitize_callback' => 'sanitize_text_field',
				],
			],
			'last_name'  => [
				'description' => __( 'Customer last name.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'arg_options' => [
					'sanitize_callback' => 'sanitize_text_field',
				],
			],
			'email'      => [
				'description' => __( 'The email address for the customer.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'format'      => 'email',
				'context'     => [ 'view', 'edit' ],
			],
			'billing'    => [
				'description' => __( 'List of billing address data.', 'woo-gutenberg-products-block' ),
				'type'        => 'object',
				'context'     => [ 'view', 'edit' ],
				'properties'  => [
					'first_name' => [
						'description' => __( 'First name.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => [ 'view', 'edit' ],
					],
					'last_name'  => [
						'description' => __( 'Last name.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => [ 'view', 'edit' ],
					],
					'company'    => [
						'description' => __( 'Company name.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => [ 'view', 'edit' ],
					],
					'address_1'  => [
						'description' => __( 'Address line 1', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => [ 'view', 'edit' ],
					],
					'address_2'  => [
						'description' => __( 'Address line 2', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => [ 'view', 'edit' ],
					],
					'city'       => [
						'description' => __( 'City name.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => [ 'view', 'edit' ],
					],
					'state'      => [
						'description' => __( 'ISO code or name of the state, province or district.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => [ 'view', 'edit' ],
					],
					'postcode'   => [
						'description' => __( 'Postal code.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => [ 'view', 'edit' ],
					],
					'country'    => [
						'description' => __( 'ISO code of the country.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => [ 'view', 'edit' ],
					],
					'email'      => [
						'description' => __( 'Email address.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'format'      => 'email',
						'context'     => [ 'view', 'edit' ],
					],
					'phone'      => [
						'description' => __( 'Phone number.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => [ 'view', 'edit' ],
					],
				],
			],
			'shipping'   => [
				'description' => __( 'List of shipping address data.', 'woo-gutenberg-products-block' ),
				'type'        => 'object',
				'context'     => [ 'view', 'edit' ],
				'properties'  => [
					'first_name' => [
						'description' => __( 'First name.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => [ 'view', 'edit' ],
					],
					'last_name'  => [
						'description' => __( 'Last name.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => [ 'view', 'edit' ],
					],
					'company'    => [
						'description' => __( 'Company name.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => [ 'view', 'edit' ],
					],
					'address_1'  => [
						'description' => __( 'Address line 1', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => [ 'view', 'edit' ],
					],
					'address_2'  => [
						'description' => __( 'Address line 2', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => [ 'view', 'edit' ],
					],
					'city'       => [
						'description' => __( 'City name.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => [ 'view', 'edit' ],
					],
					'state'      => [
						'description' => __( 'ISO code or name of the state, province or district.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => [ 'view', 'edit' ],
					],
					'postcode'   => [
						'description' => __( 'Postal code.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => [ 'view', 'edit' ],
					],
					'country'    => [
						'description' => __( 'ISO code of the country.', 'woo-gutenberg-products-block' ),
						'type'        => 'string',
						'context'     => [ 'view', 'edit' ],
					],
				],
			],
		];
	}

	/**
	 * Convert a woo customer into an object suitable for the response.
	 *
	 * @param CustomerObject $object Customer object.
	 * @return array
	 */
	public function get_item_response( $object ) {
		return [
			'id'         => $object->get_id(),
			'username'   => $object->get_username(),
			'first_name' => $object->get_first_name(),
			'last_name'  => $object->get_last_name(),
			'email'      => $object->get_email(),
			'billing'    => [
				'first_name' => $object->get_billing_first_name(),
				'last_name'  => $object->get_billing_last_name(),
				'company'    => $object->get_billing_company(),
				'address_1'  => $object->get_billing_address_1(),
				'address_2'  => $object->get_billing_address_2(),
				'city'       => $object->get_billing_city(),
				'state'      => $object->get_billing_state(),
				'postcode'   => $object->get_billing_postcode(),
				'country'    => $object->get_billing_country(),
				'email'      => $object->get_billing_email(),
				'phone'      => $object->get_billing_phone(),
			],
			'shipping'   => [
				'first_name' => $object->get_shipping_first_name(),
				'last_name'  => $object->get_shipping_last_name(),
				'company'    => $object->get_shipping_company(),
				'address_1'  => $object->get_shipping_address_1(),
				'address_2'  => $object->get_shipping_address_2(),
				'city'       => $object->get_shipping_city(),
				'state'      => $object->get_shipping_state(),
				'postcode'   => $object->get_shipping_postcode(),
				'country'    => $object->get_shipping_country(),
			],
		];
	}
}
