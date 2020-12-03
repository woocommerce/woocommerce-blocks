<?php
namespace Automattic\WooCommerce\Blocks\StoreApi;

use \Exception;
use Automattic\WooCommerce\Blocks\StoreApi\Formatters\AbstractFormatter;
use Automattic\WooCommerce\Blocks\StoreApi\Formatters\DefaultFormatter;

/**
 * Formatters class.
 *
 * Allows formatter classes to be registered. Formatters are exposed to extensions via the ExtendRestApi class.
 */
class Formatters {
	/**
	 * Holds an array of formatter classes.
	 *
	 * @var array
	 */
	private $formatters = [];

	/**
	 * Get a new instance of a formatter class.
	 *
	 * @throws Exception An Exception is thrown if a non-existing formatter is used and the user is admin.
	 *
	 * @param string $name Name of the formatter.
	 * @return AbstractFormatter Formatter class instance.
	 */
	public function __get( $name ) {
		if ( ! isset( $this->formatters[ $name ] ) ) {
			if ( defined( 'WP_DEBUG' ) && WP_DEBUG && current_user_can( 'manage_woocommerce' ) ) {
				throw new Exception( $name . ' formatter does not exist' );
			}
			return new DefaultFormatter();
		}
		return new $this->formatters[ $name ]();
	}

	/**
	 * Register a formatter class for usage.
	 *
	 * @param string $name Name of the formatter.
	 * @param string $class A formatter class name.
	 */
	public function register( $name, $class ) {
		$this->formatters[ $name ] = $class;
	}
}
