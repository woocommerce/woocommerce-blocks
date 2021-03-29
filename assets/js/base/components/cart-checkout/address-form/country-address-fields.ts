/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { getSetting } from '@woocommerce/settings';

/**
 * Internal dependencies
 */
import type {
	AddressFields,
	AddressField,
} from '../../../../type-defs/customer';

type CoreLocaleSettings = Record<
	string,
	Record< keyof AddressFields, AddressField >
>;

/**
 * This is locale data from WooCommerce countries class. This doesn't match the shape of the new field data blocks uses,
 * but we can import part of it to set which fields are required.
 *
 * This supports new properties such as optionalLabel which are not used by core (yet).
 */
const coreLocale: CoreLocaleSettings = getSetting( 'countryLocale', {} );

/**
 * Get supported props from the core locale and map to the correct format.
 *
 * Ignores "class", "type", "placeholder", and "autocomplete"--blocks handles these visual elements.
 *
 * @param {Object} localeField Locale fields from WooCommerce.
 * @return {Object} Supported locale fields.
 */
const getSupportedProps = (
	localeField: AddressField
): Partial< AddressField > => {
	const fields: Partial< AddressField > = {};

	if ( localeField.label !== undefined ) {
		fields.label = localeField.label;
	}

	if ( localeField.required !== undefined ) {
		fields.required = localeField.required;
	}

	if ( localeField.hidden !== undefined ) {
		fields.hidden = localeField.hidden;
	}

	if ( localeField.label !== undefined && ! localeField.optionalLabel ) {
		fields.optionalLabel = sprintf(
			/* translators: %s Field label. */
			__( '%s (optional)', 'woo-gutenberg-products-block' ),
			localeField.label
		);
	}

	if ( localeField.priority ) {
		fields.index =
			typeof localeField.priority === 'string'
				? parseInt( localeField.priority, 10 )
				: localeField.priority;
	}

	if ( localeField.hidden === true ) {
		fields.required = false;
	}

	return fields;
};

const coreAddressFieldConfig = Object.entries( coreLocale )
	.map( ( [ country, countryLocale ] ) => [
		country,
		Object.entries< AddressField >( countryLocale )
			.map( ( [ localeFieldKey, localeField ] ) => [
				localeFieldKey,
				getSupportedProps( localeField ),
			] )
			.reduce< AddressField >( ( obj, [ key, val ] ) => {
				obj[ key ] = val;
				return obj;
			}, Object.assign( {} ) ),
	] )
	.reduce( ( obj, [ key, val ] ) => {
		obj[ key ] = val;
		return obj;
	}, Object.assign( {} ) );

export default coreAddressFieldConfig;
