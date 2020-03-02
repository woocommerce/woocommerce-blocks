/** @typedef { import('@woocommerce/type-defs/hooks').StoreCartCoupon } StoreCartCoupon */

/**
 * External dependencies
 */
import { useSelect } from '@wordpress/data';
import { CART_STORE_KEY as storeKey } from '@woocommerce/block-data';
import { useStoreNoticesContext } from '@woocommerce/base-context/store-notices-context';

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
	const { context } = useStoreNoticesContext();

	const results = useSelect(
		( select, { dispatch } ) => {
			const store = select( storeKey );
			const isApplyingCoupon = store.isApplyingCoupon();
			const isRemovingCoupon = store.isRemovingCoupon();
			const { applyCoupon, removeCoupon } = dispatch( storeKey );

			const applyCouponWithContext = ( couponCode ) => {
				applyCoupon( couponCode )
					.then( ( result ) => {
						if ( result === true ) {
							dispatch( 'core/notices' ).createNotice(
								'success',
								'Applied coupon',
								{ context }
							);
						}
					} )
					.catch( ( error ) => {
						dispatch( 'core/notices' ).createNotice(
							'error',
							error.message,
							{ context }
						);
					} );
			};

			const removeCouponWithContext = ( couponCode ) => {
				removeCoupon( couponCode )
					.then( ( result ) => {
						if ( result === true ) {
							dispatch( 'core/notices' ).createNotice(
								'info',
								'Removed coupon',
								{ context }
							);
						}
					} )
					.catch( ( error ) => {
						dispatch( 'core/notices' ).createNotice(
							'error',
							error.message,
							{ context }
						);
					} );
			};

			return {
				applyCoupon: applyCouponWithContext,
				removeCoupon: removeCouponWithContext,
				isApplyingCoupon,
				isRemovingCoupon,
			};
		},
		[ context ]
	);

	return {
		appliedCoupons: cartCoupons,
		isLoading: cartIsLoading,
		...results,
	};
};
