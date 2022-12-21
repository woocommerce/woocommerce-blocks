/**
 * External dependencies
 */
import { select } from '@wordpress/data';

/**
 * Internal dependencies
 */
import type { View } from './types';

export const getView = (
	viewName: string,
	views: View[]
): View | undefined => {
	return views.find( ( view ) => view.view === viewName );
};

const defaultView = {
	views: [],
	currentView: '',
	viewClientId: '',
};

export const findParentBlockEditorViews = (
	clintId: string
): {
	views: View[];
	currentView: string;
	viewClientId: string;
} => {
	const { getBlockAttributes, getBlockRootClientId } =
		select( 'core/block-editor' );
	const rootId = getBlockRootClientId( clintId ) as string;
	const rootAttributes = rootId ? getBlockAttributes( rootId ) : null;

	if ( ! rootAttributes ) {
		return defaultView;
	}

	if ( rootAttributes.editorViews !== undefined ) {
		return {
			views: rootAttributes.editorViews,
			currentView:
				rootAttributes.currentView ||
				rootAttributes.editorViews[ 0 ].view,
			viewClientId: rootId,
		};
	}

	return findParentBlockEditorViews( rootId );
};
