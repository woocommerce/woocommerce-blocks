<?php
/**
 * Move interactive scripts to the footer. This is a temporary measure to make
 * it work with `wc_store` and it should be replaced with deferred scripts or
 * modules.
 */
function woocommerce_interactivity_move_interactive_scripts_to_the_footer() {
	// Move the @woocommerce/interactivity package to the footer.
	wp_script_add_data( 'wc-interactivity', 'group', 1 );

	// Move all the view scripts of the interactive blocks to the footer.
	$registered_blocks = \WP_Block_Type_Registry::get_instance()->get_all_registered();
	foreach ( array_values( $registered_blocks ) as $block ) {
		if ( isset( $block->supports['interactivity'] ) && $block->supports['interactivity'] ) {
			foreach ( $block->view_script_handles as $handle ) {
				wp_script_add_data( $handle, 'group', 1 );
			}
		}
	}
}
add_action( 'wp_enqueue_scripts', 'woocommerce_interactivity_move_interactive_scripts_to_the_footer', 11 );

/**
 * Register the Interactivity API runtime and make it available to be enqueued
 * as a dependency in interactive blocks.
 */
function woocommerce_interactivity_register_runtime() {
	$script_path = plugins_url( '../../build/wc-interactivity.js', __FILE__ );
	wp_register_script(
		'wc-interactivity',
		$script_path,
		array(),
		filemtime( $script_path ),
		true
	);
}
add_action( 'wp_enqueue_scripts', 'woocommerce_interactivity_register_runtime' );
