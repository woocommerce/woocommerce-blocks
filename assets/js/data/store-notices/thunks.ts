/**
 * Internal dependencies
 */
import { ACTION_TYPES } from './action-types';

let timeout: NodeJS.Timeout;

/**
 * Thunk that will highlight a notice for 2 seconds, then unhighlight it.
 * Highlighting multiple times will prevent unhighlight being called until two seconds since the last highlight elapsed.
 */
export const highlightNotice = async (
	containerContext: string,
	noticeId: string
) => {
	return ( { dispatch } ) => {
		const { unHighlightNotice } = dispatch;
		clearTimeout( timeout );
		timeout = setTimeout(
			() => unHighlightNotice( containerContext, noticeId ),
			2000
		);
		dispatch( {
			type: ACTION_TYPES.HIGHLIGHT_NOTICE,
			containerContext,
			noticeId,
		} );
	};
};
