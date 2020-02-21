/**
 * External dependencies
 */
import { apiFetch, select } from '@wordpress/data-controls';

/**
 * Internal dependencies
 */
import { ACTION_TYPES as types } from './action-types';
import { MISSING_ROUTE_ERROR } from './constants';
import { STORE_KEY as SCHEMA_STORE_KEY } from '../schema/constants';

/**
 * Returns an action object used in updating the store with the provided items
 * retrieved from a request using the given querystring.
 *
 * This is a generic response action.
 *
 * @param {Object}   [response={}]    An object containing the response from the
 *                                    request.
 * @return {Object} Object for action.
 */
export function receiveCart( response = {} ) {
	return {
		type: types.RECEIVE_CART,
		response,
	};
}

/**
 * Returns an action object used for receiving customer facing errors from the
 * API.
 *
 * @param {Object}  [error={}]     An error object containing the error message
 *                                 and response code.
 * @param {boolean} [replace=true] Should existing errors be replaced, or should
 *                                 the error be appended.
 * @return {Object} Object for action.
 */
export function receiveError( error = {}, replace = true ) {
	return {
		type: replace ? types.REPLACE_ERRORS : types.RECEIVE_ERROR,
		error,
	};
}

/**
 * Applies a coupon code and either invalidates caches, or receives an error if
 * the coupon cannot be applied.
 *
 * @param {string} couponCode The coupon code to apply to the cart.
 */
export function* applyCoupon( couponCode ) {
	try {
		const route = yield select(
			SCHEMA_STORE_KEY,
			'getRoute',
			'/wc/store',
			'cart/apply-coupon/(?P<code>[\\w-]+)',
			[ couponCode ]
		);

		if ( ! route ) {
			yield receiveError( MISSING_ROUTE_ERROR );
			return;
		}

		const result = yield apiFetch( {
			path: route,
			method: 'POST',
			cache: 'no-store',
		} );

		if ( result ) {
			yield receiveCart( result );
		}
	} catch ( error ) {
		yield receiveError( error );
	}
}

/**
 * Removes a coupon code and either invalidates caches, or receives an error if
 * the coupon cannot be removed.
 *
 * @param {string} couponCode The coupon code to remove from the cart.
 */
export function* removeCoupon( couponCode ) {
	try {
		const route = yield select(
			SCHEMA_STORE_KEY,
			'getRoute',
			'/wc/store',
			'cart/remove-coupon/(?P<code>[\\w-]+)',
			[ couponCode ]
		);

		if ( ! route ) {
			yield receiveError( MISSING_ROUTE_ERROR );
			return;
		}

		const result = yield apiFetch( {
			path: route,
			method: 'DELETE',
			cache: 'no-store',
		} );

		if ( result ) {
			yield receiveCart( result );
		}
	} catch ( error ) {
		yield receiveError( error );
	}
}
