/**
 * External dependencies
 */
import apiFetch from '@wordpress/api-fetch';

// Stores the current nonce for the middleware.
let currentNonce = window.localStorage.getItem( 'storeApiCurrentNonce' ) || '';
let previousNonce =
	window.localStorage.getItem( 'storeApiPreviousNonce' ) || '';

/**
 * Returns whether or not this is a non GET wc/store API request.
 *
 * @param {Object} options Fetch options.
 *
 * @return {boolean} Returns true if this is a store request.
 */
const isStoreApiGetRequest = ( options ) => {
	const url = options.url || options.path;
	if ( ! url || ! options.method || options.method === 'GET' ) {
		return false;
	}
	return /wc\/store\//.exec( url ) !== null;
};

/**
 * Set the current nonce from a header object.
 *
 * @param {Object} headers Headers object.
 */
const setNonce = ( headers ) => {
	const newNonce = headers?.get( 'X-WC-Store-API-Nonce' );
	updateNonce( newNonce );
};

/**
 * Updates the stored nonce and localStorage so it is persisted between page loads.
 *
 * @param {string} newNonce Incoming nonce string.
 */
const updateNonce = ( newNonce ) => {
	// If the "new" nonce matches the current or previous nonces, we don't need to update. It might be unchanged, or it might be coming from cache.
	if ( newNonce === currentNonce || newNonce === previousNonce ) {
		return;
	}

	previousNonce = currentNonce;
	currentNonce = newNonce;

	// Update the persisted values.
	window.localStorage.setItem( 'storeApiCurrentNonce', currentNonce );
	window.localStorage.setItem( 'storeApiPreviousNonce', previousNonce );
};

/**
 * Nonce middleware which updates the nonce after a request, if given.
 *
 * @param {Object}   options Fetch options.
 * @param {Function} next    The next middleware or fetchHandler to call.
 *
 * @return {*} The evaluated result of the remaining middleware chain.
 */
const storeNonceMiddleware = ( options, next ) => {
	if ( isStoreApiGetRequest( options ) ) {
		const existingHeaders = options.headers || {};
		options.headers = {
			...existingHeaders,
			'X-WC-Store-API-Nonce': currentNonce,
		};
	}
	return next( options, next );
};

apiFetch.use( storeNonceMiddleware );
apiFetch.setNonce = setNonce;

// @ts-ignore wcStoreApiNonce is window global cache for the initial nonce initialized from hydration.
updateNonce( wcStoreApiNonce );
