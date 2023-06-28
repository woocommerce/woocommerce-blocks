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
	 * Render the block.
	 *
	 * @param array    $attributes Block attributes.
	 * @param string   $content Block content.
	 * @param WP_Block $block Block instance.
	 *
	 * @return string | void Rendered block output.
	 */
	protected function render( $attributes, $content, $block ) {
		$content            = $this->render_address( $this->get_order() );
		$classname          = $attributes['className'] ?? '';
		$classes_and_styles = StyleAttributesUtils::get_classes_and_styles_by_attributes( $attributes );

		if ( isset( $attributes['align'] ) ) {
			$classname .= " align{$attributes['align']}";
		}

		return sprintf(
			'<div class="woocommerce wc-block-order-%4$s %1$s %2$s">%3$s</div>',
			esc_attr( $classes_and_styles['classes'] ),
			esc_attr( $classname ),
			$content,
			esc_attr( $this->block_name )
		);
	}

	/**
	 * Render order details table.
	 *
	 * @param \WC_Order $order Order object.
	 * @return string
	 */
	protected function render_address( $order ) {
		if ( ! $order ) {
			return '';
		}
		return '
			<div class="woocommerce-customer-details">
				<h2 class="woocommerce-column__title">' . esc_html__( 'Billing address', 'woo-gutenberg-products-block' ) . ' </h2>
				<address>
					' . wp_kses_post( $order->get_formatted_billing_address( esc_html__( 'N/A', 'woo-gutenberg-products-block' ) ) ) . '
					' . ( $order->get_billing_phone() ? '<p class="woocommerce-customer-details--phone">' . esc_html( $order->get_billing_phone() ) . '</p>' : '' ) . '
					' . ( $order->get_billing_email() ? '<p class="woocommerce-customer-details--email">' . esc_html( $order->get_billing_email() ) . '</p>' : '' ) . '
				</address>
			</div>
		';
	}
}
