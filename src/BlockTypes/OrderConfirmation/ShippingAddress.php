<?php

namespace Automattic\WooCommerce\Blocks\BlockTypes\OrderConfirmation;

use Automattic\WooCommerce\Blocks\Utils\StyleAttributesUtils;

/**
 * ShippingAddress class.
 */
class ShippingAddress extends AbstractOrderConfirmationBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'order-confirmation-shipping-address';

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
		$content            = $order && $this->is_current_customer_order( $order ) ? $this->render_content( $order ) : $this->render_content_fallback();
		$classname          = $attributes['className'] ?? '';
		$classes_and_styles = StyleAttributesUtils::get_classes_and_styles_by_attributes( $attributes );

		if ( isset( $attributes['align'] ) ) {
			$classname .= " align{$attributes['align']}";
		}

		return sprintf(
			'<div class="woocommerce wc-block-%4$s %1$s %2$s">%3$s</div>',
			esc_attr( $classes_and_styles['classes'] ),
			esc_attr( $classname ),
			$content,
			esc_attr( $this->block_name )
		);
	}

	/**
	 * This renders the content of the block within the wrapper.
	 *
	 * @param \WC_Order $order Order object.
	 * @return string
	 */
	protected function render_content( $order ) {
		$fallback = esc_html__( 'This order has no shipping address.', 'woo-gutenberg-products-block' );
		if ( $order->needs_shipping_address() ) {
			$address = $order->get_formatted_shipping_address( $fallback );
			$address = $address . ( $order->get_shipping_phone() ? '<p class="woocommerce-customer-details--phone">' . esc_html( $order->get_shipping_phone() ) . '</p>' : '' );
		}
		$address = esc_html__( 'This order does not require shipping.', 'woo-gutenberg-products-block' );

		return '
			<div class="woocommerce-customer-details">
				<address>
					' . wp_kses_post( $address ) . '
				</address>
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
