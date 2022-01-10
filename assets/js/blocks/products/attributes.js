/**
 * External dependencies
 */
import { getSetting } from '@woocommerce/settings';

/**
 * Internal dependencies
 */
import { DEFAULT_PRODUCT_LIST_LAYOUT } from './base-utils';

export const defaults = {
	columns: getSetting( 'default_columns', 3 ),
	rows: getSetting( 'default_rows', 3 ),
	alignButtons: false,
	contentVisibility: {
		orderBy: true,
	},
	orderby: 'date',
	layoutConfig: DEFAULT_PRODUCT_LIST_LAYOUT,
	isPreview: false,
};

export const attributes = {
	/**
	 * Number of columns.
	 */
	columns: {
		type: 'number',
	},
	/**
	 * Number of rows.
	 */
	rows: {
		type: 'number',
	},
	/**
	 * How to align cart buttons.
	 */
	alignButtons: {
		type: 'boolean',
	},
	/**
	 * Content visibility setting
	 */
	contentVisibility: {
		type: 'object',
	},
	/**
	 * Order to use for the products listing.
	 */
	orderby: {
		type: 'string',
	},
	/**
	 * Layout config.
	 */
	layoutConfig: {
		type: 'array',
	},
	/**
	 * Are we previewing?
	 */
	isPreview: {
		type: 'boolean',
		default: false,
	},
};
