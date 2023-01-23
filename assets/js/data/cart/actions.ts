/**
 * External dependencies
 */
import type {
	Cart,
	CartResponse,
	CartResponseItem,
	ApiErrorResponse,
} from '@woocommerce/types';
import { camelCase, mapKeys } from 'lodash';
import { BillingAddress, ShippingAddress } from '@woocommerce/settings';

/**
 * Internal dependencies
 */
import { ACTION_TYPES as types } from './action-types';
import { ReturnOrGeneratorYieldUnion } from '../mapped-types';
import type { Thunks } from './thunks';

// Thunks are functions that can be dispatched, similar to actions creators
export * from './thunks';

/**
 * An action creator that dispatches the plain action responsible for setting the cart data in the store.
 *
 * @param  cart the parsed cart object. (Parsed into camelCase).
 */
export const setCartData = ( cart: Cart ): { type: string; response: Cart } => {
	return {
		type: types.SET_CART_DATA,
		response: cart,
	};
};

/**
 * An action creator that dispatches the plain action responsible for setting the cart error data in the store.
 *
 * @param  error the parsed error object (Parsed into camelCase).
 */
export const setErrorData = (
	error: ApiErrorResponse | null
): { type: string; response: ApiErrorResponse | null } => {
	return {
		type: types.SET_ERROR_DATA,
		error,
	};
};

/**
 * Returns an action object used in updating the store with the provided cart.
 *
 * This omits the customer addresses so that only updates to cart items and totals are received. This is useful when
 * currently editing address information to prevent it being overwritten from the server.
 *
 * This is a generic response action.
 *
 * @param {CartResponse} response
 */
export const receiveCartContents = (
	response: CartResponse
): { type: string; response: Partial< Cart > } => {
	const cart = mapKeys( response, ( _, key ) =>
		camelCase( key )
	) as unknown as Cart;
	const { shippingAddress, billingAddress, ...cartWithoutAddress } = cart;
	return {
		type: types.SET_CART_DATA,
		response: cartWithoutAddress,
	};
};

/**
 * Returns an action object used to track when a coupon is applying.
 *
 * @param {string} [couponCode] Coupon being added.
 */
export const receiveApplyingCoupon = ( couponCode: string ) =>
	( {
		type: types.APPLYING_COUPON,
		couponCode,
	} as const );

/**
 * Returns an action object used to track when a coupon is removing.
 *
 * @param {string} [couponCode] Coupon being removed..
 */
export const receiveRemovingCoupon = ( couponCode: string ) =>
	( {
		type: types.REMOVING_COUPON,
		couponCode,
	} as const );

/**
 * Returns an action object for updating a single cart item in the store.
 *
 * @param {CartResponseItem} [response=null] A cart item API response.
 */
export const receiveCartItem = ( response: CartResponseItem | null = null ) =>
	( {
		type: types.RECEIVE_CART_ITEM,
		cartItem: response,
	} as const );

/**
 * Returns an action object to indicate if the specified cart item quantity is
 * being updated.
 *
 * @param {string}  cartItemKey              Cart item being updated.
 * @param {boolean} [isPendingQuantity=true] Flag for update state; true if API
 *                                           request is pending.
 */
export const itemIsPendingQuantity = (
	cartItemKey: string,
	isPendingQuantity = true
) =>
	( {
		type: types.ITEM_PENDING_QUANTITY,
		cartItemKey,
		isPendingQuantity,
	} as const );

/**
 * Returns an action object to remove a cart item from the store.
 *
 * @param {string}  cartItemKey            Cart item to remove.
 * @param {boolean} [isPendingDelete=true] Flag for update state; true if API
 *                                         request is pending.
 */
export const itemIsPendingDelete = (
	cartItemKey: string,
	isPendingDelete = true
) =>
	( {
		type: types.RECEIVE_REMOVED_ITEM,
		cartItemKey,
		isPendingDelete,
	} as const );

/**
 * Returns an action object to mark the cart data in the store as stale.
 *
 * @param {boolean} [isCartDataStale=true] Flag to mark cart data as stale; true if
 *                                         lastCartUpdate timestamp is newer than the
 *                                         one in wcSettings.
 */
export const setIsCartDataStale = ( isCartDataStale = true ) =>
	( {
		type: types.SET_IS_CART_DATA_STALE,
		isCartDataStale,
	} as const );

/**
 * Returns an action object used to track when customer data is being updated
 * (billing and/or shipping).
 */
export const updatingCustomerData = ( isResolving: boolean ) =>
	( {
		type: types.UPDATING_CUSTOMER_DATA,
		isResolving,
	} as const );

/**
 * Returns an action object used to track whether the shipping rate is being
 * selected or not.
 *
 * @param {boolean} isResolving True if shipping rate is being selected.
 */
export const shippingRatesBeingSelected = ( isResolving: boolean ) =>
	( {
		type: types.UPDATING_SELECTED_SHIPPING_RATE,
		isResolving,
	} as const );

/**
 * Sets billing address locally, as opposed to updateCustomerData which sends it to the server.
 */
export const setBillingAddress = (
	billingAddress: Partial< BillingAddress >
) => ( { type: types.SET_BILLING_ADDRESS, billingAddress } as const );

/**
 * Sets shipping address locally, as opposed to updateCustomerData which sends it to the server.
 */
export const setShippingAddress = (
	shippingAddress: Partial< ShippingAddress >
) => ( { type: types.SET_SHIPPING_ADDRESS, shippingAddress } as const );

type Actions =
	| typeof itemIsPendingDelete
	| typeof itemIsPendingQuantity
	| typeof receiveApplyingCoupon
	| typeof receiveCartContents
	| typeof receiveCartItem
	| typeof receiveRemovingCoupon
	| typeof setBillingAddress
	| typeof setCartData
	| typeof setErrorData
	| typeof setIsCartDataStale
	| typeof setShippingAddress
	| typeof shippingRatesBeingSelected
	| typeof updatingCustomerData;

export type CartAction = ReturnOrGeneratorYieldUnion< Actions | Thunks >;
