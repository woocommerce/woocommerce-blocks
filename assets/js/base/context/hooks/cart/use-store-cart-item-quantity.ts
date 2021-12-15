/**
 * External dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { useCallback, useState, useEffect } from '@wordpress/element';
import { CART_STORE_KEY as storeKey } from '@woocommerce/block-data';
import { useDebouncedCallback } from 'use-debounce';
import { triggerFragmentRefresh } from '@woocommerce/base-utils';
import {
	CartItem,
	StoreCartItemQuantity,
	isNumber,
	isObject,
	isString,
	objectHasProp,
} from '@woocommerce/types';

/**
 * Internal dependencies
 */
import { useStoreCart } from './use-store-cart';
import { useCheckoutContext } from '../../providers/cart-checkout';

/**
 * Ensures the object passed has props key: string and quantity: number
 */
const cartItemHasQuantityAndKey = (
	cartItem: unknown /* Object that may have quantity and key */
): cartItem is Partial< CartItem > =>
	isObject( cartItem ) &&
	objectHasProp( cartItem, 'key' ) &&
	objectHasProp( cartItem, 'quantity' ) &&
	isString( cartItem.key ) &&
	isNumber( cartItem.quantity );

/**
 * This is a custom hook for loading the Store API /cart/ endpoint and actions for removing or changing item quantity.
 *
 * @see https://github.com/woocommerce/woocommerce-gutenberg-products-block/tree/trunk/src/RestApi/StoreApi
 *
 * @param {CartItem} cartItem      The cartItem to get quantity info from and will have quantity updated on.
 * @return {StoreCartItemQuantity} An object exposing data and actions relating to cart items.
 */
export const useStoreCartItemQuantity = (
	cartItem: CartItem | Record< string, unknown >
): StoreCartItemQuantity => {
	const verifiedCartItem = { key: '', quantity: 1 };

	if ( cartItemHasQuantityAndKey( cartItem ) ) {
		verifiedCartItem.key = cartItem.key;
		verifiedCartItem.quantity = cartItem.quantity;
	}
	const { key, quantity } = verifiedCartItem;
	const { cartErrors } = useStoreCart();
	const { dispatchActions } = useCheckoutContext();

	const {
		removeItemFromCart,
		changeCartItemQuantity,
		editCartItemQuantity,
	} = useDispatch( storeKey );

	const debounced = useDebouncedCallback( changeCartItemQuantity, 400 );
	// Track when things are already pending updates.
	const isPending = useSelect(
		( select ) => {
			if ( ! key ) {
				return {
					quantity: false,
					delete: false,
				};
			}
			const store = select( storeKey );
			return {
				quantity: store.isItemPendingQuantity( key ),
				delete: store.isItemPendingDelete( key ),
			};
		},
		[ key ]
	);

	const removeItem = useCallback( () => {
		return key
			? removeItemFromCart( key ).then( () => {
					triggerFragmentRefresh();
					return true;
			  } )
			: Promise.resolve( false );
	}, [ key, removeItemFromCart ] );

	const setQuantity = useCallback(
		( newQuantity ) => {
			debounced( key, newQuantity );
			editCartItemQuantity( key, newQuantity );
		},
		[ editCartItemQuantity, debounced, key ]
	);
	/*
	// Observe debounced quantity value, fire action to update server on change.
	useEffect( () => {
		if (
			key &&
			isNumber( previousDebouncedQuantity ) &&
			Number.isFinite( previousDebouncedQuantity ) &&
			previousDebouncedQuantity !== debouncedQuantity
		) {
			changeCartItemQuantity( key, debouncedQuantity );
		}
	}, [
		key,
		changeCartItemQuantity,
		debouncedQuantity,
		previousDebouncedQuantity,
	] );
*/
	useEffect( () => {
		if ( isPending.delete ) {
			dispatchActions.incrementCalculating();
		} else {
			dispatchActions.decrementCalculating();
		}
		return () => {
			if ( isPending.delete ) {
				dispatchActions.decrementCalculating();
			}
		};
	}, [ dispatchActions, isPending.delete ] );

	useEffect( () => {
		if ( isPending.quantity ) {
			dispatchActions.incrementCalculating();
		} else {
			dispatchActions.decrementCalculating();
		}
		return () => {
			if ( isPending.quantity ) {
				dispatchActions.decrementCalculating();
			}
		};
	}, [ dispatchActions, isPending.quantity ] );

	return {
		isPendingDelete: isPending.delete,
		quantity,
		setItemQuantity: setQuantity,
		removeItem,
		cartItemQuantityErrors: cartErrors,
	};
};
