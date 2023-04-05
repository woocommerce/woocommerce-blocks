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
			'id' => [
				'description' => __( 'The order ID to process during checkout.', 'woo-gutenberg-products-block' ),
				'type'        => 'integer',
				'context'     => [ 'view', 'edit' ],
				'readonly'    => true,
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
			'id'             => $order->get_id(),
			'line_items'     => $this->get_item_data( $order ),
			'total_tax'      => $order->get_total_tax(),
			'subtotal'       => $order->get_subtotal(),
			'discount_total' => $order->get_discount_total(),
			'shipping_total' => $order->get_shipping_total(),
			'shipping_tax'   => $order->get_shipping_tax(),
			'total_refunded' => $order->get_total_refunded(),
			'fees_total'     => $this->get_fees_total( $order ),
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

	/**
	 * Get fee.
	 *
	 * @param \WC_Order $order Order instance.
	 * @return array
	 */
	private function get_fees_total( $order ) {
		$fees       = $order->get_fees();
		$total_fees = 0;

		if ( $fees ) {
			foreach ( $fees as $id => $fee ) {
				/**
				 * Filters whether or not free fees should be excluded.
				 *
				 * @param boolean True to skip the fee, false to include the fee.
				 * @param integer $id Fee ID.
				 *
				 * @since 9.8.0-dev
				 */
				if ( apply_filters( 'woocommerce_get_order_item_totals_excl_free_fees', empty( $fee['line_total'] ) && empty( $fee['line_tax'] ), $id ) ) {
					continue;
				}
				$total_fees += $fee->get_total();
			}
		}

		return $total_fees;
	}
}
