/**
 * External dependencies
 */
import triggerFetch from '@wordpress/api-fetch';

/**
 * Dispatched a control action for triggering an api fetch call with no parsing.
 * Typically this would be used in scenarios where headers are needed.
 * Also adds the current nonce to the request.
 *
 * @param {Object} options The options for the API request.
 * @param {string} nonce   The nonce to add to the request headers.
 *
 * @return {Object} The control action descriptor.
 */
export const apiFetchWithNonce = ( options, nonce ) => {
	return {
		type: 'API_FETCH_WITH_HEADERS',
		options: {
			...options,
			headers: {
				'X-WC-Store-API-Nonce': nonce,
			},
		},
	};
};

/**
 * Dispatched a control action for triggering an api fetch call with no parsing.
 * Typically this would be used in scenarios where headers are needed.
 *
 * @param {Object} options The options for the API request.
 *
 * @return {Object} The control action descriptor.
 */
export const apiFetchWithHeaders = ( options ) => {
	return {
		type: 'API_FETCH_WITH_HEADERS',
		options,
	};
};

/**
 * Default export for registering the controls with the store.
 *
 * @return {Object} An object with the controls to register with the store on
 *                  the controls property of the registration object.
 */
export const controls = {
	API_FETCH_WITH_HEADERS( { options } ) {
		return new Promise( ( resolve, reject ) => {
			triggerFetch( { ...options, parse: false } )
				.then( ( fetchResponse ) => {
					fetchResponse.json().then( ( response ) => {
						resolve( { response, headers: fetchResponse.headers } );
					} );
				} )
				.catch( ( error ) => {
					reject( error );
				} );
		} );
	},
};
