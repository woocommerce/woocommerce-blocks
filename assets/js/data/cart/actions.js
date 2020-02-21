/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { apiFetch, select, dispatch } from '@wordpress/data-controls';

/**
 * Internal dependencies
 */
import { ACTION_TYPES as types } from './action-types';
import { STORE_KEY as SCHEMA_STORE_KEY } from '../schema/constants';
import { STORE_KEY as COLLECTIONS_STORE_KEY } from '../collections/constants';

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

/**
 * Returns an action object used for receiving customer facing errors from the
 * API.
 *
 * @param {Object}   [error={}]    An error object containing the error message
 *                                 and response code.
 * @return {Object} Object for action.
 */
export function receiveError( error = {} ) {
	return {
		type: types.RECEIVE_ERROR,
		error,
	};
}

const missingRouteError = {
	code: 'missing_route',
	message: __( 'Unable to apply coupon.', 'woo-gutenberg-products-block' ),
	data: {
		status: 500,
	},
};

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
			'cart/coupons'
		);

		if ( ! route ) {
			yield receiveError( missingRouteError );
			return;
		}

		const item = yield apiFetch( {
			path: route,
			method: 'POST',
			data: {
				code: couponCode,
			},
			cache: 'no-store',
		} );

		if ( item ) {
			yield dispatch(
				COLLECTIONS_STORE_KEY,
				'invalidateResolution',
				'getCollection',
				'/wc/store',
				'cart'
			);
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
			'cart/coupons'
		);

		if ( ! route ) {
			yield receiveError( missingRouteError );
			return;
		}

		const item = yield apiFetch( {
			path: route,
			method: 'DELETE',
			data: {
				code: couponCode,
			},
			cache: 'no-store',
		} );

		if ( item ) {
			yield dispatch(
				COLLECTIONS_STORE_KEY,
				'invalidateResolution',
				'getCollection',
				'/wc/store',
				'cart'
			);
		}
	} catch ( error ) {
		yield receiveError( error );
	}
}
