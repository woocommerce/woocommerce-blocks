/**
 * External dependencies
 */
import {
	Cart,
	CartResponse,
	ExtensionCartUpdateArgs,
	BillingAddressShippingAddress,
	ApiErrorResponse,
	isApiErrorResponse,
} from '@woocommerce/types';
import { camelCase, mapKeys } from 'lodash';
import {
	triggerAddedToCartEvent,
	triggerAddingToCartEvent,
} from '@woocommerce/base-utils';

/**
 * Internal dependencies
 */
import { apiFetchWithHeaders } from '../shared-controls';
import { notifyQuantityChanges } from './notify-quantity-changes';
import { notifyCartErrors } from './notify-errors';
import {
	CartDispatchFromMap,
	CartResolveSelectFromMap,
	CartSelectFromMap,
} from './index';

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
 * A thunk used in updating the store with cart errors retrieved from a request.
 */
export const receiveError =
	( response: ApiErrorResponse | null = null ) =>
	( { dispatch }: { dispatch: CartDispatchFromMap } ) => {
		if ( isApiErrorResponse( response ) ) {
			dispatch.setErrorData( response );

			if ( response.data?.cart ) {
				dispatch.receiveCart( response?.data?.cart );
			}
		}
	};

/**
 * POSTs to the /cart/extensions endpoint with the data supplied by the extension.
 *
 * @param {Object} args The data to be posted to the endpoint
 */
export const applyExtensionCartUpdate =
	( args: ExtensionCartUpdateArgs ) =>
	async ( { dispatch } ) => {
		try {
			const { response } = await apiFetchWithHeaders( {
				path: '/wc/store/v1/cart/extensions',
				method: 'POST',
				data: { namespace: args.namespace, data: args.data },
				cache: 'no-store',
			} );
			dispatch.receiveCart( response );
			return response;
		} catch ( error ) {
			dispatch.receiveError( error );
			return Promise.reject( error );
		}
	};

/**
 * Applies a coupon code and either invalidates caches, or receives an error if
 * the coupon cannot be applied.
 *
 * @param {string} couponCode The coupon code to apply to the cart.
 * @throws            Will throw an error if there is an API problem.
 */
export const applyCoupon =
	( couponCode: string ) =>
	async ( { dispatch } ) => {
		try {
			dispatch.receiveApplyingCoupon( couponCode );
			const { response } = await apiFetchWithHeaders( {
				path: '/wc/store/v1/cart/apply-coupon',
				method: 'POST',
				data: {
					code: couponCode,
				},
				cache: 'no-store',
			} );
			dispatch.receiveCart( response );
			return response;
		} catch ( error ) {
			dispatch.receiveError( error );
			return Promise.reject( error );
		} finally {
			dispatch.receiveApplyingCoupon( '' );
		}
	};

/**
 * Removes a coupon code and either invalidates caches, or receives an error if
 * the coupon cannot be removed.
 *
 * @param {string} couponCode The coupon code to remove from the cart.
 * @throws            Will throw an error if there is an API problem.
 */
export const removeCoupon =
	( couponCode: string ) =>
	async ( { dispatch } ) => {
		try {
			dispatch.receiveRemovingCoupon( couponCode );
			const { response } = await apiFetchWithHeaders( {
				path: '/wc/store/v1/cart/remove-coupon',
				method: 'POST',
				data: {
					code: couponCode,
				},
				cache: 'no-store',
			} );
			dispatch.receiveCart( response );
			return response;
		} catch ( error ) {
			dispatch.receiveError( error );
			return Promise.reject( error );
		} finally {
			dispatch.receiveRemovingCoupon( '' );
		}
	};

/**
 * Adds an item to the cart:
 * - Calls API to add item.
 * - If successful, yields action to add item from store.
 * - If error, yields action to store error.
 *
 * @param {number} productId    Product ID to add to cart.
 * @param {number} [quantity=1] Number of product ID being added to cart.
 * @throws           Will throw an error if there is an API problem.
 */
export const addItemToCart =
	( productId: number, quantity = 1 ) =>
	async ( { dispatch } ) => {
		try {
			triggerAddingToCartEvent();
			const { response } = await apiFetchWithHeaders( {
				path: `/wc/store/v1/cart/add-item`,
				method: 'POST',
				data: {
					id: productId,
					quantity,
				},
				cache: 'no-store',
			} );
			dispatch.receiveCart( response );
			triggerAddedToCartEvent( { preserveCartData: true } );
			return response;
		} catch ( error ) {
			dispatch.receiveError( error );
			return Promise.reject( error );
		}
	};

