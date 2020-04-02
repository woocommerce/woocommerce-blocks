<?php
/**
 * Payment method type interface.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\Payments;

defined( 'ABSPATH' ) || exit;

interface PaymentMethodTypeInterface {


	/**
	 * The name of the payment method
	 *
	 * @return string
	 */
	public function get_name();

	/**
	 * When called invokes any initialization/setup for the payment method type
	 * instance.
	 */
	public function initialize();

	/**
	 * Returns an array of script handles to enqueue for this payment method in
	 * the frontend context
	 *
	 * @return []
	 */
	public function get_payment_method_script_handles();


	/**
	 * Returns an array of script handles to enqueue for this payment method in
	 * the admin context
	 *
	 * @return []
	 */
	public function get_payment_method_script_handles_for_admin();


	/**
	 * Returns an array of style handles to enqueue for this payment method in
	 * the frontend context.
	 *
	 * @return []
	 */
	public function get_payment_method_style_handles();


	/**
	 * Returns an array of style handles to enqueue for this payment method in
	 * the admin context.
	 *
	 * @return []
	 */
	public function get_payment_method_style_handles_for_admin();


	/**
	 * An array of key, value pairs of data made available to payment methods
	 * client side.
	 *
	 * @return array
	 */
	public function get_payment_method_data();
}
