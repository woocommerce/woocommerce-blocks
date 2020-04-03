/**
 * External dependencies
 */
import { useMemo, useState, useEffect, useRef } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { find } from 'lodash';
import { useStoreCart } from '@woocommerce/base-hooks';
import { CART_STORE_KEY as storeKey } from '@woocommerce/block-data';

/**
 * @typedef {import('@woocommerce/type-defs/hooks').StoreCartItemAddToCart} StoreCartItemAddToCart
 */

/**
 * A custom hook for exposing cart related data for a given product id and an
 * action for adding a single quantity of the product _to_ the cart.
 *
 *
 * @param {number} productId  The product id to be added to the cart.
 *
 * @return {StoreCartItemAddToCart} An object exposing data and actions relating
 *                                  to add to cart functionality.
 */
export const useStoreAddToCart = ( productId ) => {
	const [ addingToCart, setAddingToCart ] = useState( false );
	const { cartItems, cartIsLoading } = useStoreCart();
	const currentCartItems = useRef( cartItems );
	const { addItemToCart } = useDispatch( storeKey );

	const addToCart = () => {
		setAddingToCart( true );
		addItemToCart( productId );
	};

	const cartQuantity = useMemo( () => {
		const productItem = find( currentCartItems.current, { id: productId } );
		return productItem ? productItem.quantity : 0;
	}, [ currentCartItems.current, productId ] );

	useEffect( () => {
		if ( currentCartItems.current !== cartItems ) {
			if ( addingToCart ) {
				setAddingToCart( false );
			}
			currentCartItems.current = cartItems;
		}
	}, [ cartItems, addingToCart ] );

	return {
		cartQuantity,
		addingToCart,
		cartIsLoading,
		addToCart,
	};
};
