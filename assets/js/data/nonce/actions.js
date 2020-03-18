/**
 * Internal dependencies
 */
import { ACTION_TYPES as types } from './action-types.js';

/**
 * Returns an action object used in updating the current nonce for API requests.
 *
 * @param {string}  [nonce] The new nonce.
 * @return {Object} Object for action.
 */
export function receiveNonce( nonce ) {
	return {
		type: types.RECEIVE_NONCE,
		nonce,
	};
}

/**
 * Returns an action object used in updating the current nonce for API requests.
 *
 * @param {Headers} [headers] Response headers.
 * @return {Object} Object for action.
 */
export function receiveNonceFromHeaders( headers ) {
	if ( headers && headers.get && headers.has( 'X-WC-Store-API-Nonce' ) ) {
		return receiveNonce( headers.get( 'X-WC-Store-API-Nonce' ) || '' );
	}
}
