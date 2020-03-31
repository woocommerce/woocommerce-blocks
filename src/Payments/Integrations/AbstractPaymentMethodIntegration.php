<?php
/**
 * Abstract payment method integration class.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\Payments\Integrations;

defined( 'ABSPATH' ) || exit;

use Automattic\WooCommerce\Blocks\Payments\PaymentMethodRegistry;

/**
 * AbstractPaymentMethodIntegration class.
 *
 * @since $VID:$
 */
abstract class AbstractPaymentMethodIntegration {

	/**
	 * Payment method name.
	 *
	 * @var string
	 */
	protected $payment_method_name = '';

	/**
	 * Registers the block type with WordPress.
	 */
	public function register_payment_method() {
		PaymentMethodRegistry::get_instance()->register(
			$this->payment_method_name,
			array(
				'scripts' => $this->get_payment_method_scripts(),
				'data'    => $this->get_payment_method_script_data(),
			)
		);
	}
	/**
	 * Returns an array of scripts/handles to be registered for this payment method.
	 *
	 * @return array
	 */
	protected function get_payment_method_scripts() {
		return [];
	}

	/**
	 * Returns an array of key=>value pairs of data made available to the payment methods script.
	 *
	 * @return array
	 */
	protected function get_payment_method_script_data() {
		return [];
	}
}
