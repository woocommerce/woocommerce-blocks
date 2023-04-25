<?php
namespace Automattic\WooCommerce\StoreApi\Schemas\V1;

use Automattic\WooCommerce\StoreApi\Utilities\QuantityLimits;

/**
 * OrderItemSchema class.
 */
class OrderItemSchema extends ProductSchema {

	/**
	 * The schema item name.
	 *
	 * @var string
	 */
	protected $title = 'order_item';

	/**
	 * The schema item identifier.
	 *
	 * @var string
	 */
	const IDENTIFIER = 'order-item';

	/**
	 * Order schema properties.
	 *
	 * @return array
	 */
	public function get_properties() {
		return [
			'id'                => [
				'description' => __( 'The order item product or variation ID.', 'woo-gutenberg-products-block' ),
				'type'        => 'integer',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'quantity'          => [
				'description' => __( 'Quantity of this item in the order.', 'woo-gutenberg-products-block' ),
				'type'        => 'number',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'name'              => [
				'description' => __( 'Product name.', 'woo-gutenberg-products-block' ),
				'type'        => 'string',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'item_data'         => [
				'description' => __( 'Metadata related to the order item', 'woo-gutenberg-products-block' ),
				'type'        => 'array',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
				'items'       => [
					'type'       => 'object',
					'properties' => [
						'name'    => [
							'description' => __( 'Name of the metadata.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'value'   => [
							'description' => __( 'Value of the metadata.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'display' => [
							'description' => __( 'Optionally, how the metadata value should be displayed to the user.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
					],
				],
			],
			'totals'            => [
				'description' => __( 'Item total amounts provided using the smallest unit of the currency.', 'woo-gutenberg-products-block' ),
				'type'        => 'object',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
				'properties'  => array_merge(
					$this->get_store_currency_properties(),
					[
						'line_subtotal'     => [
							'description' => __( 'Line subtotal (the price of the product before coupon discounts have been applied).', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'line_subtotal_tax' => [
							'description' => __( 'Line subtotal tax.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'line_total'        => [
							'description' => __( 'Line total (the price of the product after coupon discounts have been applied).', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'line_total_tax'    => [
							'description' => __( 'Line total tax.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
					]
				),
			],
			self::EXTENDING_KEY => $this->get_extended_schema( self::IDENTIFIER ),
		];
	}

	/**
	 * Get items data.
	 *
	 * @param \WC_Order_Item_Product $item Order item instance.
	 * @return array
	 */
	public function get_item_response( $item ) {
		$order = $item->get_order();
		return [
			'id'        => $item->get_id(),
			'quantity'  => $item->get_quantity(),
			'name'      => $item->get_name(),
			'item_data' => $item->get_all_formatted_meta_data(),
			'totals'    => $this->get_totals( $item ),
		];
	}

	/**
	 * Get totals data.
	 *
	 * @param \WC_Order_Item_Product $item Order item instance.
	 * @return array
	 */
	public function get_totals( $item ) {
		return [
			'line_subtotal'     => $item->get_subtotal(),
			'line_subtotal_tax' => $item->get_subtotal_tax(),
			'line_total'        => $item->get_total(),
			'line_total_tax'    => $item->get_total_tax(),
		];
	}
}
