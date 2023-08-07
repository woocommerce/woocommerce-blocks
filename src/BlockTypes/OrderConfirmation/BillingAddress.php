<?php

namespace Automattic\WooCommerce\Blocks\BlockTypes\OrderConfirmation;

use Automattic\WooCommerce\Blocks\Utils\StyleAttributesUtils;

/**
 * BillingAddress class.
 */
class BillingAddress extends AbstractOrderConfirmationBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'order-confirmation-billing-address';

	/**
	 * This renders the content of the block within the wrapper.
	 *
	 * @param \WC_Order $order Order object.
	 * @param string    $permission Permission level for viewing order details.
	 * @param array     $attributes Block attributes.
	 * @return string
	 */
	protected function render_content( $order, $permission = false, $attributes = [] ) {
		if ( 'full' !== $permission ) {
			return '';
		}
		$address = $order->get_formatted_billing_address( esc_html__( 'This order has no billing address.', 'woo-gutenberg-products-block' ) );
		$address = $address . ( $order->get_billing_phone() ? '<br><span class="woocommerce-customer-details--phone">' . esc_html( $order->get_billing_phone() ) . '</span>' : '' );

		return '<address>' . wp_kses_post( $address ) . '</address>';
	}
}
