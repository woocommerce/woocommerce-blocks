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

/**
 * Cheque payment method integration
 *
 * @since $VID:$
 */
final class Cheque extends AbstractPaymentMethodIntegration {
	/**
	 * Payment method name.
	 *
	 * @var string
	 */
	protected $payment_method_name = 'cheque';

	/**
	 * Settings from the WP options table
	 *
	 * @var array
	 */
	private $cheque_settings;

	/**
	 * Registers the block type with WordPress.
	 */
	public function register_payment_method() {
		$this->cheque_settings = get_option( 'woocommerce_cheque_settings', [] );
		parent::register_payment_method();
	}

	/**
	 * Returns an array of scripts/handles to be registered for this payment method.
	 *
	 * @return array
	 */
	protected function get_payment_method_scripts() {
		return [
			[
				'handle' => 'wc-payment-method-cheque',
				'src'    => 'build/wc-payment-method-cheque.js',
				'deps'   => [],
			],
		];
	}

	/**
	 * Returns an array of key=>value pairs of data made available to the payment methods script.
	 *
	 * @return array
	 */
	protected function get_payment_method_script_data() {
		return [
			'title'       => isset( $this->cheque_settings['title'] ) ? $this->cheque_settings['title'] : '',
			'description' => isset( $this->cheque_settings['description'] ) ? $this->cheque_settings['description'] : '',
		];
	}
}
