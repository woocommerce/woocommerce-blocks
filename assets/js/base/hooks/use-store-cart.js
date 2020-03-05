/** @typedef { import('@woocommerce/type-defs/hooks').StoreCart } StoreCart */

/**
 * External dependencies
 */
import { CART_STORE_KEY as storeKey } from '@woocommerce/block-data';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { useCheckoutContext } from '@woocommerce/base-context';

/**
 * @constant
 * @type  {StoreCart} Object containing cart data.
 */
const defaultCartData = {
	cartCoupons: [],
	cartItems: [],
	cartItemsCount: 0,
	cartItemsWeight: 0,
	cartNeedsShipping: true,
	cartTotals: {},
	cartIsLoading: true,
	cartErrors: [],
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
 * @return {StoreCart} Object containing cart data.
 */
export const useStoreCart = ( options = { shouldSelect: true } ) => {
	const { shouldSelect } = options;
	// get dispatcher from checkout context to record errors.
	const { dispatchActions } = useCheckoutContext();
	const results = useSelect(
		( select ) => {
			if ( ! shouldSelect ) {
				return defaultCartData;
			}
			const store = select( storeKey );
			const cartData = store.getCartData();
			const cartErrors = store.getCartErrors();
			const cartTotals = store.getCartTotals();
			const cartIsLoading = ! store.hasFinishedResolution(
				'getCartData'
			);

			return {
				cartCoupons: cartData.coupons,
				cartItems: cartData.items,
				cartItemsCount: cartData.itemsCount,
				cartItemsWeight: cartData.itemsWeight,
				cartNeedsShipping: cartData.needsShipping,
				cartTotals,
				cartIsLoading,
				cartErrors,
			};
		},
		[ shouldSelect ]
	);

	// React to loading and error status dispatch checkout status updates.
	// Note these are done separately to avoid unnecessary dispatches.
	useEffect( () => {
		return void ( results.cartErrors
			? dispatchActions.setHasError()
			: dispatchActions.clearError() );
	}, [ results.cartErrors ] );

	useEffect( () => {
		return void ( results.cartIsLoading
			? dispatchActions.incrementCalculating()
			: dispatchActions.decrementCalculating() );
	}, [ results.cartIsLoading ] );

	return results;
};
