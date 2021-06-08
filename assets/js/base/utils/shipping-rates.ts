/**
 * External dependencies
 */
import type { CartShippingRate } from '@woocommerce/type-defs/cart';

/**
 * Get the number of packages in a shippingRates array.
 *
 * @param {Array} shippingRates Shipping rates and packages array.
 */
export const getShippingRatesPackageCount = (
	shippingRates: CartShippingRate[]
): number => {
	return shippingRates.length;
};

/**
 * Get the number of rates in a shippingRates array.
 *
 * @param {Array} shippingRates Shipping rates and packages array.
 */
export const getShippingRatesRateCount = (
	shippingRates: CartShippingRate[]
): number => {
	return shippingRates.reduce( function ( count: number, shippingPackage ) {
		return count + shippingPackage.shippingRates.length;
	}, 0 );
};
