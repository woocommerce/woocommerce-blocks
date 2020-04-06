/**
 * External dependencies
 */
import { select } from '@wordpress/data-controls';

/**
 * Internal dependencies
 */
import { ACTION_TYPES as types } from './action-types';
import { STORE_KEY as CART_STORE_KEY } from './constants';
import { apiFetchWithHeaders } from '../shared-controls';

/**
 * Returns an action object used in updating the store with the provided items
 * retrieved from a request using the given querystring.
 *
 * This is a generic response action.
 *
 * @param {Object}   [response={}]    An object containing the response from the
 *                                    request.
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
 * @param {Object}  [error={}]     An error object containing the error message
 *                                 and response code.
 * @param {boolean} [replace=true] Should existing errors be replaced, or should
 *                                 the error be appended.
 * @return {Object} Object for action.
 */
export function receiveError( error = {}, replace = true ) {
	return {
		type: replace ? types.REPLACE_ERRORS : types.RECEIVE_ERROR,
		error,
	};
}

/**
 * Returns an action object used to track when a coupon is applying.
 *
 * @param {string} [couponCode] Coupon being added.
 * @return {Object} Object for action.
 */
export function receiveApplyingCoupon( couponCode ) {
	return {
		type: types.APPLYING_COUPON,
		couponCode,
	};
}

/**
 * Returns an action object used to track when a coupon is removing.
 *
 * @param {string} [couponCode] Coupon being removed.
 * @return {Object} Object for action.
 */
export function receiveRemovingCoupon( couponCode ) {
	return {
		type: types.REMOVING_COUPON,
		couponCode,
	};
}

/**
 * Returns an action object for updating a single cart item in the store.
 *
 * @param {Object}   [response={}]    A cart item API response.
 * @return {Object} Object for action.
 */
export function receiveCartItem( response = {} ) {
	return {
		type: types.RECEIVE_CART_ITEM,
		cartItem: response,
	};
}

/**
 * Returns an action object to indicate if the specified cart item
 * is being removing.
 *
 * @param {boolean} isPendingDelete Flag for update state; true if API request is pending.
 * @param {string} cartItemKey Cart item being deleted.
 * @return {Object} Object for action.
 */
export function itemPendingDelete( isPendingDelete, cartItemKey ) {
	return {
		type: types.ITEM_PENDING_DELETE,
		isPendingDelete,
		cartItemKey,
	};
}

/**
 * Returns an action object to remove a cart item from the store.
 *
 * @param {string} cartItemKey Cart item to remove.
 * @return {Object} Object for action.
 */
export function receiveRemovedItem( cartItemKey ) {
	return {
		type: types.RECEIVE_REMOVED_ITEM,
		cartItemKey,
	};
}

/**
 * Returns an action object used to track what shipping address are we updating to.
 *
 * @param {boolean} isResolving if we're loading shipping address or not.
 * @return {Object} Object for action.
 */
export function shippingRatesAreResolving( isResolving ) {
	return {
		type: types.UPDATING_SHIPPING_ADDRESS,
		isResolving,
	};
}

/**
 * Returns an action object used to track whether the shipping rate is being
 * selected or not.
 *
 * @param {boolean} isResolving True if shipping rate is being selected.
 *
 * @return {Object} Action object.
 */
export function shippingRatesBeingSelected( isResolving ) {
	return {
		type: types.UPDATING_SELECTED_SHIPPING_RATE,
		isResolving,
	};
}

/**
 * Applies a coupon code and either invalidates caches, or receives an error if
 * the coupon cannot be applied.
 *
 * @throws Will throw an error if there is an API problem.
 * @param {string} couponCode The coupon code to apply to the cart.
 */
export function* applyCoupon( couponCode ) {
	yield receiveApplyingCoupon( couponCode );

	try {
		const { response } = yield apiFetchWithHeaders( {
			path: '/wc/store/cart/apply-coupon',
			method: 'POST',
			data: {
				code: couponCode,
			},
			cache: 'no-store',
		} );

		yield receiveCart( response );
		yield receiveApplyingCoupon( '' );
	} catch ( error ) {
		// Store the error message in state.
		yield receiveError( error );
		// Re-throw the error.
		throw error;
	}

	return true;
}

/**
 * Removes a coupon code and either invalidates caches, or receives an error if
 * the coupon cannot be removed.
 *
 * @throws Will throw an error if there is an API problem.
 * @param {string} couponCode The coupon code to remove from the cart.
 */
