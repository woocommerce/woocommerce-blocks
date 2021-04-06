/**
 * External dependencies
 */
import defaultAddressFields from '@woocommerce/base-components/cart-checkout/address-form/default-address-fields';
import prepareAddressFields from '@woocommerce/base-components/cart-checkout/address-form/prepare-address-fields';

/**
 * pluckAddress takes a full address object and returns relevant fields for calculating
 * shipping, so we can track when one of them change to update rates.
 *
 * @param {Object} address          An object containing all address information
 * @param {string} address.country  The country.
 * @param {string} address.state    The state.
 * @param {string} address.city     The city.
 * @param {string} address.postcode The postal code.
 *
 * @return {Object} pluckedAddress  An object containing shipping address that are needed to fetch an address.
 */
export const pluckAddress = ( {
	country = '',
	state = '',
	city = '',
	postcode = '',
} ) => ( {
	country: country.trim(),
	state: state.trim(),
	city: city.trim(),
	postcode: postcode ? postcode.replace( ' ', '' ).toUpperCase() : '',
} );

/**
 * Removes fields from an address if they are hidden by the field config from core.
 *
 * @param {Object} address The address to remove fields from.
 * @return {Object} The address with hidden fields removed.
 */
export const emptyHiddenAddressFields = ( address ) => {
	const fields = Object.keys( defaultAddressFields );
	const addressFields = prepareAddressFields( fields, {}, address.country );
	const newAddress = {};
	addressFields
		.filter( ( field ) => ! field.hidden )
		.forEach( ( field ) => {
			newAddress[ field.key ] = address[ field.key ];
		} );

	return newAddress;
};
