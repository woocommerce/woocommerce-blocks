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
		if ( ! empty( $attributes['isPreview'] ) ) {
			$order = $this->get_preview_order();
		} else {
			$order = $this->get_order();

			if ( ! $this->is_current_customer_order( $order ) ) {
				$order = null;
			}
		}

		$content            = $order ? $this->render_content( $order ) : $this->render_content_fallback();
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
	 * This renders the content of the block within the wrapper.
	 *
	 * @param \WC_Order $order Order object.
	 * @return string
	 */
	protected function render_content( $order ) {
		$this->remove_core_hooks();
		$content = '
			<ul>
				' . $this->render_summary_row( __( 'Order number:', 'woo-gutenberg-products-block' ), $order->get_order_number() ) . '
				' . $this->render_summary_row( __( 'Date:', 'woo-gutenberg-products-block' ), wc_format_datetime( $order->get_date_created() ) ) . '
				' . $this->render_summary_row( __( 'Total:', 'woo-gutenberg-products-block' ), $order->get_formatted_order_total() ) . '
				' . $this->render_summary_row( __( 'Email:', 'woo-gutenberg-products-block' ), $order->get_billing_email() ) . '
				' . $this->render_summary_row( __( 'Payment method:', 'woo-gutenberg-products-block' ), $order->get_payment_method_title() ) . '
			</ul>
			' . $this->get_hook_content( 'woocommerce_thankyou_' . $order->get_payment_method(), [ $order->get_id() ] ) . '
			' . $this->get_hook_content( 'woocommerce_thankyou', [ $order->get_id() ] ) . '
		';
		add_action( 'woocommerce_thankyou', 'woocommerce_order_details_table', 10 );
		return $content;
	}

	/**
	 * Render row in the order summary.
	 *
	 * @param string $name name of row.
	 * @param string $value value of row.
	 * @return string
	 */
	protected function render_summary_row( $name, $value ) {
		return $value ? '<li><span>' . esc_html( $name ) . '</span> <strong>' . wp_kses_post( $value ) . '</strong></li>' : '';
	}

	/**
	 * Remove core hooks from the thankyou page.
	 */
	protected function remove_core_hooks() {
		remove_action( 'woocommerce_thankyou', 'woocommerce_order_details_table', 10 );
	}
}
