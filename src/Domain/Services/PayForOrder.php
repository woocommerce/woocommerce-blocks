<?php
namespace Automattic\WooCommerce\Blocks\Domain\Services;

/**
 * Service class implementing authentication checks for pay-for-order checkout block.
 */
class PayForOrder {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->init();
	}

	/**
	 * Hook into WP.
	 */
	public function init() {
		add_filter( 'the_content', array( $this, 'check_authentication' ) );
	}

	/**
	 * Check authentication for pay for order
	 *
	 * @param string $content Content.
	 */
	public function check_authentication( $content ) {
		global $wp;

		$order_id = ! empty( $wp->query_vars['order-pay'] ) ? $wp->query_vars['order-pay'] : null;

		if ( isset( $_GET['pay_for_order'], $_GET['key'] ) && $order_id ) { // phpcs:ignore WordPress.Security.NonceVerification
			$order = wc_get_order( $order_id );

			// Logged out customer does not have permission to pay for this order.
			if ( ! current_user_can( 'pay_for_order', $order_id ) && ! is_user_logged_in() ) {
				ob_start();
				wc_print_notice( esc_html__( 'Please log in to your account below to continue to the payment form.', 'woo-gutenberg-products-block' ), 'notice' );
				woocommerce_login_form(
					array(
						'redirect' => $order->get_checkout_payment_url(),
					)
				);
				return ob_get_clean();
			}
		}

		return $content;
	}
}
