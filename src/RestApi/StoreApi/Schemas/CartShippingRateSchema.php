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
			'shipping-rates' => [
				'description' => __( 'List of shipping rates.', 'woo-gutenberg-products-block' ),
				'type'        => 'array',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
				'items'       => $this->get_rate_properties(),
			],
			'items'          => [
				'description' => __( 'List of cart items (keys) the returned shipping rates apply to.', 'woo-gutenberg-products-block' ),
				'type'        => 'array',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
				'items'       => [
					'type' => 'string',
				],
			],
		];
	}

	/**
	 * Schema for a single rate.
	 *
	 * @return array
	 */
	protected function get_rate_properties() {
		return [
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
			'id'            => [
				'description' => __( 'ID of the shipping rate.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'method_id'     => [
				'description' => __( 'ID of the shipping method that provided the rate.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'instance_id'   => [
				'description' => __( 'Instance ID of the shipping method that provided the rate.', 'woo-gutenberg-products-block' ),
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
	 * @param array $package Shipping package complete with rates from WooCommerce.
	 * @return array
	 */
	public function get_item_response( $package ) {
		return [
			'items'          => array_values( wp_list_pluck( $package['contents'], 'key' ) ),
			'shipping-rates' => array_values( array_map( [ $this, 'get_rate_response' ], $package['rates'] ) ),
		];
	}

	/**
	 * Response for a single rate.
	 *
	 * @param WC_Shipping_Rate $rate Rate object.
	 * @return array
	 */
	protected function get_rate_response( $rate ) {
		return [
			'name'          => $this->get_rate_prop( $rate, 'label' ),
			'description'   => $this->get_rate_prop( $rate, 'description' ),
			'handling_time' => $this->get_rate_prop( $rate, 'handling_time' ),
			'price'         => $this->get_rate_prop( $rate, 'cost' ),
			'rate_id'       => $this->get_rate_prop( $rate, 'id' ),
			'instance_id'   => $this->get_rate_prop( $rate, 'instance_id' ),
			'method_id'     => $this->get_rate_prop( $rate, 'method_id' ),
			'meta_data'     => $this->get_rate_meta_data( $rate ),
		];
	}

	/**
	 * Gets a prop of the rate object, if callable.
	 *
	 * @param WC_Shipping_Rate $rate Rate object.
	 * @param string           $prop Prop name.
	 * @return string
	 */
	protected function get_rate_prop( $rate, $prop ) {
		$getter = 'get_' . $prop;
		return \is_callable( array( $rate, $getter ) ) ? $rate->$getter() : '';
	}

	/**
	 * Converts rate meta data into a suitable response object.
	 *
	 * @param WC_Shipping_Rate $rate Rate object.
	 * @return array
	 */
	protected function get_rate_meta_data( $rate ) {
		$meta_data = $rate->get_meta_data();

		return array_reduce(
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
	}
}
