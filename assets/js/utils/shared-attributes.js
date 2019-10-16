/**
 * External dependencies
 */
import { DEFAULT_COLUMNS, DEFAULT_ROWS } from '@woocommerce/block-settings';

export const sharedAttributeBlockTypes = [
	'woocommerce/product-best-sellers',
	'woocommerce/product-category',
	'woocommerce/product-new',
	'woocommerce/product-on-sale',
	'woocommerce/product-top-rated',
];

export default {
	/**
	 * Number of columns.
	 */
	columns: {
		type: 'number',
		default: DEFAULT_COLUMNS,
	},

	/**
	 * Number of rows.
	 */
	rows: {
		type: 'number',
		default: DEFAULT_ROWS,
	},

	/**
	 * How to align cart buttons.
	 */
	alignButtons: {
		type: 'boolean',
		default: false,
	},

	/**
	 * Product category, used to display only products in the given categories.
	 */
	categories: {
		type: 'array',
		default: [],
	},

	/**
	 * Product category operator, used to restrict to products in all or any selected categories.
	 */
	catOperator: {
		type: 'string',
		default: 'any',
	},

	/**
	 * Content visibility setting
	 */
	contentVisibility: {
		type: 'object',
		default: {
			title: true,
			price: true,
			rating: true,
			button: true,
		},
	},
};
