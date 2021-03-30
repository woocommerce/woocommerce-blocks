/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import type {
	AddressFields as AddressFieldsType,
	AddressFieldConfiguration,
} from '../../../../type-defs/customer';

/**
 * Default address field properties.
 *
 * @property {AddressFieldConfiguration} first_name Customer first name.
 * @property {AddressFieldConfiguration} last_name  Customer last name.
 * @property {AddressFieldConfiguration} company    Company name.
 * @property {AddressFieldConfiguration} address_1  Street address.
 * @property {AddressFieldConfiguration} address_2  Second line of address.
 * @property {AddressFieldConfiguration} country    Country code.
 * @property {AddressFieldConfiguration} city       City name.
 * @property {AddressFieldConfiguration} state      State name or code.
 * @property {AddressFieldConfiguration} postcode   Postal code.
 */
const AddressFields: AddressFieldsType = {
	first_name: {
		label: __( 'First name', 'woo-gutenberg-products-block' ),
		optionalLabel: __(
			'First name (optional)',
			'woo-gutenberg-products-block'
		),
		autocomplete: 'given-name',
		autocapitalize: 'sentences',
		required: true,
		hidden: false,
		index: 10,
	},
	last_name: {
		label: __( 'Last name', 'woo-gutenberg-products-block' ),
		optionalLabel: __(
			'Last name (optional)',
			'woo-gutenberg-products-block'
		),
		autocomplete: 'family-name',
		autocapitalize: 'sentences',
		required: true,
		hidden: false,
		index: 20,
	},
	company: {
		label: __( 'Company', 'woo-gutenberg-products-block' ),
		optionalLabel: __(
			'Company (optional)',
			'woo-gutenberg-products-block'
		),
		autocomplete: 'organization',
		autocapitalize: 'sentences',
		required: false,
		hidden: false,
		index: 30,
	},
	address_1: {
		label: __( 'Address', 'woo-gutenberg-products-block' ),
		optionalLabel: __(
			'Address (optional)',
			'woo-gutenberg-products-block'
		),
		autocomplete: 'address-line1',
		autocapitalize: 'sentences',
		required: true,
		hidden: false,
		index: 40,
	},
	address_2: {
		label: __( 'Apartment, suite, etc.', 'woo-gutenberg-products-block' ),
		optionalLabel: __(
			'Apartment, suite, etc. (optional)',
			'woo-gutenberg-products-block'
		),
		autocomplete: 'address-line2',
		autocapitalize: 'sentences',
		required: false,
		hidden: false,
		index: 50,
	},
	country: {
		label: __( 'Country/Region', 'woo-gutenberg-products-block' ),
		optionalLabel: __(
			'Country/Region (optional)',
			'woo-gutenberg-products-block'
		),
		autocomplete: 'country',
		required: true,
		hidden: false,
		index: 60,
	},
	city: {
		label: __( 'City', 'woo-gutenberg-products-block' ),
		optionalLabel: __( 'City (optional)', 'woo-gutenberg-products-block' ),
		autocomplete: 'address-level2',
		autocapitalize: 'sentences',
		required: true,
		hidden: false,
		index: 70,
	},
	state: {
		label: __( 'State/County', 'woo-gutenberg-products-block' ),
		optionalLabel: __(
			'State/County (optional)',
			'woo-gutenberg-products-block'
		),
		autocomplete: 'address-level1',
		autocapitalize: 'sentences',
		required: true,
		hidden: false,
		index: 80,
	},
	postcode: {
		label: __( 'Postal code', 'woo-gutenberg-products-block' ),
		optionalLabel: __(
			'Postal code (optional)',
			'woo-gutenberg-products-block'
		),
		autocomplete: 'postal-code',
		autocapitalize: 'characters',
		required: true,
		hidden: false,
		index: 90,
	},
};

export default AddressFields;
