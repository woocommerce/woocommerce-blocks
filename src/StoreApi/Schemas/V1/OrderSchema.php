<?php
namespace Automattic\WooCommerce\StoreApi\Schemas\V1;

/**
 * OrderSchema class.
 */
class OrderSchema extends AbstractSchema {
	/**
	 * The schema item name.
	 *
	 * @var string
	 */
	protected $title = 'order';

	/**
	 * The schema item identifier.
	 *
	 * @var string
	 */
	const IDENTIFIER = 'order';

	/**
	 * Order schema properties.
	 *
	 * @return array
	 */
	public function get_properties() {
		return [
			'id'         => [
				'description' => __( 'The order ID to process during checkout.', 'woo-gutenberg-products-block' ),
				'type'        => 'integer',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
			],
			'line_items' => [
				'description' => __( 'Line items data.', 'woo-gutenberg-products-block' ),
				'type'        => 'array',
				'context'     => [ 'view', 'edit' ],
				'items'       => [
					'type'       => 'object',
					'properties' => [
						'id'        => [
							'description' => __( 'Item ID.', 'woo-gutenberg-products-block' ),
							'type'        => 'integer',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'name'      => [
							'description' => __( 'Product name.', 'woo-gutenberg-products-block' ),
							'type'        => 'mixed',
							'context'     => [ 'view', 'edit' ],
						],
						'quantity'  => [
							'description' => __( 'Quantity ordered.', 'woo-gutenberg-products-block' ),
							'type'        => 'integer',
							'context'     => [ 'view', 'edit' ],
						],
						'subtotal'  => [
							'description' => __( 'Line subtotal (before discounts).', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
						],
						'meta_data' => [
							'description' => __( 'Meta data.', 'woo-gutenberg-products-block' ),
							'type'        => 'array',
							'context'     => [ 'view', 'edit' ],
							'items'       => [
								'type'       => 'object',
								'properties' => [
									'id'            => [
										'description' => __( 'Meta ID.', 'woo-gutenberg-products-block' ),
										'type'        => 'integer',
										'context'     => [ 'view', 'edit' ],
										'readonly'    => true,
									],
									'key'           => [
										'description' => __( 'Meta key.', 'woo-gutenberg-products-block' ),
										'type'        => 'string',
										'context'     => [ 'view', 'edit' ],
									],
									'value'         => [
										'description' => __( 'Meta value.', 'woo-gutenberg-products-block' ),
										'type'        => 'mixed',
										'context'     => [ 'view', 'edit' ],
									],
									'display_key'   => [
										'description' => __( 'Meta key for UI display.', 'woo-gutenberg-products-block' ),
										'type'        => 'string',
										'context'     => [ 'view', 'edit' ],
									],
									'display_value' => [
										'description' => __( 'Meta value for UI display.', 'woo-gutenberg-products-block' ),
										'type'        => 'string',
										'context'     => [ 'view', 'edit' ],
									],
								],
							],
						],
					],
				],
			],
			'totals'     => [
				'description' => __( 'Order totals.', 'woo-gutenberg-products-block' ),
				'type'        => 'object',
				'context'     => [ 'view', 'edit' ],
				'items'       => [
					'type'       => 'object',
					'properties' => [
						'label' => [
							'description' => __( 'Label.', 'woo-gutenberg-products-block' ),
							'type'        => 'string',
							'context'     => [ 'view', 'edit' ],
							'readonly'    => true,
						],
						'value' => [
							'description' => __( 'Value.', 'woo-gutenberg-products-block' ),
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
	 * Get an order for response.
	 *
	 * @param \WC_Order $order Order instance.
	 * @return array
	 */
	public function get_item_response( $order ) {
		return [
			'id'         => $order->get_id(),
			'line_items' => $this->get_item_data( $order ),
			'totals'     => $order->get_order_item_totals(),
		];
	}

	/**
	 * Get items data.
	 *
	 * @param \WC_Order $order Order instance.
	 * @return array
	 */
	private function get_item_data( $order ) {
		$items = $order->get_items();
		$data  = [];

		foreach ( $items as $item ) {
			$data[ $item->get_id() ]['id']        = $item->get_id();
			$data[ $item->get_id() ]['name']      = $item->get_name();
			$data[ $item->get_id() ]['meta_data'] = $item->get_all_formatted_meta_data();
			$data[ $item->get_id() ]['quantity']  = $item->get_quantity();
			$data[ $item->get_id() ]['subtotal']  = $order->get_line_subtotal( $item );
		}

		return array_values( $data );
	}
}
