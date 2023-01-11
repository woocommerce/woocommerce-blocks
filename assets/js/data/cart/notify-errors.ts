/**
 * External dependencies
 */
import { ApiErrorResponse, isApiErrorResponse } from '@woocommerce/types';
import { createNotice, DEFAULT_ERROR_MESSAGE } from '@woocommerce/base-utils';

/**
 * This function is used to notify the user of cart errors.
 */
export const notifyErrors = ( errors: ApiErrorResponse | null = null ) => {
	if ( errors === null || ! isApiErrorResponse( errors ) ) {
		return;
	}
	createNotice( 'error', errors.message || DEFAULT_ERROR_MESSAGE, {
		id: errors.code,
		context: 'wc/cart',
	} );
};
