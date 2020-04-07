<?php
/**
 * Temporary integration of the stripe payment method for the new cart and
 * checkout blocks. Once the api is demonstrated to be stable, this integration
 * will be moved to the Stripe extension
 *
 * @package WooCommerce/Blocks
 * @since $VID:$
 */

namespace Automattic\WooCommerce\Blocks\Payments\Integrations;

use Exception;
use WC_Stripe_Payment_Request;
use WC_Stripe_Helper;
use Automattic\WooCommerce\Blocks\Assets\Api;
use Automattic\WooCommerce\Blocks\Payments\PaymentContext;
use Automattic\WooCommerce\Blocks\Payments\PaymentResult;

/**
 * Stripe payment method integration
 *
 * @since $VID:$
 */
final class Stripe extends AbstractPaymentMethodType {
	/**
	 * Payment method name defined by payment methods extending this class.
	 *
	 * @var string
	 */
	protected $name = 'stripe';

	/**
	 * Stripe settings from the WP options table
	 *
	 * @var array
	 */
	private $settings;

	/**
	 * An instance of the Asset Api
	 *
	 * @var Api
	 */
	private $asset_api;

	/**
	 * Constructor
	 *
	 * @param Api $asset_api An instance of Api.
	 */
	public function __construct( Api $asset_api ) {
		$this->asset_api = $asset_api;
		add_action( 'woocommerce_rest_checkout_process_payment_with_context', [ $this, 'add_payment_request_order_meta' ], 8, 2 );
	}

	/**
	 * Initializes the payment method type.
	 */
	public function initialize() {
		$this->settings = get_option( 'woocommerce_stripe_settings', [] );
	}

	/**
	 * Returns if this payment method should be active. If false, the scripts will not be enqueued.
	 *
	 * @return boolean
	 */
	public function is_active() {
		return ! empty( $this->settings['enabled'] ) && 'yes' === $this->settings['enabled'];
	}

	/**
	 * Returns an array of scripts/handles to be registered for this payment method.
	 *
	 * @return array
	 */
	public function get_payment_method_script_handles() {
		wp_register_script( 'stripe', 'https://js.stripe.com/v3/', '', '3.0', true );

		$this->asset_api->register_script(
			'wc-payment-method-stripe',
			'build/wc-payment-method-stripe.js',
			[ 'stripe' ]
		);

		return [ 'wc-payment-method-stripe' ];
	}

	/**
	 * Returns an array of key=>value pairs of data made available to the payment methods script.
	 *
	 * @return array
	 */
	public function get_payment_method_data() {
		return [
			'stripeTotalLabel' => $this->get_total_label(),
			'publicKey'        => $this->get_publishable_key(),
			'allowPrepaidCard' => $this->get_allow_prepaid_card(),
			'button'           => [
				'type'   => $this->get_button_type(),
				'theme'  => $this->get_button_theme(),
				'height' => $this->get_button_height(),
				'locale' => $this->get_button_locale(),
			],
			'inline_cc_form'   => $this->get_inline_cc_form(),
		];
	}

	/**
	 * Returns the label to use accompanying the total in the stripe statement.
	 *
	 * @return string Statement descriptor.
	 */
	private function get_total_label() {
		return ! empty( $this->settings['statement_descriptor'] ) ? WC_Stripe_Helper::clean_statement_descriptor( $this->settings['statement_descriptor'] ) : '';
	}

	/**
	 * Returns the publishable api key for the Stripe service.
	 *
	 * @return string Public api key.
	 */
	private function get_publishable_key() {
		$test_mode   = ( ! empty( $this->settings['testmode'] ) && 'yes' === $this->settings['testmode'] );
		$setting_key = $test_mode ? 'test_publishable_key' : 'publishable_key';
		return ! empty( $this->settings[ $setting_key ] ) ? $this->settings[ $setting_key ] : '';
	}

	/**
	 * Returns whether to allow prepaid cards for payments.
	 *
	 * @return bool True means to allow prepaid card (default).
	 */
	private function get_allow_prepaid_card() {
		return apply_filters( 'wc_stripe_allow_prepaid_card', true );
	}

	/**
	 * Return the button type for the payment button.
	 *
	 * @return string Defaults to 'default'.
	 */
	private function get_button_type() {
		return isset( $this->settings['payment_request_button_type'] ) ? $this->settings['payment_request_button_type'] : 'default';
	}

	/**
	 * Return the theme to use for the payment button.
	 *
	 * @return string Defaults to 'dark'.
	 */
	private function get_button_theme() {
		return isset( $this->settings['payment_request_button_theme'] ) ? $this->settings['payment_request_button_theme'] : 'dark';
	}

	/**
	 * Return the height for the payment button.
	 *
	 * @return string A pixel value for the height (defaults to '64').
	 */
	private function get_button_height() {
		return isset( $this->settings['payment_request_button_height'] ) ? str_replace( 'px', '', $this->settings['payment_request_button_height'] ) : '64';
	}

	/**
	 * Return the inline cc option.
	 *
	 * @return string A pixel value for the height (defaults to '64').
	 */
	private function get_inline_cc_form() {
		return isset( $this->settings['inline_cc_form'] ) && 'yes' === $this->settings['inline_cc_form'];
	}

	/**
	 * Return the locale for the payment button.
	 *
	 * @return string Defaults to en_US.
	 */
	private function get_button_locale() {
		return apply_filters( 'wc_stripe_payment_request_button_locale', substr( get_locale(), 0, 2 ) );
	}

	/**
	 * Add payment request data to the order meta as hooked on the
	 * woocommerce_rest_checkout_process_payment_with_context action.
	 *
	 * @param PaymentContext $context Holds context for the payment.
	 * @param PaymentResult  $result  Result object for the payment.
	 */
	public function add_payment_request_order_meta( PaymentContext $context, PaymentResult $result ) {
		// phpcs:ignore WordPress.Security.NonceVerification
		$post_data = $_POST;
		$_POST     = $context->payment_data;

		WC_Stripe_Payment_Request::add_order_meta( $context->order->id, $context->payment_data );
		$_POST = $post_data;
	}
}
