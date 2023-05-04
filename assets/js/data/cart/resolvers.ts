/**
 * External dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { CartResponse } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import { CART_API_ERROR } from './constants';
import type { CartDispatchFromMap, CartResolveSelectFromMap } from './index';

/**
 * Get order endpoint.
 *
 * @param {number} orderId
 * @param {string} orderKey
 */
export const getOrderEndpoint = ( orderId: number, orderKey: string ) => {
	return `/wc/store/v1/order/${ orderId }?key=${ orderKey }`;
};

/**
 * Resolver for retrieving all cart or order data.
 *
 * @param {number} orderId
 * @param {string} orderKey
 */
export const getCartData =
	( orderId?: number, orderKey?: string ) =>
	async ( { dispatch }: { dispatch: CartDispatchFromMap } ) => {
		const cartData = await apiFetch< CartResponse >( {
			path:
				orderId && orderKey
					? getOrderEndpoint( orderId, orderKey )
					: '/wc/store/v1/cart',
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
	async ( {
		resolveSelect,
	}: {
		resolveSelect: CartResolveSelectFromMap;
	} ) => {
		await resolveSelect.getCartData();
	};
