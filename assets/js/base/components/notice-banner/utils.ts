/**
 * Internal dependencies
 */
import type { NoticeProps } from './types';

export const getDefaultPoliteness = ( status: NoticeProps[ 'status' ] ) => {
	switch ( status ) {
		case 'success':
		case 'warning':
		case 'info':
		case 'default':
			return 'polite';

		case 'error':
		default:
			return 'assertive';
	}
};
