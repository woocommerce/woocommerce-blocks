<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

/**
 * OrderReceivedOrderSummary class.
 */
class OrderReceivedOrderSummary extends AbstractBlock {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'order-received-order-summary';

	/**
	 * Get the editor script handle for this block type.
	 *
	 * @param string $key Data to get, or default to everything.
	 * @return array|string;
	 */
	protected function get_block_type_editor_script( $key = null ) {
		$script = [
			'handle'       => 'wc-' . $this->block_name . '-block',
			'path'         => $this->asset_api->get_block_asset_build_path( $this->block_name ),
			'dependencies' => [ 'wc-blocks' ],
		];
		return $key ? $script[ $key ] : $script;
	}

	/**
	 * Get the frontend script handle for this block type.
	 *
	 * @see $this->register_block_type()
	 * @param string $key Data to get, or default to everything.
	 * @return array|string
	 */
	protected function get_block_type_script( $key = null ) {
		$script = [
			'handle'       => 'wc-' . $this->block_name . '-block-frontend',
			'path'         => $this->asset_api->get_block_asset_build_path( $this->block_name . '-frontend' ),
			'dependencies' => [],
		];
		return $key ? $script[ $key ] : $script;
	}

	/**
	 * Get the current received order data using the query string.
	 *
	 * @return \WC_Order|null
	 */
	protected function get_received_order() {
		global $wp;

		$order     = false;
		$order_id  = isset( $wp->query_vars['order-received'] ) ? absint( $wp->query_vars['order-received'] ) : 0;
		$order_key = isset( $_GET['key'] ) ? wc_clean( wp_unslash( $_GET['key'] ) ) : '';

		if ( ! $order_id ) {
			$order_id = isset( $_GET['order_id'] ) ? absint( $_GET['order_id'] ) : 0;
		}

		if ( $order_id && $order_key ) {
			$order = wc_get_order( $order_id );
			if ( $order && ! hash_equals( $order->get_order_key(), $order_key ) ) {
				$order = false;
			}
		}

		return $order;
	}

	/**
	 * Extra data passed through from server to client for block.
	 *
	 * @param array $attributes  Any attributes that currently are available from the block.
	 *                           Note, this will be empty in the editor context when the block is
	 *                           not in the post content on editor load.
	 */
	protected function enqueue_data( array $attributes = [] ) {
		parent::enqueue_data( $attributes );
		$order = $this->get_received_order();

		if ( $order ) {
			$this->asset_data_registry->add(
				'orderReceivedData',
				[
					'orderId'              => $order->get_id(),
					'orderNumber'          => $order->get_order_number(),
					'orderDate'            => $order->get_date_created()->date( 'Y-m-d H:i:s' ),
					'orderStatus'          => $order->get_status(),
					'orderStatusText'      => wc_get_order_status_name( $order->get_status() ),
					'orderTotal'           => $order->get_total(),
					'orderCurrency'        => $order->get_currency(),
					'orderPaymentMethod'   => $order->get_payment_method(),
					'orderBillingAddress'  => $order->get_formatted_billing_address(),
					'orderShippingAddress' => $order->get_formatted_shipping_address(),
					'orderItems'           => $order->get_items(),
					'orderNotes'           => $order->get_customer_order_notes(),
					'orderEmail'           => $order->get_billing_email(),
					'billingAddress'       => $order->get_address( 'billing' ),
				]
			);
		}
	}
}
