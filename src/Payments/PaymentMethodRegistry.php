<?php
/**
 * Holds data about registered payment methods.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\Payments;

/**
 * Core class used for interacting with block types.
 *
 * @since $VID:$
 */
final class PaymentMethodRegistry {

	/**
	 * Registered payment methods, as `$name => $instance` pairs.
	 *
	 * @var PaymentMethodType[]
	 */
	private $registered_payment_methods = [];

	/**
	 * Container for the main instance of the class.
	 *
	 * @var PaymentMethodRegistry|null
	 */
	private static $instance = null;

	/**
	 * Registers a payment method.
	 *
	 * @param string|PaymentMethodType $name Payment method name, or alternatively a PaymentMethodType instance.
	 * @param array                    $args Optional. Array of payment method type arguments.
	 * @return PaymentMethodType|false The registered payment method type on success, or false on failure.
	 */
	public function register( $name, $args = array() ) {
		$payment_method = null;

		if ( $name instanceof PaymentMethodType ) {
			$payment_method = $name;
			$name           = $payment_method->name;
		}

		if ( ! is_string( $name ) ) {
			_doing_it_wrong( __METHOD__, esc_html__( 'Payment method names must be strings.', 'woo-gutenberg-products-block' ), '2.5.0' );
			return false;
		}

		if ( $this->is_registered( $name ) ) {
			/* translators: %s: Payment method name. */
			_doing_it_wrong( __METHOD__, esc_html( sprintf( __( 'Payment method "%s" is already registered.', 'woo-gutenberg-products-block' ), $name ) ), '2.5.0' );
			return false;
		}

		if ( ! $payment_method ) {
			$payment_method = new PaymentMethodType( $name, $args );
		}

		$this->registered_payment_methods[ $name ] = $payment_method;

		return $payment_method;
	}

	/**
	 * Un-register a payment method.
	 *
	 * @param string|PaymentMethodType $name Payment method name, or alternatively a PaymentMethodType instance.
	 * @return PaymentMethodType|false The unregistered payment method on success, or false on failure.
	 */
	public function unregister( $name ) {
		if ( $name instanceof PaymentMethodType ) {
			$name = $name->name;
		}

		if ( ! $this->is_registered( $name ) ) {
			/* translators: %s: Payment method name. */
			_doing_it_wrong( __METHOD__, esc_html( sprintf( __( 'Payment method "%s" is not registered.', 'woo-gutenberg-products-block' ), $name ) ), '2.5.0' );
			return false;
		}

		$unregistered_payment_method = $this->registered_payment_methods[ $name ];
		unset( $this->registered_payment_methods[ $name ] );

		return $unregistered_payment_method;
	}

	/**
	 * Retrieves a registered payment method.
	 *
	 * @param string $name Payment method name.
	 * @return PaymentMethodType|null The registered payment method, or null if it is not registered.
	 */
	public function get_registered( $name ) {
		if ( ! $this->is_registered( $name ) ) {
			return null;
		}

		return $this->registered_payment_methods[ $name ];
	}

	/**
	 * Retrieves all registered payment methods.
	 *
	 * @return PaymentMethodType[]
	 */
	public function get_all_registered() {
		return $this->registered_payment_methods;
	}

	/**
	 * Checks if a payment method is registered.
	 *
	 * @param string $name Payment method name.
	 * @return bool True if the payment method is registered, false otherwise.
	 */
	public function is_registered( $name ) {
		return isset( $this->registered_payment_methods[ $name ] );
	}

	/**
	 * Utility method to retrieve the main instance of the class.
	 *
	 * The instance will be created if it does not exist yet.
	 *
	 * @return PaymentMethodRegistry The main instance.
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}
}
