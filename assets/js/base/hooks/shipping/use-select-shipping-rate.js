/**
 * External dependencies
 */
import { useDispatch } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { CART_STORE_KEY as storeKey } from '@woocommerce/block-data';

/**
 * This is a custom hook for loading the selected shipping rate from the cart store and actions for selecting a rate.
See also: https://github.com/woocommerce/woocommerce-gutenberg-products-block/tree/master/src/RestApi/StoreApi
 *
 * @param {Array} shippingRates an array of packages with shipping rates.
 * @return {Object} This hook will return an object with two properties:
 * - selectShippingRate    A function that immediately returns the selected
 * rate and dispatches an action generator.
 * - selectedShippingRates An array of selected shipping rates, maintained
 * locally by a state and updated optimistically.
 */
export const useSelectShippingRate = ( shippingRates ) => {
	const initiallySelectedRates = Object.fromEntries(
		shippingRates.map(
			// the API responds with those keys.
			( p ) => [
				/* eslint-disable camelcase */
				p.package_id,
				// eslint-disable-next-line camelcase
				p.shipping_rates.find( ( rate ) => rate.selected )?.rate_id,
				/* eslint-enable */
			]
		)
	);
	const [ selectedShippingRates, setSelectedShipping ] = useState(
		initiallySelectedRates
	);
	const { selectShippingRate } = useDispatch( storeKey );
	const setRate = ( newShippingRate, packageId ) => {
		setSelectedShipping( {
			...selectedShippingRates,
			[ packageId ]: newShippingRate,
		} );
		selectShippingRate( newShippingRate, packageId );
	};
	return {
		selectShippingRate: setRate,
		selectedShippingRates,
	};
};
