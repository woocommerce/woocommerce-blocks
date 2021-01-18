/**
 * External dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { CART_STORE_KEY as storeKey } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import { useThrowError } from '../use-throw-error';
import { useShallowEqual } from '../use-shallow-equal';

/**
 * Selected rates are derived by looping over the shipping rates. The selected rates will have a true selected prop.
 *
 * @param {Array} shippingRates of shipping rates.
 */
const deriveSelectedRates = ( shippingRates ) =>
	shippingRates
		.map( ( { package_id: packageId, shipping_rates: packageRates } ) => [
			packageId,
			packageRates.find( ( rate ) => rate.selected )?.rate_id,
		] )
		// A fromEntries ponyfill, creates an object from an array of arrays.
		.reduce( ( obj, [ key, val ] ) => {
			if ( val ) {
				obj[ key ] = val;
			}
			return obj;
		}, {} );

/**
 * This is a custom hook for loading the selected shipping rate from the cart store and actions for selecting a rate.
See also: https://github.com/woocommerce/woocommerce-gutenberg-products-block/tree/trunk/src/RestApi/StoreApi
 *
 * @param {Array} shippingRates an array of packages with shipping rates.
 * @return {Object} This hook will return an object with two properties:
 * - selectShippingRate    A function that immediately returns the selected
 * rate and dispatches an action generator.
 * - selectedShippingRates An object of selected shipping rates and package id as key, maintained
 * locally by a state and updated optimistically, this will only return packages that has selected
 * shipping rates.
 *
 */
export const useSelectShippingRate = ( shippingRates ) => {
	const throwError = useThrowError();
	const currentShippingRates = useShallowEqual( shippingRates );
	const { selectShippingRate } = useDispatch( storeKey );

	// Selected rates are stored in state.
	const [ selectedShippingRates, setSelectedShipping ] = useState( () =>
		deriveSelectedRates( currentShippingRates )
	);

	// When the incoming shipping rates change, update our local state.
	useEffect( () => {
		setSelectedShipping( deriveSelectedRates( currentShippingRates ) );
	}, [ currentShippingRates ] );

	// Selects if rates are currently resolving.
	const isSelectingRate = useSelect( ( select ) => {
		return select( storeKey ).isShippingRateBeingSelected();
	}, [] );

	// Sets a rate for a package in state (so changes are shown right away to consumers of the hook) and in the stores.
	const setRate = ( newShippingRate, packageId ) => {
		setSelectedShipping( {
			...selectedShippingRates,
			[ packageId ]: newShippingRate,
		} );
		selectShippingRate( newShippingRate, packageId ).catch( ( error ) => {
			// we throw this error because an error on selecting a rate is problematic.
			throwError( error );
		} );
	};

	return {
		selectShippingRate: setRate,
		selectedShippingRates,
		isSelectingRate,
	};
};
