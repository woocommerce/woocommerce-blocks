/**
 * External dependencies
 */
import {
	CartResponse,
	Cart,
	ApiErrorResponse,
	isApiErrorResponse,
} from '@woocommerce/types';
import { camelCase, mapKeys } from 'lodash';

/**
 * Internal dependencies
 */
import { notifyQuantityChanges } from './notify-quantity-changes';
import { notifyErrors, notifyCartErrors } from './notify-errors';
import { CartDispatchFromMap, CartSelectFromMap } from './index';

/**
 * A thunk used in updating the store with the cart items retrieved from a request. This also notifies the shopper
 * of any unexpected quantity changes occurred.
 *
 * @param {CartResponse} response
 */
export const receiveCart =
	( response: CartResponse ) =>
	( {
		dispatch,
		select,
	}: {
		dispatch: CartDispatchFromMap;
		select: CartSelectFromMap;
	} ) => {
		const newCart = mapKeys( response, ( _, key ) =>
			camelCase( key )
		) as unknown as Cart;
		const oldCart = select.getCartData();
		notifyCartErrors( newCart.errors, oldCart.errors );
		notifyQuantityChanges( {
			oldCart,
			newCart,
			cartItemsPendingQuantity: select.getItemsPendingQuantityUpdate(),
			cartItemsPendingDelete: select.getItemsPendingDelete(),
		} );
		dispatch.setCartData( newCart );
	};

/**
 * A thunk used in updating the store with cart errors retrieved from a request. This also notifies the shopper of any errors that occur.
 */
export const receiveError =
	( response: ApiErrorResponse | null = null ) =>
	( { dispatch }: { dispatch: CartDispatchFromMap } ) => {
		if ( isApiErrorResponse( response ) ) {
			dispatch.setErrorData( response );

			if ( response.data?.cart ) {
				dispatch.receiveCart( response?.data?.cart );
			}

			notifyErrors( response );
		}
	};
