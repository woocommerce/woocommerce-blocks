/**
 * External dependencies
 */
import { apiFetch } from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import { getSetting } from '../shared';

/**
 * Returns whether or not this is a non GET wc/store API request.
 *
 * @param {Object} options Options given to apiFetch.
 *
 * @return boolean
 */
const isStoreApiGetRequest = ( options ) => {
	const url = options.url || options.path;
	if ( ! url || ! options.method || options.method === 'GET' ) {
		return false;
	}
	return /wc\/store\//.exec( url ) !== null;
};

/** cache for nonce initialized from hydration  */
let nonce = getSetting( 'storeApiNonce' );

const setNonce = ( headers ) => {
	const newNonce = headers?.get( 'X-WC-Store-API-Nonce' );
	if ( newNonce ) {
		nonce = newNonce;
	}
};

export const storeNonceMiddleware = ( options, next ) => {
	if ( isStoreApiGetRequest( options ) ) {
		const existingHeaders = options.headers || {};
		options.headers = {
			...existingHeaders,
			'X-WC-Store-API-Nonce': nonce,
		};
	}
	return next( options, next );
};

apiFetch.use( storeNonceMiddleware );
apiFetch.setNonce = setNonce;
