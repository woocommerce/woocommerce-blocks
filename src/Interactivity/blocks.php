<?php
/**
 * Replaces view script for the Image block with version using Interactivity API.
 *
 * @param array $metadata Block metadata as read in via block.json.
 *
 * @return array Filtered block type metadata.
 */
function woocommerce_block_update_interactive_view_script( $metadata ) {
	if (
		in_array( $metadata['name'], array( 'core/image' ), true ) &&
		str_contains( $metadata['file'], 'build/block-library/blocks' )
	) {
		$metadata['viewScript'] = array( 'file:./view-interactivity.min.js' );
	}
	return $metadata;
}
add_filter( 'block_type_metadata', 'woocommerce_block_update_interactive_view_script', 10, 1 );
