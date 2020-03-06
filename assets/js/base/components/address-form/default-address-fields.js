/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Default address field names and labels.
 */
const defaultAddressFields = {
	first_name: {
		label: __( 'First name', 'woo-gutenberg-products-block' ),
		optionalLabel: __(
			'First name (optional)',
			'woo-gutenberg-products-block'
		),
		autocomplete: 'given-name',
		required: true,
		hidden: false,
		index: 1,
	},
	last_name: {
		label: __( 'Last name', 'woo-gutenberg-products-block' ),
		optionalLabel: __(
			'Last name (optional)',
			'woo-gutenberg-products-block'
		),
		autocomplete: 'family-name',
		required: true,
		hidden: false,
		index: 2,
	},
	company: {
		label: __( 'Company', 'woo-gutenberg-products-block' ),
		optionalLabel: __(
			'Company (optional)',
			'woo-gutenberg-products-block'
		),
		autocomplete: 'organization',
		required: false,
		hidden: false,
		index: 3,
	},
	address_1: {
		label: __( 'Address', 'woo-gutenberg-products-block' ),
		optionalLabel: __(
			'Address (optional)',
			'woo-gutenberg-products-block'
		),
		autocomplete: 'address-line1',
		required: true,
		hidden: false,
		index: 4,
	},
	address_2: {
		label: __( 'Apartment, suite, etc.', 'woo-gutenberg-products-block' ),
		optionalLabel: __(
			'Apartment, suite, etc. (optional)',
			'woo-gutenberg-products-block'
		),
		autocomplete: 'address-line2',
		required: false,
		hidden: false,
		index: 5,
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
		index: 6,
	},
	city: {
		label: __( 'City', 'woo-gutenberg-products-block' ),
		optionalLabel: __(
			'Apartment, suite, etc. (optional)',
			'woo-gutenberg-products-block'
		),
		autocomplete: 'address-level2',
		required: true,
		hidden: false,
		index: 7,
	},
	postcode: {
		label: __( 'Postal code', 'woo-gutenberg-products-block' ),
		optionalLabel: __(
			'Postal code (optional)',
			'woo-gutenberg-products-block'
		),
		autocomplete: 'postal-code',
		required: true,
		hidden: false,
		index: 8,
	},
	state: {
		label: __( 'State/County', 'woo-gutenberg-products-block' ),
		optionalLabel: __(
			'State/County (optional)',
			'woo-gutenberg-products-block'
		),
		autocomplete: 'address-level1',
		required: true,
		hidden: false,
		index: 9,
	},
};

export default defaultAddressFields;
