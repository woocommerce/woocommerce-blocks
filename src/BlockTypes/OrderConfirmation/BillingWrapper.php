<?php

namespace Automattic\WooCommerce\Blocks\BlockTypes\OrderConfirmation;

use Automattic\WooCommerce\Blocks\Utils\StyleAttributesUtils;
use Automattic\WooCommerce\Blocks\BlockTypes\OrderConfirmation\BillingAddress;

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
	 * Render the block.
	 *
	 * @param array    $attributes Block attributes.
	 * @param string   $content Block content.
	 * @param WP_Block $block Block instance.
	 *
	 * @return string | void Rendered block output.
	 */
	protected function render( $attributes, $content, $block ) {
		$order              = $this->get_order();
		$content            = $order && $this->is_current_customer_order( $order ) ? $this->render_content( $order ) : '';
		$classname          = $attributes['className'] ?? '';
		$classes_and_styles = StyleAttributesUtils::get_classes_and_styles_by_attributes( $attributes );

		if ( isset( $attributes['align'] ) ) {
			$classname .= " align{$attributes['align']}";
		}

		return sprintf(
			'<div class="wc-block-%4$s %1$s %2$s">%3$s</div>',
			esc_attr( $classes_and_styles['classes'] ),
			esc_attr( $classname ),
			$content,
			esc_attr( $this->block_name )
		);
	}

	/**
	 * This renders the content of the billing wrapper.
	 *
	 * @param \WC_Order $order Order object.
	 * @return string
	 */
	protected function render_content( $order ) {
		if ( ! $order->has_billing_address() ) {
			return '';
		}

		$heading = esc_html__( 'Billing address', 'woo-gutenberg-products-block' );

		return '
			<div class="woocommerce-column woocommerce-column--1 woocommerce-column--billing-address col-1">
				<h2 class="woocommerce-order-details">
					' . wp_kses_post( $heading ) . '
				</h2>
				' . BillingAddress::render_content( $order ) . '
			</div>
		';
	}

	/**
	 * This is what gets rendered when the order does not exist.
	 *
	 * @return string
	 */
	protected function render_content_fallback() {
		return '-';
	}
}
