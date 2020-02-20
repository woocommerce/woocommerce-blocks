/**
 * External dependencies
 */
import { useCallback, useState, useEffect, useRef } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { COLLECTIONS_STORE_KEY as storeKey } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import { useCollection } from './use-collection';

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
	const collectionOptions = {
		namespace: '/wc/store',
		resourceName: 'cart/coupons',
	};

	const { results: appliedCoupons, isLoading } = useCollection(
		collectionOptions
	);

	const currentAppliedCoupons = useRef( null );
	const [ applyingCoupon, setApplyingCoupon ] = useState( false );
	const { __experimentalPersistItemToCollection } = useDispatch( storeKey );

	const applyCoupon = useCallback(
		( couponCode ) => {
			setApplyingCoupon( true );
			// exclude this item from the cartResults for adding to the new
			// collection (so it's updated correctly!)
			const collection = appliedCoupons.filter( ( coupon ) => {
				return coupon.code !== couponCode;
			} );
			__experimentalPersistItemToCollection(
				'/wc/store',
				'cart/coupons',
				collection,
				{ code: couponCode }
			);
		},
		[ appliedCoupons ]
	);

	useEffect( () => {
		if ( currentAppliedCoupons.current !== appliedCoupons ) {
			if ( applyingCoupon ) {
				setApplyingCoupon( false );
			}
			currentAppliedCoupons.current = appliedCoupons;
		}
	}, [ appliedCoupons, applyingCoupon ] );

	return {
		appliedCoupons,
		isLoading,
		applyCoupon,
		applyingCoupon,
	};
};
