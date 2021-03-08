/**
 * External dependencies
 */
import apiFetch, { APIFetchOptions } from '@wordpress/api-fetch';

/**
 * Checks if this request is a POST to the wc/store/cart endpoint.
 */
const isCartUpdatePostRequest = ( options: APIFetchOptions ) => {
	const url = options.url || options.path;
	if ( ! url || ! options.method || options.method !== 'POST' ) {
		return false;
	}
	return /wc\/store\/cart\//.exec( url ) !== null;
};

/**
 * Middleware which saves the time that the cart was last modified in
 * the browser's Local Storage
 *
 * @param {Object}   options Fetch options.
 * @param {Function} next    The next middleware or fetchHandler to call.
 *
 * @return {*} The evaluated result of the remaining middleware chain.
 */
const cartUpdateMiddleware = (
	options: APIFetchOptions,
	/* eslint-disable @typescript-eslint/no-explicit-any */
	next: ( arg0: APIFetchOptions, arg1: any ) => any
) => {
	if ( isCartUpdatePostRequest( options ) ) {
		window.localStorage.setItem(
			'lastCartUpdate',
			JSON.stringify( {
				timestamp: Date.now() / 1000,
			} )
		);
	}
	return next( options, next );
};

apiFetch.use( cartUpdateMiddleware );
