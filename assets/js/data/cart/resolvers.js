/**
 * External dependencies
 */
import { select, apiFetch } from '@wordpress/data-controls';
import { camelCase, mapKeys } from 'lodash';

/**
 * Internal dependencies
 */
import { receiveCart, receiveError } from './actions';
import { STORE_KEY, MISSING_ROUTE_ERROR, CART_API_ERROR } from './constants';
import { STORE_KEY as SCHEMA_STORE_KEY } from '../schema/constants';

/**
 * Resolver for retrieving all cart data.
 */
export function* getCartData() {
	const route = yield select(
		SCHEMA_STORE_KEY,
		'getRoute',
		'/wc/store',
		'cart'
	);

	if ( ! route ) {
		yield receiveError( MISSING_ROUTE_ERROR );
		return;
	}

	const cartData = yield apiFetch( {
		path: route,
		method: 'GET',
		cache: 'no-store',
	} );

	if ( ! cartData ) {
		yield receiveError( CART_API_ERROR );
		return;
	}

	yield receiveCart(
		mapKeys( cartData, ( value, key ) => {
			return camelCase( key );
		} )
	);
}

/**
 * Resolver for retrieving cart totals.
 */
export function* getCartTotals() {
	yield select( STORE_KEY, 'getCartData' );
}
