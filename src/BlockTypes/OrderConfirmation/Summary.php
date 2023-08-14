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
	 * This renders the content of the block within the wrapper.
	 *
	 * @param \WC_Order $order Order object.
	 * @param string    $permission Permission level for viewing order details.
	 * @param array     $attributes Block attributes.
	 * @return string
	 */
	protected function render_content( $order, $permission = false, $attributes = [] ) {
		if ( ! $permission ) {
			$verification_required = $this->email_verification_required( $order );
			$my_account_page       = wc_get_page_permalink( 'myaccount' );

			$content  = '<p>';
			$content .= esc_html__( 'Great news! Your order has been received, and a confirmation will be sent to your email address.', 'woo-gutenberg-products-block' );

			if ( $my_account_page ) {
				$content .= ' ' . sprintf(
					/* translators: 1: opening a link tag 2: closing a link tag */
					esc_html__( 'Have an account with us? %1$sLog in here%2$s to view your order.', 'woo-gutenberg-products-block' ),
					'<a href="' . esc_url( $my_account_page ) . '" class="button">',
					'</a>'
				);
			}

			if ( $verification_required ) {
				$content .= ' ' . esc_html__( 'Alternatively, confirm the email address linked to the order below.', 'woo-gutenberg-products-block' );
			}

			$content .= '</p>';

			// Verification step.
			if ( $verification_required ) {
				// phpcs:ignore WordPress.Security.NonceVerification.Missing
				$check_submission_notice = ! empty( $_POST ) ? wc_print_notice( esc_html__( 'We were unable to verify the email address you provided. Please try again.', 'woo-gutenberg-products-block' ), 'error', [], true ) : '';

				$content .=
					sprintf( '<form action="%s" method="post" class="woocommerce-form woocommerce-verify-email">', esc_url( $order->get_checkout_order_received_url() ) ) .
					$check_submission_notice .
					sprintf(
						'<p class="form-row verify-email">
							<label for="%1$s">%2$s</label>
							<input type="email" name="email" id="%1$s" autocomplete="email" class="input-text" />
						</p>',
						esc_attr( 'verify-email' ),
						esc_html__( 'Email address', 'woo-gutenberg-products-block' ) . '&nbsp;<span class="required">*</span>'
					) .
					sprintf(
						'<p class="form-row login-submit">
							<input type="submit" name="wp-submit" id="%1$s" class="button button-primary %4$s" value="%2$s" />
							%3$s
						</p>',
						esc_attr( 'verify-email-submit' ),
						esc_html__( 'Confirm email and view order', 'woo-gutenberg-products-block' ),
						wp_nonce_field( 'wc_verify_email', 'check_submission', true, false ),
						esc_attr( wc_wp_theme_get_element_class_name( 'button' ) )
					) .
					'</form>';
			}

			return $content;
		}

		$content  = '<ul class="wc-block-order-confirmation-summary-list">';
		$content .= $this->render_summary_row( __( 'Order number:', 'woo-gutenberg-products-block' ), $order->get_order_number() );
		$content .= $this->render_summary_row( __( 'Date:', 'woo-gutenberg-products-block' ), wc_format_datetime( $order->get_date_created() ) );
		$content .= $this->render_summary_row( __( 'Total:', 'woo-gutenberg-products-block' ), $order->get_formatted_order_total() );
		if ( 'full' === $permission ) {
			$content .= $this->render_summary_row( __( 'Email:', 'woo-gutenberg-products-block' ), $order->get_billing_email() );
			$content .= $this->render_summary_row( __( 'Payment method:', 'woo-gutenberg-products-block' ), $order->get_payment_method_title() );
		}
		$content .= '</ul>';

		$this->remove_core_hooks();
		$content .= $this->get_hook_content( 'woocommerce_thankyou_' . $order->get_payment_method(), [ $order->get_id() ] );
		$content .= $this->get_hook_content( 'woocommerce_thankyou', [ $order->get_id() ] );
		$this->restore_core_hooks();

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
		return $value ? '<li class="wc-block-order-confirmation-summary-list-item"><span class="wc-block-order-confirmation-summary-list-item__key">' . esc_html( $name ) . '</span> <span class="wc-block-order-confirmation-summary-list-item__value">' . wp_kses_post( $value ) . '</span></li>' : '';
	}

	/**
	 * Remove core hooks from the thankyou page.
	 */
	protected function remove_core_hooks() {
		remove_action( 'woocommerce_thankyou', 'woocommerce_order_details_table', 10 );
	}

	/**
	 * Restore core hooks from the thankyou page.
	 */
	protected function restore_core_hooks() {
		add_action( 'woocommerce_thankyou', 'woocommerce_order_details_table', 10 );
	}

	/**
	 * This is what gets rendered when the order does not exist.
	 *
	 * @return string
	 */
	protected function render_content_fallback() {
		$content = esc_html__( 'If you\'ve placed an order, just give your email a quick check for the confirmation.', 'woo-gutenberg-products-block' );

		if ( wc_get_page_permalink( 'myaccount' ) ) {
			$content .= ' ' . sprintf(
				/* translators: 1: opening a link tag 2: closing a link tag */
				esc_html__( 'Have an account with us? %1$sLog in here to view your order details%2$s.', 'woo-gutenberg-products-block' ),
				'<a href="' . esc_url( wc_get_page_permalink( 'myaccount' ) ) . '" class="button">',
				'</a>'
			);
		}

		return wpautop( $content );
	}
}
