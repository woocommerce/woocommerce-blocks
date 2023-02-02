/**
 * External dependencies
 */
import {
	CartShippingPackageShippingRate,
	CartShippingRate,
} from '@woocommerce/type-defs/cart';
import { getSetting } from '@woocommerce/settings';

/**
 * Get the number of packages in a shippingRates array.
 *
 * @param {Array} shippingRates Shipping rates and packages array.
 */
export const getShippingRatesPackageCount = (
	shippingRates: CartShippingRate[]
) => {
	return shippingRates.length;
};

const collectibleMethodIds = getSetting< string[] >(
	'collectibleMethodIds',
	[]
);

/**
 * If the package rate's method_id is in the collectibleMethodIds array, return true.
 */
export const isPackageRateCollectible = (
	rate: CartShippingPackageShippingRate
): boolean => collectibleMethodIds.includes( rate.method_id );

/**
 * Check if the specified rates are collectible. Accepts either an array of rate names, or a single string.
 */
export const hasCollectableRate = (
	chosenRates: string[] | string
): boolean => {
	if ( Array.isArray( chosenRates ) ) {
		return !! chosenRates.find( ( rate ) =>
			collectibleMethodIds.includes( rate )
		);
	}
	return collectibleMethodIds.includes( chosenRates );
};
/**
 * Get the number of rates in a shippingRates array.
 *
 * @param {Array} shippingRates Shipping rates and packages array.
 */
export const getShippingRatesRateCount = (
	shippingRates: CartShippingRate[]
) => {
	return shippingRates.reduce( function ( count, shippingPackage ) {
		return count + shippingPackage.shipping_rates.length;
	}, 0 );
};
