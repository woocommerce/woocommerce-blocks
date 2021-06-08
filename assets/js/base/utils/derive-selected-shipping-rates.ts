/**
 * External dependencies
 */
import { CartShippingRate } from '@woocommerce/type-defs/cart';

/**
 * Internal dependencies
 */
import { fromEntriesPolyfill } from './from-entries-polyfill';

/**
 * Get an array of selected shipping rates keyed by Package ID.
 *
 * @param {Array} shippingRates Array of shipping rates.
 * @return {Object} Object containing the package IDs and selected rates in the format: { [packageId:string]: rateId:string }
 */
export const deriveSelectedShippingRates = (
	shippingRates: CartShippingRate[]
) =>
	fromEntriesPolyfill(
		shippingRates.map( ( { packageId, shippingRates: packageRates } ): [
			string,
			unknown
		] => [
			packageId.toString(),
			packageRates.find( ( rate ) => rate.selected )?.rate_id,
		] )
	);
