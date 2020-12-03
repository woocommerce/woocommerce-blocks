<?php
namespace Automattic\WooCommerce\Blocks\StoreApi\Formatters;

/**
 * HtmlFormatter.
 *
 * Formats HTML in API responses.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 */
abstract class AbstractFormatter implements FormatterInterface {
	/**
	 * Array of options for the formatter.
	 *
	 * @var array
	 */
	protected $options = [];

	/**
	 * Gets a formatter option.
	 *
	 * @param string $name Option name.
	 * @param string $default Default returned if the option is not set.
	 * @return string
	 */
	public function get_option( $name, $default = '' ) {
		return isset( $this->options[ $name ] ) ? $this->options[ $name ] : $default;
	}

	/**
	 * Sets a formatter option.
	 *
	 * @param string $name Option name.
	 * @param string $value Option value.
	 */
	public function set_option( $name, $value ) {
		$this->options[ $name ] = $value;
	}
}
