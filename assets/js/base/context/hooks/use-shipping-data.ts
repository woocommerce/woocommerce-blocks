/**
 * External dependencies
 */
import { CART_STORE_KEY as storeKey } from '@woocommerce/block-data';
import { useSelect } from '@wordpress/data';
import { Cart } from '@woocommerce/type-defs/cart';
import { SelectShippingRateType } from '@woocommerce/type-defs/shipping';
import { useEffect, useRef } from '@wordpress/element';
import { deriveSelectedShippingRates } from '@woocommerce/base-utils';
import isShallowEqual from '@wordpress/is-shallow-equal';
import { isObject } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import { useSelectShippingRate } from './shipping';

type ShippingData = Pick<
	Cart,
	'shippingRates' | 'needsShipping' | 'hasCalculatedShipping'
> & {
	shippingRatesLoading: boolean;
	selectedRates: Record< string, string | unknown >;
} & SelectShippingRateType;

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
	const { isSelectingRate, selectShippingRate } = useSelectShippingRate();

	// set selected rates on ref so it's always current.
	const selectedRates = useRef< Record< string, unknown > >( {} );
	useEffect( () => {
		const derivedSelectedRates = deriveSelectedShippingRates(
			shippingRates
		);
		if (
			isObject( derivedSelectedRates ) &&
			! isShallowEqual( selectedRates.current, derivedSelectedRates )
		) {
			selectedRates.current = derivedSelectedRates;
		}
	}, [ shippingRates ] );

	return {
		isSelectingRate,
		selectedRates: selectedRates.current,
		selectShippingRate,
		shippingRates,
		needsShipping,
		hasCalculatedShipping,
		shippingRatesLoading,
	};
};
