/**
 * External dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { useState, useEffect, useMemo } from '@wordpress/element';
import { CART_STORE_KEY as storeKey } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import { useThrowError } from '../use-throw-error';

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
	const { selectShippingRate } = useDispatch( storeKey );
	const throwError = useThrowError();
	const selectedShippingRates = shippingRates
		.map(
			// the API responds with those keys.
			/* eslint-disable camelcase */
			( p ) => [
				p.package_id,
				p.shipping_rates.find( ( rate ) => rate.selected )?.rate_id,
			]
			/* eslint-enable */
		)
		// A fromEntries ponyfill, creates an object from an array of arrays.
		.reduce( ( obj, [ key, val ] ) => {
			if ( val ) {
				obj[ key ] = val;
			}
			return obj;
		}, {} );

	const isSelectingRate = useSelect( ( select ) => {
		return select( storeKey ).isShippingRateBeingSelected();
	}, [] );

	const setRate = ( newShippingRate, packageId ) => {
		selectShippingRate( newShippingRate, packageId ).catch( ( error ) => {
			// we throw this error because an error on selecting a rate
			// is problematic.
			throwError( error );
		} );
	};
	return {
		selectShippingRate: setRate,
		selectedShippingRates,
		isSelectingRate,
	};
};
