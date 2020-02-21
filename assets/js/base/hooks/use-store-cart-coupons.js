/**
 * External dependencies
 */
import { useRef } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { CART_STORE_KEY as storeKey } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import { useStoreCart } from './use-store-cart';

/**
 * This is a custom hook for loading the Store API /cart/coupons endpoint and an
 * action for adding a coupon _to_ the cart.
 * See also: https://github.com/woocommerce/woocommerce-gutenberg-products-block/tree/master/src/RestApi/StoreApi
 *
 * @return {Object} This hook will return an object with these properties:
 *                  - appliedCoupons List of applied coupons from the API.
 *                  - isLoading True when coupon data is being loaded.
 *                  - applyCoupon Callback for applying a coupon by code.
 *                  - applyingCoupon True when a coupon is being applied.
 */
export const useStoreCartCoupons = () => {
	const { cartCoupons, cartIsLoading } = useStoreCart();
	const currentResults = useRef( {
		appliedCoupons: cartCoupons,
		isLoading: cartIsLoading,
		applyCoupon: () => {},
		removeCoupon: () => {},
		applyingCoupon: '',
		removingCoupon: '',
	} );

	const results = useSelect( ( select, { dispatch } ) => {
		const store = select( storeKey );
		const applyingCoupon = store.getApplyingCoupon();
		const removingCoupon = store.getRemovingCoupon();
		const { applyCoupon, removeCoupon } = dispatch( storeKey );

		return {
			appliedCoupons: cartCoupons,
			isLoading: cartIsLoading,
			applyCoupon,
			removeCoupon,
			applyingCoupon,
			removingCoupon,
		};
	}, [] );
	// if selector was not bailed, then update current results. Otherwise return
	// previous results
	if ( results !== null ) {
		currentResults.current = results;
	}
	return currentResults.current;
};
