<?php
namespace Automattic\WooCommerce\Blocks\StoreApi\Formatters;

/**
 * FormatterInterface.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 */
interface FormatterInterface {
	/**
	 * Format a given value and return the result.
	 *
	 * @param mixed $value Value to format.
	 * @return mixed
	 */
	public function format( $value );

	/**
	 * Gets a formatter option.
	 *
	 * @param string $name Option name.
	 * @param string $default Default returned if the option is not set.
	 * @return string
	 */
	public function get_option( $name, $default = '' );

	/**
	 * Sets a formatter option.
	 *
	 * @param string $name Option name.
	 * @param string $value Option value.
	 */
	public function set_option( $name, $value );
}
