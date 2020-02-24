/** @typedef { import('@woocommerce/type-defs/hooks').StoreCartCoupon } StoreCartCoupon */

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
 * @return {StoreCartCoupon} An object exposing data and actions from/for the
 * store api /cart/coupons endpoint.
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
