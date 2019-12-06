<?php
/**
 * Cart shipping rate schema.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\RestApi\StoreApi\Schemas;

defined( 'ABSPATH' ) || exit;

use \WC_Shipping_Rate as ShippingRate;

/**
 * CartShippingRateSchema class.
 */
class CartShippingRateSchema extends AbstractSchema {
	/**
	 * The schema item name.
	 *
	 * @var string
	 */
	protected $title = 'cart-shipping-rate';

	/**
	 * Cart schema properties.
	 *
	 * @return array
	 */
	protected function get_properties() {
		return [
			'id'            => [
				'description' => __( 'ID of the shipping rate.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'name'          => [
				'description' => __( 'Name of the shipping rate, e.g. Express shipping.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'description'   => [
				'description' => __( 'Description of the shipping rate, e.g. Dispatched via USPS.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'delivery_time' => [
				'description' => __( 'Delivery time estimate text, e.g. 3-5 business days.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'price'         => [
				'description' => __( 'Price of this shipping rate.', 'woo-gutenberg-products-block' ),
				'type'        => 'boolean',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'source'        => [
				'description' => __( 'Source of the shipping rate, e.g. the name of the shipping method.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'group'         => [
				'description' => __( 'Group that the rate is part of, if the cart is made up of multiple shipments.', 'woo-gutenberg-products-block' ),
				'type'        => 'integer',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'meta_data'     => [
				'description' => __( 'Meta data attached to the shipping rate.', 'woo-gutenberg-products-block' ),
				'type'        => 'array',
				'context'     => [ 'view', 'edit' ],
				'items'       => [
					'type'       => 'object',
					'properties' => [
						'key'   => [
							'description' => __( 'Meta key.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'value' => [
							'description' => __( 'Meta value.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
					],
				],
			],
		];
	}

	/**
	 * Convert a shipping rate from WooCommerce into a valid response.
	 *
	 * @param ShippingRate $rate Shipping rate object instance.
	 * @param int          $package_id ID/index of the package.
	 * @param array        $package Shipping package this rate is for.
	 * @return array
	 */
	public function get_item_response( $rate, $package_id, $package ) {
		$meta_data   = $rate->get_meta_data();
		$return_meta = array_reduce(
			array_keys( $meta_data ),
			function( $return, $key ) use ( $meta_data ) {
				$return[] = [
					'key'   => $key,
					'value' => $meta_data[ $key ],
				];
				return $return;
			},
			[]
		);
		return [
			'id'            => $rate->get_instance_id(),
			'name'          => $rate->get_label(),
			'description'   => '',
			'handling_time' => '',
			'price'         => $rate->get_cost(),
			'source'        => $rate->get_method_id(),
			'group'         => $package_id,
			'meta_data'     => $return_meta,
		];
	}
}
