<?php

namespace Automattic\WooCommerce\Blocks\BlockTypes\OrderConfirmation;

use Automattic\WooCommerce\Blocks\Utils\StyleAttributesUtils;

/**
 * Summary class.
 */
class Summary extends AbstractOrderConfirmationBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'order-confirmation-summary';

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
		$this->remove_core_hooks();
		return '
			<ul class="woocommerce-order-overview woocommerce-thankyou-order-details order_details">
				<li class="woocommerce-order-overview__order order">
					' . esc_html__( 'Order number:', 'woo-gutenberg-products-block' ) . '
					<strong>' . esc_html( $order->get_order_number() ) . '</strong>
				</li>
				<li class="woocommerce-order-overview__date date">
					' . esc_html__( 'Date:', 'woo-gutenberg-products-block' ) . '
					<strong>' . wp_kses_post( wc_format_datetime( $order->get_date_created() ) ) . '</strong>
				</li>
				<li class="woocommerce-order-overview__total total">
					' . esc_html__( 'Total:', 'woo-gutenberg-products-block' ) . '
					<strong>' . wp_kses_post( $order->get_formatted_order_total() ) . '</strong>
				</li>
				' . $this->render_summary_billing_email( $order ) . '
				' . $this->render_summary_payment_method( $order ) . '
			</ul>
			' . $this->get_hook_content( 'woocommerce_thankyou_' . $order->get_payment_method(), [ $order->get_id() ] ) . '
			' . $this->get_hook_content( 'woocommerce_thankyou', [ $order->get_id() ] ) . '
		';
	}

	/**
	 * Render the order summary payment method.
	 *
	 * @param \WC_Order|null $order Order object.
	 * @return string
	 */
	protected function render_summary_billing_email( $order ) {
		$email = $order->get_billing_email();

		if ( ! $email ) {
			return '';
		}

		return '<li class="woocommerce-order-overview__email email">
			' . esc_html__( 'Email:', 'woo-gutenberg-products-block' ) . '
			<strong>' . esc_html( $email ) . '</strong>
		</li>';
	}

	/**
	 * Render the order summary payment method.
	 *
	 * @param \WC_Order|null $order Order object.
	 * @return string
	 */
	protected function render_summary_payment_method( $order ) {
		$payment_method = $order->get_payment_method_title();

		if ( ! $payment_method ) {
			return '';
		}

		return '<li class="woocommerce-order-overview__payment-method method">
			' . esc_html__( 'Payment method:', 'woo-gutenberg-products-block' ) . '
			<strong>' . wp_kses_post( $payment_method ) . '</strong>
		</li>';
	}

	/**
	 * Remove core hooks from the thankyou page.
	 */
	protected function remove_core_hooks() {
		remove_action( 'woocommerce_thankyou', 'woocommerce_order_details_table', 10 );
	}
}
