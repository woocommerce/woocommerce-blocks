/**
 * Searches an array of packages/rates to see if there are actually any rates
 * available.
 *
 * @param {Array} shippingRatePackages An array of packages and rates.
 * @return {boolean} True if a rate exists.
 */
const hasShippingRate = ( shippingRatePackages ) => {
	let foundRate = false;

	shippingRatePackages.forEach( ( shippingRatePackage ) => {
		if ( shippingRatePackage.shipping_rates.length ) {
			foundRate = true;
		}
	} );

	return foundRate;
};

export default hasShippingRate;
