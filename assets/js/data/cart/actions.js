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

export function receiveError( error = {} ) {
	return {
		type: types.RECEIVE_ERROR,
		error,
	};
}

export function* applyCoupon( couponCode ) {
	// eslint-disable-next-line no-console
	console.log( 'coupon activated: ' + couponCode );
	try {
		const route = yield select(
			SCHEMA_STORE_KEY,
			'getRoute',
			'/wc/store',
			'cart/coupons'
		);

		if ( ! route ) {
			yield receiveError( {
				code: 'missing_route',
				message: __(
					'Unable to apply coupon.',
					'woo-gutenberg-products-block'
				),
				data: {
					status: 500,
				},
			} );
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
