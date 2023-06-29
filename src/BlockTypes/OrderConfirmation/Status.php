<?php

namespace Automattic\WooCommerce\Blocks\BlockTypes\OrderConfirmation;

use Automattic\WooCommerce\Blocks\Utils\StyleAttributesUtils;

/**
 * Status class.
 */
class Status extends AbstractOrderConfirmationBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'order-confirmation-status';

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
		$content            = $order ? $this->render_content( $order ) : $this->render_content_fallback();
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
		$content = $this->get_hook_content( 'woocommerce_before_thankyou', [ $order ] );

		if ( $order->has_status( 'failed' ) ) {
			// phpcs:ignore WooCommerce.Commenting.CommentHooks.MissingHookComment
			$order_received_text = apply_filters( 'woocommerce_thankyou_order_received_text', esc_html__( 'Your order cannot be processed as the originating bank/merchant has declined your transaction. Please attempt your purchase again.', 'woo-gutenberg-products-block' ), null );
			$actions             = '';

			if ( $this->is_current_customer_order( $order ) ) {
				$actions .= '<a href="' . esc_url( $order->get_checkout_payment_url() ) . '" class="button pay">' . esc_html__( 'Try again', 'woo-gutenberg-products-block' ) . '</a> ';
			}

			$actions .= '<a href="' . esc_url( wc_get_page_permalink( 'myaccount' ) ) . '" class="button pay">' . esc_html_e( 'My account', 'woo-gutenberg-products-block' ) . '</a> ';

			$content .= '
				<p class="woocommerce-notice woocommerce-notice--error woocommerce-thankyou-order-failed">' . $order_received_text . '</p>
				<p class="woocommerce-notice woocommerce-notice--error woocommerce-thankyou-order-failed-actions">' . $actions . '</p>
			';
		} else {
			// phpcs:ignore WooCommerce.Commenting.CommentHooks.MissingHookComment
			$content .= '<p class="woocommerce-notice woocommerce-notice--success woocommerce-thankyou-order-received">' . wp_kses_post( apply_filters( 'woocommerce_thankyou_order_received_text', esc_html__( 'Thank you. Your order has been received.', 'woo-gutenberg-products-block' ), $order ) ) . '</p>';
		}

		return $content;
	}

	/**
	 * This is what gets rendered when the order does not exist.
	 *
	 * @return string
	 */
	protected function render_content_fallback() {
		// phpcs:ignore WooCommerce.Commenting.CommentHooks.MissingHookComment
		return '<p class="woocommerce-notice woocommerce-notice--success woocommerce-thankyou-order-received">' . wp_kses_post( apply_filters( 'woocommerce_thankyou_order_received_text', esc_html__( 'Thank you. Your order has been received.', 'woo-gutenberg-products-block' ), null ) ) . '</p>';
	}
}
