/**
 * External dependencies
 */
import { CART_STORE_KEY as storeKey } from '@woocommerce/block-data';
import { useSelect } from '@wordpress/data';
import { Cart } from '@woocommerce/type-defs/cart';

type ShippingData = Pick<
	Cart,
	'shippingRates' | 'needsShipping' | 'hasCalculatedShipping'
> & { shippingRatesLoading: boolean };

export const useShippingData = (): ShippingData => {
	const {
		shippingRates,
		needsShipping,
		hasCalculatedShipping,
		shippingRatesLoading,
	} = useSelect( ( select ) => {
		const store = select( storeKey );
		return {
			shippingRates: store.getShippingRates(),
			needsShipping: store.getNeedsShipping(),
			hasCalculatedShipping: store.getHasCalculatedShipping(),
			shippingRatesLoading: store.isShippingRateBeingSelected(),
		};
	} );
	return {
		shippingRates,
		needsShipping,
		hasCalculatedShipping,
		shippingRatesLoading,
	};
};
