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
 */
export const useStoreCartItems = () => {
	const { cartItems, cartIsLoading } = useStoreCart();

	const results = useSelect( ( select, { dispatch } ) => {
		const { removeItemFromCart } = dispatch( storeKey );

		return {
			removeItemFromCart,
		};
	}, [] );

	return {
		isLoading: cartIsLoading,
		cartItems,
		...results,
	};
};
