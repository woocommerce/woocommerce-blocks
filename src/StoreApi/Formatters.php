<?php
namespace Automattic\WooCommerce\Blocks\StoreApi;

use Exception;
use Schemas\AbstractSchema;
use Automattic\WooCommerce\Blocks\Domain\Services\ExtendRestApi;
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
	 * @param string $name Name of the formatter.
	 * @return AbstractFormatter Formatter class instance.
	 */
	public function __get( $name ) {
		if ( ! isset( $this->formatters[ $name ] ) ) {
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
