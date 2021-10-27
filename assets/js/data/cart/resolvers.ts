/**
 * External dependencies
 */
import { select, dispatch, apiFetch } from '@wordpress/data-controls';
import { CartResponse, Cart } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import { receiveCart, receiveError } from './actions';
import {
	STORE_KEY,
	CART_API_ERROR,
	LAST_CART_UPDATE_TIMESTAMP_KEY,
} from './constants';

/**
 * Resolver for retrieving all cart data.
 */
export function* getCartData(): Generator< unknown, void, CartResponse > {
	const cartData = yield apiFetch( {
		path: '/wc/store/cart',
		method: 'GET',
		cache: 'no-store',
	} );

	if ( ! cartData ) {
		yield receiveError( CART_API_ERROR );
		return;
	}

	const lastCartUpdateRaw = window.localStorage.getItem(
		LAST_CART_UPDATE_TIMESTAMP_KEY
	);

	if ( lastCartUpdateRaw ) {
		const lastCartUpdate = parseFloat( lastCartUpdateRaw );
		const cartGeneratedTimestamp = parseFloat(
			cartData.generated_timestamp
		);
		const isStale =
			! isNaN( cartGeneratedTimestamp ) &&
			! isNaN( lastCartUpdate ) &&
			lastCartUpdate > cartGeneratedTimestamp;

		if ( isStale ) {
			// Do any invalidation before the collection is received to prevent this query running again.
			yield dispatch( STORE_KEY, 'invalidateResolutionForStore' );
		}
	}

	yield receiveCart( cartData );
}

/**
 * Resolver for retrieving cart totals.
 */
export function* getCartTotals(): Generator< unknown, void, Cart > {
	yield select( STORE_KEY, 'getCartData' );
}
