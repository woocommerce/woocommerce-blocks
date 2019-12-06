<?php
/**
 * Cart shipping rate schema.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\RestApi\StoreApi\Schemas;

defined( 'ABSPATH' ) || exit;

use \WC_Shipping_Rate as ShippingRate;
use Automattic\WooCommerce\Blocks\RestApi\StoreApi\Controllers\CartItems as CartItemsController;

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
		$cart_item_schema = new CartItemSchema();

		return [
			'package_id' => [
				'description' => __( 'Package ID.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'rates'      => [
				'description' => __( 'List of shipping rates.', 'woo-gutenberg-products-block' ),
				'type'        => 'array',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
				'items'       => $this->get_rate_properties(),
			],
			'contents'   => [
				'description' => __( 'If the cart is made up of multiple shipments, this contains information about the package. Otherwise this returns null.', 'woo-gutenberg-products-block' ),
				'type'        => 'array',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
				'items'       => [
					'type'       => 'object',
					'properties' => $cart_item_schema->get_properties(),
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
	 * @param int   $package_id Package index (ID).
	 * @param array $package    Shipping package complete with rates from WooCommerce.
	 * @return array
	 */
	public function get_item_response( $package_id, $package ) {
		$cart_item_controller = new CartItemsController();
		$items_in_package     = array();
		foreach ( $package['contents'] as $cart_item ) {
			$data               = $cart_item_controller->prepare_item_for_response( $cart_item, [] );
			$items_in_package[] = $cart_item_controller->prepare_response_for_collection( $data );
		}

		return [
			'package_id' => $package_id,
			'rates'      => array_map( [ $this, 'get_rate_response' ], $package['rates'] ),
			'contents'   => $items_in_package,
		];
	}

	/**
	 * Response for a single rate.
	 *
	 * @param WC_Shipping_Rate $rate Rate object.
	 * @return array
	 */
	protected function get_rate_response( $rate ) {
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
			'rate_id'       => $rate->get_id(),
			'instance'      => $rate->get_instance_id(),
			'method'        => $rate->get_method_id(),
			'name'          => $rate->get_label(),
			'description'   => '',
			'handling_time' => '',
			'price'         => $rate->get_cost(),
			'meta_data'     => $return_meta,
		];
	}
}
