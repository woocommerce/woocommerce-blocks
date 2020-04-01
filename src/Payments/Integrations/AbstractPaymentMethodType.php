<?php
/**
 * Abstract payment method type class.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\Payments\Integrations;

defined( 'ABSPATH' ) || exit;

use Automattic\WooCommerce\Blocks\Payments\PaymentMethodTypeInterface;

/**
 * AbstractPaymentMethodType class.
 *
 * @since $VID:$
 */
abstract class AbstractPaymentMethodType implements PaymentMethodTypeInterface {

	/**
	 * Payment method name (defaults to the fqcn of the instance)
	 *
	 * @var string
	 */
	protected $name = '';

	/**
	 * Constructor
	 *
	 * @param string $name The name of the payment method.
	 */
	public function __construct( $name ) {
		$this->name = $name;
	}

	/**
	 * Returns the name of the payment method.
	 */
	public function get_name() {
		return $this->name;
	}

	/**
	 * Returns an array of script handles to enqueue for this payment method in
	 * the frontend context
	 *
	 * @return []
	 */
	public function get_payment_method_script_handles() {
		return [];
	}


	/**
	 * Returns an array of script handles to enqueue for this payment method in
	 * the admin context
	 *
	 * @return []
	 */
	public function get_payment_method_script_handles_for_admin() {
		return [];
	}


	/**
	 * Returns an array of style handles to enqueue for this payment method in
	 * the frontend context.
	 *
	 * @return []
	 */
	public function get_payment_method_style_handles() {
		return [];
	}


	/**
	 * Returns an array of style handles to enqueue for this payment method in
	 * the admin context.
	 *
	 * @return []
	 */
	public function get_payment_method_style_handles_for_admin() {
		return [];
	}


	/**
	 * An array of key, value pairs of data made available to payment methods
	 * client side.
	 *
	 * @return array
	 */
	public function get_payment_method_data() {
		return [];
	}
}