/**
 * Removes specified item from the cart:
 * - Calls API to remove item.
 * - If successful, yields action to remove item from store.
 * - If error, yields action to store error.
 * - Sets cart item as pending while API request is in progress.
 *
 * @param {string} cartItemKey Cart item being updated.
 */
export const removeItemFromCart =
	( cartItemKey: string ) =>
	async ( { dispatch }: { dispatch: CartDispatchFromMap } ) => {
		try {
			dispatch.itemIsPendingDelete( cartItemKey );
			const { response } = await apiFetchWithHeaders( {
				path: `/wc/store/v1/cart/remove-item`,
				data: {
					key: cartItemKey,
				},
				method: 'POST',
				cache: 'no-store',
			} );
			dispatch.receiveCart( response );
			return response;
		} catch ( error ) {
			dispatch.receiveError( error );
			return Promise.reject( error );
		} finally {
			dispatch.itemIsPendingDelete( cartItemKey, false );
		}
	};

/**
 * Persists a quantity change the for specified cart item:
 * - Calls API to set quantity.
 * - If successful, yields action to update store.
 * - If error, yields action to store error.
 *
 * @param {string} cartItemKey Cart item being updated.
 * @param {number} quantity    Specified (new) quantity.
 */
export const changeCartItemQuantity =
	(
		cartItemKey: string,
		quantity: number
		// eslint-disable-next-line @typescript-eslint/no-explicit-any -- unclear how to represent multiple different yields as type
	) =>
	async ( {
		dispatch,
		resolveSelect,
	}: {
		dispatch: CartDispatchFromMap;
		resolveSelect: CartResolveSelectFromMap;
	} ) => {
		const cartItem = await resolveSelect.getCartItem( cartItemKey );
		if ( cartItem?.quantity === quantity ) {
			return;
		}
		try {
			dispatch.itemIsPendingQuantity( cartItemKey );
			const { response } = await apiFetchWithHeaders( {
				path: '/wc/store/v1/cart/update-item',
				method: 'POST',
				data: {
					key: cartItemKey,
					quantity,
				},
				cache: 'no-store',
			} );
			dispatch.receiveCart( response );
			return response;
		} catch ( error ) {
			dispatch.receiveError( error );
			return Promise.reject( error );
		} finally {
			dispatch.itemIsPendingQuantity( cartItemKey, false );
		}
	};

/**
 * Selects a shipping rate.
 *
 * @param {string}          rateId      The id of the rate being selected.
 * @param {number | string} [packageId] The key of the packages that we will select within.
 */
export const selectShippingRate =
	( rateId: string, packageId = 0 ) =>
	async ( { dispatch }: { dispatch: CartDispatchFromMap } ) => {
		try {
			dispatch.shippingRatesBeingSelected( true );
			const { response } = await apiFetchWithHeaders( {
				path: `/wc/store/v1/cart/select-shipping-rate`,
				method: 'POST',
				data: {
					package_id: packageId,
					rate_id: rateId,
				},
				cache: 'no-store',
			} );
			dispatch.receiveCart( response );
			return response as CartResponse;
		} catch ( error ) {
			dispatch.receiveError( error );
			return Promise.reject( error );
		} finally {
			dispatch.shippingRatesBeingSelected( false );
		}
	};

/**
 * Updates the shipping and/or billing address for the customer and returns an updated cart.
 */
export const updateCustomerData =
	(
		// Address data to be updated; can contain both billing_address and shipping_address.
		customerData: Partial< BillingAddressShippingAddress >,
		// If the address is being edited, we don't update the customer data in the store from the response.
		editing = true
	) =>
	async ( { dispatch }: { dispatch: CartDispatchFromMap } ) => {
		try {
			dispatch.updatingCustomerData( true );
			const { response } = await apiFetchWithHeaders( {
				path: '/wc/store/v1/cart/update-customer',
				method: 'POST',
				data: customerData,
				cache: 'no-store',
			} );
			if ( editing ) {
				dispatch.receiveCartContents( response );
			} else {
				dispatch.receiveCart( response );
			}
			return response;
		} catch ( error ) {
			dispatch.receiveError( error );
			return Promise.reject( error );
		} finally {
			dispatch.updatingCustomerData( false );
		}
	};

export type Thunks =
	| typeof receiveCart
	| typeof receiveError
	| typeof addItemToCart
	| typeof applyCoupon
	| typeof changeCartItemQuantity
	| typeof removeCoupon
	| typeof removeItemFromCart
	| typeof selectShippingRate
	| typeof updateCustomerData;
