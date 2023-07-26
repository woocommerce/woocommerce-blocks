<?php
namespace Automattic\WooCommerce\Blocks\Domain\Services;

use Automattic\WooCommerce\StoreApi\Exceptions\RouteException;
use Automattic\WooCommerce\StoreApi\Utilities\OrderController;

/**
 * Service class implementing authentication checks for pay-for-order checkout block.
 */
class PayForOrder {
	/**
	 * Order controller class instance.
	 *
	 * @var OrderController
	 */
	protected $order_controller;

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->init();
		$this->order_controller = new OrderController();

	}

	/**
	 * Hook into WP.
	 */
	public function init() {
		add_filter( 'the_content', array( $this, 'maybe_render_authentication_form' ) );
		add_action( 'init', array( $this, 'add_billing_email_to_url' ) );
	}

	/**
	 * Check authentication for pay for order
	 *
	 * @param integer $order_id Order id.
	 */
	private function is_pay_for_order( $order_id ) {
		if ( isset( $_GET['pay_for_order'], $_GET['key'] ) && $order_id ) { //phpcs:ignore WordPress.Security.NonceVerification
			return true;
		}
		return false;
	}

	/**
	 * Check authentication for pay for order
	 *
	 * @param string $content Content.
	 */
	public function maybe_render_authentication_form( $content ) {
		global $wp;
		$order_id      = ! empty( $wp->query_vars['order-pay'] ) ? absint( $wp->query_vars['order-pay'] ) : null;
		$order         = wc_get_order( $order_id );
		$billing_email = isset( $_GET['billing_email'] ) ? sanitize_text_field( wp_unslash( $_GET['billing_email'] ) ) : ''; //phpcs:ignore WordPress.Security.NonceVerification
		$order_key     = isset( $_GET['key'] ) ? sanitize_text_field( wp_unslash( $_GET['key'] ) ) : ''; //phpcs:ignore WordPress.Security.NonceVerification

		if ( $this->is_pay_for_order( $order_id ) ) {
			try {
				$this->order_controller->validate_order( $order_id, $order_key, $billing_email );
			} catch ( RouteException $error ) {
				if ( 'woocommerce_rest_invalid_user' === $error->error_code && ! is_user_logged_in() ) {
					ob_start();
					wc_print_notice( esc_html__( 'Please log in to your account below to continue to the payment form.', 'woo-gutenberg-products-block' ), 'notice' );
					woocommerce_login_form(
						array(
							'redirect' => $order->get_checkout_payment_url(),
						)
					);
					return ob_get_clean();
				} else {
					// For guest orders, request they verify their email address (unless we can identify them via the active user session).
					ob_start();
					wc_get_template(
						'checkout/form-verify-email.php',
						array(
							'failed_submission' => ! empty( $_GET['billing_email'] ), //phpcs:ignore WordPress.Security.NonceVerification
							'verify_url'        => '',
						)
					);
					return ob_get_clean();
				}

				ob_start();
				wc_print_notice( esc_html__( 'This order cannot be paid for. Please contact us if you need assistance.', 'woo-gutenberg-products-block' ), 'error' );
				return ob_get_clean();
			}
		}

		return $content;
	}

	/**
	 * Add the request email to the url param billing email
	 */
	public function add_billing_email_to_url() {
		global $wp;
		$order_id = ! empty( $wp->query_vars['order-pay'] ) ? $wp->query_vars['order-pay'] : null;

		if ( $this->is_pay_for_order( $order_id ) ) {
			return;
		}

		// Move the form email to a billing_email param in the URL.
		//phpcs:ignore WordPress.Security.NonceVerification
		$guest_email = isset( $_POST['email'] ) ? sanitize_text_field( wp_unslash( $_POST['email'] ) ) : null;
		if ( $guest_email ) {
			$url = isset( $_SERVER['REQUEST_URI'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ) : null;
			$url = add_query_arg( array( 'billing_email' => $guest_email ), $url );
			wp_safe_redirect( $url );
			exit;
		}
	}
}
