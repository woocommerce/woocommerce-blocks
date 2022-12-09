/**
 * External dependencies
 */
import { CartResponse } from '@woocommerce/type-defs/cart-response';
import { camelCase, mapKeys } from 'lodash';
import { Cart } from '@woocommerce/type-defs/cart';

/**
 * Internal dependencies
 */
import { notifyQuantityChanges } from './notify-quantity-changes';

/**
 * A thunk used in updating the store with the cart items retrieved from a request. This also notifies the shopper
 * of any unexpected quantity changes occurred.
 *
 * @param {CartResponse} response
 */
export const receiveCart =
	( response: CartResponse ) =>
	( { dispatch, select } ) => {
		const cart = mapKeys( response, ( _, key ) =>
			camelCase( key )
		) as unknown as Cart;
		notifyQuantityChanges(
			select.getCartData(),
			cart,
			select.getItemsPendingQuantityUpdate()
		);
		dispatch.setCartData( cart );
	};
