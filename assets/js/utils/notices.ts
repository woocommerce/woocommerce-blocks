/**
 * External dependencies
 */
import { select } from '@wordpress/data';
import { Notice } from '@wordpress/notices';

export const hasNoticesOfType = (
	context = '',
	type: 'default' | 'snackbar'
): boolean => {
	const notices: Notice[] = select( 'core/notices' ).getNotices( context );
	return notices.some( ( notice: Notice ) => notice.type === type );
};
