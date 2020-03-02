/**
 * External dependencies
 */

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
 * This is a custom hook that is wired up to the `wc/store/collections` data
 * store for the `wc/store/cart/shipping-rates` route. Given a query object, this
 * will ensure a component is kept up to date with the shipping rates matching that
 * query in the store state.
 *
 * @return {Object} This hook will return an object with three properties:
 *                  - shippingRates        An array of shipping rate objects.
 *                  - shippingRatesLoading A boolean indicating whether the shipping
 *                                         rates are still loading or not.
 */
export const useShippingRates = () => {
	const { shippingRates } = useStoreCart();
	const results = useSelect( ( select, { dispatch } ) => {
		const store = select( storeKey );
		const shippingAddress = store.shippingAddress();
		const shippingRatesLoading = store.areShippingRatesLoading();
		const { updateShipping } = dispatch( storeKey );

		return {
			shippingAddress,
			shippingRatesLoading,
			updateShipping,
		};
	}, [] );

	return {
		shippingRates,
		...results,
	};
};
