/**
 * External dependencies
 */
import { useCallback, useState, useEffect, useRef } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
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
	const currentCartIsLoading = useRef( null );
	const { cartCoupons, cartIsLoading } = useStoreCart();
	const [ applyingCoupon, setApplyingCoupon ] = useState( false );
	const [ removingCoupon, setRemovingCoupon ] = useState( false );
	const {
		applyCoupon: dispatchApplyCoupon,
		removeCoupon: dispatchRemoveCoupon,
	} = useDispatch( storeKey );

	const applyCoupon = useCallback( ( couponCode ) => {
		setApplyingCoupon( true );
		dispatchApplyCoupon( couponCode );
	}, [] );

	const removeCoupon = useCallback( ( couponCode ) => {
		setRemovingCoupon( true );
		dispatchRemoveCoupon( couponCode );
	}, [] );

	useEffect( () => {
		if ( currentCartIsLoading.current !== cartIsLoading ) {
			if ( ! cartIsLoading && applyingCoupon ) {
				setApplyingCoupon( false );
			}
			if ( ! cartIsLoading && removingCoupon ) {
				setRemovingCoupon( false );
			}
			currentCartIsLoading.current = cartIsLoading;
		}
	}, [ cartIsLoading, applyingCoupon, removingCoupon ] );

	return {
		appliedCoupons: cartCoupons,
		isLoading: cartIsLoading,
		applyCoupon,
		removeCoupon,
		applyingCoupon,
		removingCoupon,
	};
};
