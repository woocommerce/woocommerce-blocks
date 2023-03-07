/**
 * External dependencies
 */
import { info, megaphone, check } from '@wordpress/icons';

export const getDefaultPoliteness = ( status: string ) => {
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

export const getStatusIcon = ( status: string ): JSX.Element => {
	switch ( status ) {
		case 'success':
			return check;
		case 'warning':
		case 'info':
		case 'error':
			return info;
		default:
			return megaphone;
	}
};
