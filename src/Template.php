<?php
/**
 * Template helper functions.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks;

defined( 'ABSPATH' ) || exit;

/**
 * Template class.
 */
class Template {

	/**
	 * Render some HTML whilst also defining hooks and filters for developers.
	 *
	 * @param string $html HTML we want to render.
	 * @param string $id Identifier for this block of HTML. Used in hooks.
	 * @param string $hook_prefix Prefix for action/filter hooks used in this method.
	 * @param array  $hook_args Array of data to pass to fired action/filter hooks.
	 */
	public static function render( $html, $id, $hook_prefix = 'woocommerce', $hook_args = array() ) {
		do_action( $hook_prefix . '_before_' . $id, $hook_args );

		echo apply_filters( $hook_prefix . '_' . $id, $html, $hook_args ); // phpcs:ignore

		do_action( $hook_prefix . '_after_' . $id, $hook_args );
	}
}
