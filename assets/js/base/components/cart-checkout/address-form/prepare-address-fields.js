/** @typedef { import('@woocommerce/type-defs/address-fields').CountryAddressFields } CountryAddressFields */

/**
 * External dependencies
 */
import { merge } from 'lodash';

/**
 * Internal dependencies
 */
import defaultAddressFields from './default-address-fields';
import countryAddressFields from './country-address-fields';

/**
 * Combines address fields, including fields from the locale, and sorts them by index.
 *
 * This uses lodash merge rather than the spread operator because we want to merge address field data rather than overwrite it, if overrides are used.
 *
 * @param {Object} fieldConfig Field config contains field specific overrides at block level which may, for example, hide a field.
 * @param {string} addressCountry Address country code. If unknown, locale fields will not be merged.
 * @return {CountryAddressFields} Object containing address fields.
 */
const prepareAddressFields = ( fieldConfig, addressCountry = '' ) => {
	const countryLocale =
		addressCountry && countryAddressFields[ addressCountry ] !== undefined
			? countryAddressFields[ addressCountry ]
			: {};
	const mergedAddressFields = merge(
		defaultAddressFields,
		countryLocale,
		fieldConfig
	);
	return mergedAddressFields.sort( ( a, b ) => a.index - b.index );
};

export default prepareAddressFields;
