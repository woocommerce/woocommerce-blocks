<?php
/**
 * Manages the initial state of the Interactivity API store in the server and
 * its serialization so it can be restored in the browser upon hydration.
 *
 * It's a private class, exposed by other functions, like `wc_store`.
 *
 * @access private
 */
class WC_Interactivity_Store {
	/**
	 * Store.
	 *
	 * @var array
	 */
	private static $store = array();

	/**
	 * Get store data.
	 *
	 * @return array
	 */
	public static function get_data() {
		return self::$store;
	}

	/**
	 * Merge data.
	 *
	 * @param array $data The data that will be merged with the existing store.
	 */
	public static function merge_data( $data ) {
		self::$store = array_replace_recursive( self::$store, $data );
	}

	/**
	 * Reset the store data.
	 */
	public static function reset() {
		self::$store = array();
	}

	/**
	 * Render the store data.
	 */
	public static function render() {
		if ( empty( self::$store ) ) {
			return;
		}
		echo sprintf(
			'<script id="wc-interactivity-store-data" type="application/json">%s</script>',
			wp_json_encode( self::$store, JSON_HEX_TAG | JSON_HEX_AMP )
		);
	}
}
