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
	 * This renders the content of the block within the wrapper.
	 *
	 * @param \WC_Order $order Order object.
	 * @param string    $permission Permission level for viewing order details.
	 * @param array     $attributes Block attributes.
	 * @param string    $content Original block content.
	 * @return string
	 */
	protected function render_content( $order, $permission = false, $attributes = [], $content = '' ) {
		if ( ! $permission ) {
			// phpcs:ignore WooCommerce.Commenting.CommentHooks.MissingHookComment
			return '<p>' . wp_kses_post( apply_filters( 'woocommerce_thankyou_order_received_text', esc_html__( 'Thank you. Your order has been received.', 'woo-gutenberg-products-block' ), null ) ) . '</p>';
		}

		$content = $this->get_hook_content( 'woocommerce_before_thankyou', [ $order ] );
		$status  = $order->get_status();

		// Unlike the core handling, this includes some extra messaging for completed orders to the text is appropriate for other order statuses.
		switch ( $status ) {
			case 'cancelled':
				$content .= '<p>' . wp_kses_post(
						// phpcs:ignore WooCommerce.Commenting.CommentHooks.MissingHookComment
					apply_filters(
						'woocommerce_thankyou_order_received_text',
						esc_html__( 'Your order has been cancelled.', 'woo-gutenberg-products-block' ),
						$order
					)
				) . '</p>';
				break;
			case 'refunded':
					$content .= '<p>' . wp_kses_post(
						sprintf(
							// phpcs:ignore WooCommerce.Commenting.CommentHooks.MissingHookComment
							apply_filters(
								'woocommerce_thankyou_order_received_text',
								// translators: %s: date and time of the order refund.
								esc_html__( 'Your order was refunded %s.', 'woo-gutenberg-products-block' ),
								$order
							),
							wc_format_datetime( $order->get_date_modified() )
						)
					) . '</p>';
				break;
			case 'completed':
				$content .= '<p>' . wp_kses_post(
					// phpcs:ignore WooCommerce.Commenting.CommentHooks.MissingHookComment
					apply_filters(
						'woocommerce_thankyou_order_received_text',
						esc_html__( 'Thank you. Your order has been fulfilled.', 'woo-gutenberg-products-block' ),
						$order
					)
				) . '</p>';
				break;
			case 'failed':
				// phpcs:ignore WooCommerce.Commenting.CommentHooks.MissingHookComment
				$order_received_text = apply_filters( 'woocommerce_thankyou_order_received_text', esc_html__( 'Your order cannot be processed as the originating bank/merchant has declined your transaction. Please attempt your purchase again.', 'woo-gutenberg-products-block' ), null );
				$actions             = '';

				if ( 'full' === $permission ) {
					$actions .= '<a href="' . esc_url( $order->get_checkout_payment_url() ) . '" class="button">' . esc_html__( 'Try again', 'woo-gutenberg-products-block' ) . '</a> ';
				}

				if ( wc_get_page_permalink( 'myaccount' ) ) {
					$actions .= '<a href="' . esc_url( wc_get_page_permalink( 'myaccount' ) ) . '" class="button">' . esc_html__( 'My account', 'woo-gutenberg-products-block' ) . '</a> ';
				}

				$content .= '
				<p>' . $order_received_text . '</p>
				<p class="wc-block-order-confirmation-status__actions">' . $actions . '</p>
			';
				break;
			default:
				$content .= '<p>' . wp_kses_post(
					// phpcs:ignore WooCommerce.Commenting.CommentHooks.MissingHookComment
					apply_filters(
						'woocommerce_thankyou_order_received_text',
						esc_html__( 'Thank you. Your order has been received.', 'woo-gutenberg-products-block' ),
						$order
					)
				) . '</p>';
				break;
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
		return '<p>' . esc_html__( 'Please check your email for the order confirmation.', 'woo-gutenberg-products-block' ) . '</p>';
	}
}
