<?php

namespace Automattic\WooCommerce\Blocks\BlockTypes\OrderConfirmation;

/**
 * BillingWrapper class.
 */
class BillingWrapper extends AbstractOrderConfirmationBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'order-confirmation-billing-wrapper';

	/**
	 * This renders the content of the billing wrapper.
	 *
	 * @param \WC_Order $order Order object.
	 * @param string    $permission Permission level for viewing order details.
	 * @param array     $attributes Block attributes.
	 * @param string    $content Original block content.
	 */
	protected function render_content( $order, $permission = false, $attributes = [], $content = '' ) {
		if ( ! $order || ! $order->has_billing_address() || 'full' !== $permission ) {
			return '';
		}
		return $content;
	}

	/**
	 * Get the frontend style handle for this block type.
	 *
	 * @return null
	 */
	protected function get_block_type_style() {
		return null;
	}
}
