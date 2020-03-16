/**
 * External dependencies
 */
import { select } from '@wordpress/data';

function isTracksAvailable() {
	return typeof window.wcTracks.recordEvent === 'function';
}

export const recordEditorEvent = function( event, props ) {
	if ( ! isTracksAvailable ) {
		return;
	}

	// Force prefix - our editor events will be 'wcadmin_blocks_*'.
	const blocksPrefix = 'blocks_';

	const postData = select( 'core/editor' );
	window.wcTracks.recordEvent( blocksPrefix + event, {
		// Automatically include post id and post type props.
		post_id: postData.getCurrentPostId(),
		post_type: postData.getCurrentPostType(),
		...props,
	} );
};
