/** @typedef { import('@woocommerce/type-defs/hooks').StoreCartItem } StoreCartItem */

/**
 * External dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { CART_STORE_KEY as storeKey } from '@woocommerce/block-data';
import { useDebounce } from 'use-debounce';

/**
 * Internal dependencies
 */
import { useStoreCart } from './use-store-cart';

/**
 * This is a custom hook for loading the Store API /cart/ endpoint and
 * actions for removing or changing item quantity.
 *
 * @see https://github.com/woocommerce/woocommerce-gutenberg-products-block/tree/master/src/RestApi/StoreApi
 *
 * @param {string} cartItemKey Key for a cart item.
 * @return {StoreCartItem} An object exposing data and actions relating to cart items.
 */
export const useStoreCartItem = ( cartItemKey ) => {
	const { cartItems, cartIsLoading } = useStoreCart();
	const cartItem = cartItems.find( ( item ) => item.key === cartItemKey );

	// Store quantity in hook state. This is used to keep the UI
	// updated while server request is updated.
	const [ quantity, changeQuantity ] = useState( cartItem?.quantity );
	const [ debouncedQuantity ] = useDebounce( quantity, 400 );

	const { removeItemFromCart, changeCartItemQuantity } = useDispatch(
		storeKey
	);
	const asyncChangeQuantity = ( newQuantity ) => {
		changeCartItemQuantity( cartItemKey, newQuantity );
	};
	const removeItem = () => {
		removeItemFromCart( cartItemKey );
	};

	// Observe debounced quantity value, fire action to update server when it changes.
	useEffect( () => {
		if ( cartItem?.quantity === debouncedQuantity ) return;
		asyncChangeQuantity( debouncedQuantity );
	}, [ debouncedQuantity ] );

	const isPending = useSelect(
		( select ) => {
			const store = select( storeKey );
			return store.isItemQuantityPending( cartItemKey );
		},
		[ cartItemKey ]
	);

	return {
		isPending,
		quantity,
		changeQuantity,
		removeItem,
		isLoading: cartIsLoading,
		cartItem,
	};
};
