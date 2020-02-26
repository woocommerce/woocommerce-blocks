/** @typedef { import('@woocommerce/type-defs/hooks').StoreCartItems } StoreCartItems */

/**
 * External dependencies
 */
import { useSelect } from '@wordpress/data';
import { CART_STORE_KEY as storeKey } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import { useStoreCart } from './use-store-cart';

/**
 * This is a custom hook for loading the Store API /cart/ endpoint and
 * actions for removing or changing item quantity.
 * See also: https://github.com/woocommerce/woocommerce-gutenberg-products-block/tree/master/src/RestApi/StoreApi
 *
 * @return {StoreCartItems} An object exposing data and actions relating to cart items.
 */
export const useStoreCartItems = () => {
	const { cartItems, cartIsLoading } = useStoreCart();

	const results = useSelect( ( select, { dispatch } ) => {
		const store = select( storeKey );
		const isItemQuantityPending = store.isItemQuantityPending.bind( store );
		const { removeItemFromCart } = dispatch( storeKey );

		return {
			isItemQuantityPending,
			removeItemFromCart,
		};
	}, [] );

	return {
		isLoading: cartIsLoading,
		cartItems,
		...results,
	};
};
