/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import triggerFetch, { APIFetchOptions } from '@wordpress/api-fetch';

export interface ApiFetchWithHeadersAction {
	type: string;
	options: APIFetchOptions;
}

/**
 * Dispatched a control action for triggering an api fetch call with no parsing.
 * Typically this would be used in scenarios where headers are needed.
 *
 * @param {APIFetchOptions} options The options for the API request.
 *
 * @return {ApiFetchWithHeadersAction} The control action descriptor.
 */
export const apiFetchWithHeaders = (
	options: APIFetchOptions
): ApiFetchWithHeadersAction => {
	return {
		type: 'API_FETCH_WITH_HEADERS',
		options,
	};
};

/**
 * Error thrown when JSON cannot be parsed.
 */
const invalidJsonError = {
	code: 'invalid_json',
	message: __(
		'The response is not a valid JSON response.',
		'woo-gutenberg-products-block'
	),
};

const setNonceOnFetch = ( headers: Headers ): void => {
	if (
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore -- this does exist because it's monkey patched in
		// middleware/store-api-nonce.
		triggerFetch.setNonce &&
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore -- this does exist because it's monkey patched in
		// middleware/store-api-nonce.
		typeof triggerFetch.setNonce === 'function'
	) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore -- this does exist because it's monkey patched in
		// middleware/store-api-nonce.
		triggerFetch.setNonce( headers );
	} else {
		// eslint-disable-next-line no-console
		console.error(
			'The monkey patched function on APIFetch, "setNonce", is not present, likely another plugin or some other code has removed this augmentation'
		);
	}
};

/**
 * Default export for registering the controls with the store.
 *
 * @return {Object} An object with the controls to register with the store on
 *                  the controls property of the registration object.
 */
export const controls = {
	API_FETCH_WITH_HEADERS( {
		options,
	}: {
		options: APIFetchOptions;
	} ): Promise< unknown > {
		return new Promise( ( resolve, reject ) => {
			triggerFetch( { ...options, parse: false } )
				.then( ( fetchResponse ) => {
					fetchResponse
						.json()
						.then( ( response ) => {
							resolve( {
								response,
								headers: fetchResponse.headers,
							} );
							setNonceOnFetch( fetchResponse.headers );
						} )
						.catch( () => {
							reject( invalidJsonError );
						} );
				} )
				.catch( ( errorResponse ) => {
					setNonceOnFetch( errorResponse.headers );
					if ( typeof errorResponse.json === 'function' ) {
						// Parse error response before rejecting it.
						errorResponse
							.json()
							.then( ( error: unknown ) => {
								reject( error );
							} )
							.catch( () => {
								reject( invalidJsonError );
							} );
					} else {
						reject( errorResponse.message );
					}
				} );
		} );
	},
};
