<?php
namespace Automattic\WooCommerce\Blocks\StoreApi\Formatters;

/**
 * Html Formatter.
 *
 * Formats HTML in API responses.
 *
 * @internal This API is used internally by Blocks--it is still in flux and may be subject to revisions.
 */
class HtmlFormatter extends AbstractFormatter {
	/**
	 * Format a given value and return the result.
	 *
	 * @param string|array $value Value to format.
	 * @return string
	 */
	public function format( $value ) {
		if ( is_array( $value ) ) {
			return array_map( [ $this, 'format' ], $value );
		}
		return is_scalar( $value ) ? wp_kses_post( trim( convert_chars( wptexturize( $value ) ) ) ) : $value;
	}
}
