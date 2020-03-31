<?php
/**
 * Class representing a payment method.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\Payments;

defined( 'ABSPATH' ) || exit;

/**
 * PaymentMethodType class.
 */
class PaymentMethodType {
	/**
	 * Payment method name/id.
	 *
	 * @var string
	 */
	protected $name = '';

	/**
	 * List of scripts to register.
	 *
	 * @var array
	 */
	protected $scripts = [];

	/**
	 * Payment method data/settings.
	 *
	 * @var array
	 */
	protected $data = [];

	/**
	 * Constructor.
	 *
	 * Will populate object properties from the provided arguments.
	 *
	 * @param string       $payment_method_type Payment method name.
	 * @param array|string $args                Optional. Array or string of arguments for registering a payment method type.
	 */
	public function __construct( $payment_method_type, $args = array() ) {
		$this->name = $payment_method_type;

		$this->set_props( $args );
	}

	/**
	 * Sets payment method type properties.
	 *
	 * @param array|string $args Array or string of arguments for registering a block type.
	 */
	public function set_props( $args ) {
		$args = wp_parse_args(
			$args,
			array(
				'data'    => [],
				'scripts' => [],
			)
		);

		$args['name'] = $this->name;

		foreach ( $args as $property_name => $property_value ) {
			$this->$property_name = $property_value;
		}
	}

	/**
	 * Magic getter for protected properties.
	 *
	 * @param string $name Property name.
	 */
	public function __get( $name ) {
		if ( in_array( $name, [ 'name', 'data', 'scripts' ], true ) ) {
			return $this->$name;
		}
		return null;
	}
}
