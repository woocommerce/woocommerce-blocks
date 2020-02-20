/**
 * Internal dependencies
 */
import { ACTION_TYPES as types } from './action-types';

/**
 * Returns an action object used in updating the store with the provided items
 * retrieved from a request using the given querystring.
 *
 * This is a generic response action.
 *
 * @param {Object}   [response={}]    An object containing the response from the
 *                                    collection request.
 * @param {Array<*>} response.items	An array of items for the given collection.
 * @param {Headers}  response.headers A Headers object from the response
 *                                    link https://developer.mozilla.org/en-US/docs/Web/API/Headers
 * @return {Object} Object for action.
 */
export function receiveCart( response = {} ) {
	return {
		type: types.RECEIVE_CART,
		response,
	};
}
