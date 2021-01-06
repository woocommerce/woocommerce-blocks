<?php
namespace Automattic\WooCommerce\Blocks\Utils;

/**
 * ArrayUtils class used for custom functions to operate on arrays
 */
class ArrayUtils {
	/**
	 * Join a string with a natural language conjunction at the end.
	 *
	 * @param array $array  The array to join together with the natural language conjunction.
	 *
	 * @return string a string containing a list of items and a natural language conjuction.
	 */
	public static function natural_language_join( $array ) {
		$last = array_pop( $array );
		if ( $array ) {
			return sprintf(
			// translators: 1: The first n-1 items of a list 2: the last item in the list.
				__( '%1$s, and %2$s', 'woo-gutenberg-products-block' ),
				implode( ', ', $array ),
				$last
			);
		}
		return $last;
	}
}
