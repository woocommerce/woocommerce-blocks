<?php
namespace Automattic\WooCommerce\Blocks\StoreApi\Formatters;

/**
 * Default Formatter.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 */
class DefaultFormatter extends AbstractFormatter {
	/**
	 * Format a given value and return the result.
	 *
	 * @param mixed $value Value to format.
	 * @return mixed
	 */
	public function format( $value ) {
		return $value;
	}
}
