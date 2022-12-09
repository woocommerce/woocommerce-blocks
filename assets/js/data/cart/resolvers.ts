/**
 * External dependencies
 */
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import { CART_API_ERROR } from './constants';

/**
 * Resolver for retrieving all cart data.
 */
export const getCartData =
	() =>
	async ( { dispatch } ) => {
		const cartData = await apiFetch( {
			path: '/wc/store/v1/cart',
			method: 'GET',
			cache: 'no-store',
		} );

		const { receiveCart, receiveError } = dispatch;
		if ( ! cartData ) {
			receiveError( CART_API_ERROR );
			return;
		}
		receiveCart( cartData );
	};

/**
 * Resolver for retrieving cart totals.
 */
export const getCartTotals =
	() =>
	async ( { resolveSelect } ) => {
		await resolveSelect.getCartData();
	};
