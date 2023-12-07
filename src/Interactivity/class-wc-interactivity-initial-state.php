<?php
/**
 * Manages the initial state of the Interactivity API store in the server and
 * its serialization so it can be restored in the browser upon hydration.
 *
 * It's a private class, exposed by other functions, like `wc_initial_state`.
 *
 * @access private
 */
class WC_Interactivity_Initial_State {
	/**
	 * Map of initial state by namespace.
	 *
	 * @var array
	 */
	private static $initial_state = array();

	/**
	 * Get state from a given namespace.
	 *
	 * @param string $namespace Namespace.
	 *
	 * @return array The requested state.
	 */
	public static function get_state( $namespace ) {
		return self::$initial_state[ $namespace ] ?? array();
	}

	/**
	 * Merge data into the state with the given namespace.
	 *
	 * @param string $namespace Namespace.
	 * @param array  $data      State to merge.
	 *
	 * @return void
	 */
	public static function merge_state( $namespace, $data ) {
		self::$initial_state[ $namespace ] = array_replace_recursive(
			self::get_state( $namespace ),
			$data
		);
	}

	/**
	 * Reset the initial state.
	 */
	public static function reset() {
		self::$initial_state = array();
	}

	/**
	 * Render the initial state.
	 */
	public static function render() {
		if ( empty( self::$initial_state ) ) {
			return;
		}
		echo sprintf(
			'<script id="wc-interactivity-initial-state" type="application/json">%s</script>',
			wp_json_encode( self::$initial_state, JSON_HEX_TAG | JSON_HEX_AMP )
		);
	}
}
