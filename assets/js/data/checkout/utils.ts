/**
 * External dependencies
 */
import { isString } from '@woocommerce/types';

export const handleErrorResponse = ( {
	observerResponses,
	createErrorNotice,
	isErrorResponse,
	isFailResponse,
} ) => {
	let errorResponse = null;
	observerResponses.forEach( ( response ) => {
		if ( isErrorResponse( response ) || isFailResponse( response ) ) {
			if ( response.message && isString( response.message ) ) {
				const errorOptions =
					response.messageContext &&
					isString( response.messageContext )
						? // The `as string` is OK here because of the type guard above.
						  {
								context: response.messageContext as string,
						  }
						: undefined;
				errorResponse = response;
				createErrorNotice( response.message, errorOptions );
			}
		}
	} );
	return errorResponse;
};
