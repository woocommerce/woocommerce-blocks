/**
 * External dependencies
 */
import { CartShippingRate } from '@woocommerce/type-defs/cart';

/**
 * Searches an array of packages/rates to see if there are actually any rates
 * available.
 *
 * @param {Array} shippingRatePackages An array of packages and rates.
 * @return {boolean} True if a rate exists.
 */
const hasShippingRate = (
	shippingRatePackages: CartShippingRate[]
): boolean => {
	return shippingRatePackages.some(
		( shippingRatePackage ) => shippingRatePackage.shippingRates.length
	);
};

export default hasShippingRate;
