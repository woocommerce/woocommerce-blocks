<?php
namespace Automattic\WooCommerce\Blocks\Utils;

use \Exception;

/**
 * ArrayUtils class used for custom functions to operate on arrays
 */
class ArrayUtils {
	/**
	 * Join a string with a natural language conjunction at the end.
	 *
	 * @param array $array  The array to join together with the natural language conjunction.
	 * @param bool  $enclose_items_with_quotes Whether each item in the array should be enclosed within quotation marks.
	 *
	 * @return string a string containing a list of items and a natural language conjuction.
	 */
	public static function natural_language_join( $array, $enclose_items_with_quotes = false ) {
		if ( true === $enclose_items_with_quotes ) {
			$array = array_map(
				function( $item ) {
					return '"' . $item . '"';
				},
				$array
			);
		}
		$last = array_pop( $array );
		if ( $array ) {
			return sprintf(
				/* translators: 1: The first n-1 items of a list 2: the last item in the list. */
				__( '%1$s and %2$s', 'woo-gutenberg-products-block' ),
				implode( ', ', $array ),
				$last
			);
		}
		return $last;
	}

	/**
	 * A utility function to remove items from an array based on their key.
	 *
	 * @param array    $array The array to remove items from.
	 * @param string[] $keys_to_remove The keys of the items that should be removed from the array.
	 *
	 * @return array Returns the array with keys removed.
	 * @throws Exception Throws when either the original array, or keys to remove is not an array.
	 */
	public static function remove_keys( $array, $keys_to_remove ) {
		if ( ! is_array( $keys_to_remove ) || ! is_array( $array ) ) {
			throw new Exception( '$array and $keys_to_remove must both be arrays.' );
		}
		foreach ( $keys_to_remove as $key_to_remove ) {
			if ( isset( $array[ $key_to_remove ] ) ) {
				unset( $array[ $key_to_remove ] );
			}
		}
		return $array;
	}
}
