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
	 * @var PaymentMethodTypeInterface[]
	 */
	private $registered_payment_methods = [];

	/**
	 * Registers a payment method.
	 *
	 * @param PaymentMethodTypeInterface $payment_method_type An instance of PaymentMethodTypeInterface.
	 *
	 * @return boolean True means registered successfully.
	 */
	public function register( PaymentMethodTypeInterface $payment_method_type ) {
		$name = $payment_method_type->get_name();
		if ( $this->is_registered( $name ) ) {
			/* translators: %s: Payment method name. */
			_doing_it_wrong( __METHOD__, esc_html( sprintf( __( 'Payment method "%s" is already registered.', 'woo-gutenberg-products-block' ), $name ) ), '2.5.0' );
			return false;
		}
		$this->registered_payment_methods[ $name ] = $payment_method_type;
		return true;
	}

	/**
	 * Initializes all payment method types.
	 */
	public function initialize() {
		$registered_payment_method_types = $this->get_all_registered();
		foreach ( $registered_payment_method_types as $registered_type ) {
			$registered_type->initialize();
		}
	}

	/**
	 * Un-register a payment method.
	 *
	 * @param string|PaymentMethodTypeInterface $name Payment method name, or alternatively a PaymentMethodTypeInterface instance.
	 * @return boolean True means unregistered successfully.
	 */
	public function unregister( $name ) {
		if ( $name instanceof PaymentMethodTypeInterface ) {
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
	 * @return PaymentMethodTypeInterface|null The registered payment method, or null if it is not registered.
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
	 * @return PaymentMethodTypeInterface[]
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
}
