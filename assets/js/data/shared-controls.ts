/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import triggerFetch, { APIFetchOptions } from '@wordpress/api-fetch';
import DataLoader from 'dataloader';

/**
 * Internal dependencies
 */
import {
	ApiFetchWithHeadersAction,
	assertBatchResponseIsValid,
	assertResponseIsValid,
	ApiResponse,
} from './types';

/**
 * Dispatched a control action for triggering an api fetch call with no parsing.
 * Typically this would be used in scenarios where headers are needed.
 *
 * @param {APIFetchOptions} options The options for the API request.
 */
export const apiFetchWithHeaders = ( options: APIFetchOptions ) =>
	( {
		type: 'API_FETCH_WITH_HEADERS',
		options,
	} as const );

const EMPTY_OBJECT = {};

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

const checkStatus = ( response: ApiResponse ) => {
	if ( response.status >= 200 && response.status < 300 ) {
		return response;
	}
	throw response;
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
 * Trigger a fetch from the API using the batch endpoint.
 */
const triggerBatchFetch = ( keys: readonly APIFetchOptions[] ) => {
	return triggerFetch( {
		path: `/wc/store/batch`,
		method: 'POST',
		data: {
			requests: keys.map( ( request: APIFetchOptions ) => {
				return {
					...request,
					body: request?.data,
				};
			} ),
		},
	} ).then( ( response: unknown ) => {
		assertBatchResponseIsValid( response );
		return keys.map(
			( key, index: number ) =>
				response.responses[ index ] || EMPTY_OBJECT
		);
	} );
};

/**
 * DataLoader instance for triggerBatchFetch.
 */
const triggerBatchFetchLoader = new DataLoader( triggerBatchFetch, {
	batchScheduleFn: ( callback ) => setTimeout( callback, 3000 ),
	cache: false,
	maxBatchSize: 25,
} );

/**
 * Trigger a fetch from the API using the batch endpoint.
 *
 * @param {APIFetchOptions} request Request object containing API request.
 */
const batchFetch = async ( request: APIFetchOptions ) => {
	return await triggerBatchFetchLoader.load( request );
};

/**
 * Default export for registering the controls with the store.
 *
 * @return {Object} An object with the controls to register with the store on
 *                  the controls property of the registration object.
 */
export const controls = {
	API_FETCH_WITH_HEADERS: ( {
		options,
	}: ReturnType< typeof apiFetchWithHeaders > ): Promise< unknown > => {
		return new Promise( ( resolve, reject ) => {
			// GET Requests cannot be batched.
			if ( ! options.method || options.method === 'GET' ) {
				// Parse is disabled here to avoid returning just the body--we also need headers.
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
			} else {
				batchFetch( options )
					.then( ( response: unknown ) => {
						assertResponseIsValid( response );
						setNonceOnFetch( response.headers );
						resolve( checkStatus( response ) );
					} )
					.catch( ( error: { message?: string } ) => {
						reject( error?.message || error );
					} );
			}
		} );
	},
};
