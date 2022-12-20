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
