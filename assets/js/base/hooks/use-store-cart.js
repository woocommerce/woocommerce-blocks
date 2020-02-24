/**
 * External dependencies
 */
import { CART_STORE_KEY as storeKey } from '@woocommerce/block-data';
import { useSelect } from '@wordpress/data';

const defaultStoreCartData = {
	cartCoupons: [],
	cartItems: [],
	cartItemsCount: 0,
	cartItemsWeight: 0,
	cartNeedsShipping: true,
	cartTotals: [],
	cartIsLoading: true,
};

/**
 * This is a custom hook that is wired up to the `wc/store/cart` data
 * store.
 *
 * @param {Object} options                An object declaring the various
 *                                        collection arguments.
 * @param {boolean} options.shouldSelect  If false, the previous results will be
 *                                        returned and internal selects will not
 *                                        fire.
 *
 * @return {Object} This hook will return an object with two properties:
 *                  - cartData  An array of cart data returned.
 *                  - isLoading A boolean indicating whether the cart is
 *                              loading (true) or not.
 */
export const useStoreCart = ( options = { shouldSelect: true } ) => {
	const { shouldSelect } = options;

	const results = useSelect(
		( select ) => {
			if ( ! shouldSelect ) {
				return null;
			}
			const store = select( storeKey );
			const cartData = store.getCartData();
			const cartIsLoading = ! store.hasFinishedResolution(
				'getCartData'
			);

			return {
				cartCoupons: cartData.coupons,
				cartItems: cartData.items,
				cartItemsCount: cartData.itemsCount,
				cartItemsWeight: cartData.itemsWeight,
				cartNeedsShipping: cartData.needsShipping,
				cartTotals: store.getCartTotals(),
				cartIsLoading,
				cartErrors: cartData.errors,
			};
		},
		[ shouldSelect ]
	);
	if ( results === null ) {
		return defaultStoreCartData;
	}
	return results;
};
