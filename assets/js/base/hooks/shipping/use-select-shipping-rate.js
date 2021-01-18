/**
 * External dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { useState, useEffect, useRef, useCallback } from '@wordpress/element';
import { CART_STORE_KEY as storeKey } from '@woocommerce/block-data';
import isShallowEqual from '@wordpress/is-shallow-equal';

/**
 * Internal dependencies
 */
import { useThrowError } from '../use-throw-error';

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

	// Selected rates are stored in state.
	const [ selectedShippingRates, setSelectedShipping ] = useState( () => {
		console.log( 'inital' );
		return deriveSelectedRates( shippingRates );
	} );

	// This ref is used to track when changes come in via the props.
	const currentSelectedRates = useRef( selectedShippingRates );

	// When the incoming shipping rates change, update our local state if there are changes to selected methods.
	useEffect( () => {
		const newSelectedRates = deriveSelectedRates( shippingRates );
		if (
			! isShallowEqual( currentSelectedRates.current, newSelectedRates )
		) {
			currentSelectedRates.current = newSelectedRates;
			setSelectedShipping( newSelectedRates );
		}
	}, [ shippingRates ] );

	// Tracks when rates are currently resolving.
	const isSelectingRate = useSelect( ( select ) => {
		return select( storeKey ).isShippingRateBeingSelected();
	}, [] );

	const { selectShippingRate } = useDispatch( storeKey );

	// Sets a rate for a package in state (so changes are shown right away to consumers of the hook) and in the stores.
	const setRate = useCallback(
		( newShippingRate, packageId ) => {
			setSelectedShipping( {
				...selectedShippingRates,
				[ packageId ]: newShippingRate,
			} );
			selectShippingRate( newShippingRate, packageId ).catch(
				( error ) => {
					// we throw this error because an error on selecting a rate is problematic.
					throwError( error );
				}
			);
		},
		[ selectedShippingRates, throwError, selectShippingRate ]
	);

	return {
		selectShippingRate: setRate,
		selectedShippingRates,
		isSelectingRate,
	};
};