export function* removeCoupon( couponCode ) {
	yield receiveRemovingCoupon( couponCode );

	try {
		const { response } = yield apiFetchWithHeaders( {
			path: '/wc/store/cart/remove-coupon',
			method: 'POST',
			data: {
				code: couponCode,
			},
			cache: 'no-store',
		} );

		yield receiveCart( response );
		yield receiveRemovingCoupon( '' );
	} catch ( error ) {
		// Store the error message in state.
		yield receiveError( error );
		// Finished handling the coupon.
		yield receiveRemovingCoupon( '' );
		// Re-throw the error.
		throw error;
	}

	return true;
}

/**
 * Adds an item to the cart:
 * - Calls API to add item.
 * - If successful, yields action to add item from store.
 * - If error, yields action to store error.
 *
 * @param {number} productId Product ID to add to cart.
 * @param {number} quantity Number of product ID being added to cart.
 */
export function* addItemToCart( productId, quantity = 1 ) {
	try {
		const { response } = yield apiFetchWithHeaders( {
			path: `/wc/store/cart/add-item`,
			method: 'POST',
			data: {
				id: productId,
				quantity,
			},
			cache: 'no-store',
		} );

		yield receiveCart( response );
	} catch ( error ) {
		yield receiveError( error );
	}
}

/**
 * Removes specified item from the cart:
 * - Calls API to remove item.
 * - If successful, yields action to remove item from store.
 * - If error, yields action to store error.
 * - Sets cart item as pending while API request is in progress.
 *
 * @param {string} cartItemKey Cart item being updated.
 */
export function* removeItemFromCart( cartItemKey ) {
	yield itemPendingDelete( true, cartItemKey );

	try {
		const { response } = yield apiFetchWithHeaders( {
			path: `/wc/store/cart/remove-item/?key=${ cartItemKey }`,
			method: 'POST',
			cache: 'no-store',
		} );

		yield receiveCart( response );
	} catch ( error ) {
		yield receiveError( error );
	}

	yield itemPendingDelete( false, cartItemKey );
}

/**
 * Persists a quantity change the for specified cart item:
 * - Calls API to set quantity.
 * - If successful, yields action to update store.
 * - If error, yields action to store error.
 *
 * @param {string} cartItemKey Cart item being updated.
 * @param {number} quantity Specified (new) quantity.
 */
export function* changeCartItemQuantity( cartItemKey, quantity ) {
	const cartItem = yield select( CART_STORE_KEY, 'getCartItem', cartItemKey );

	if ( cartItem?.quantity === quantity ) {
		return;
	}
	try {
		const { response } = yield apiFetchWithHeaders( {
			path: '/wc/store/cart/update-item',
			method: 'POST',
			data: {
				key: cartItemKey,
				quantity,
			},
			cache: 'no-store',
		} );

		yield receiveCart( response );
	} catch ( error ) {
		yield receiveError( error );
	}
}

/**
 * Selects a shipping rate.
 *
 * @param {string} rateId the id of the rate being selected.
 * @param {number} [packageId] the key of the packages that we will select within.
 */
export function* selectShippingRate( rateId, packageId = 0 ) {
	try {
		yield shippingRatesBeingSelected( true );
		const { response } = yield apiFetchWithHeaders( {
			path: `/wc/store/cart/select-shipping-rate/${ packageId }`,
			method: 'POST',
			data: {
				rate_id: rateId,
			},
			cache: 'no-store',
		} );

		yield receiveCart( response );
	} catch ( error ) {
		yield receiveError( error );
		yield shippingRatesBeingSelected( false );
		// Re-throw the error.
		throw error;
	}
	yield shippingRatesBeingSelected( false );
	return true;
}

/**
 * Applies a coupon code and either invalidates caches, or receives an error if
the coupon cannot be applied.
 *
 * @param {Object} address shipping address to be updated
 */
export function* updateShippingAddress( address ) {
	yield shippingRatesAreResolving( true );
	try {
		const { response } = yield apiFetchWithHeaders( {
			path: '/wc/store/cart/update-shipping',
			method: 'POST',
			data: address,
			cache: 'no-store',
		} );

		yield receiveCart( response );
	} catch ( error ) {
		yield receiveError( error );
		yield shippingRatesAreResolving( false );
		// rethrow error.
		throw error;
	}
	yield shippingRatesAreResolving( false );
	return true;
}
