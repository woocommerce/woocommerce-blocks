/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

export const blockAttributes = {
	className: {
		type: 'string',
		default: '',
	},
	attributeId: {
		type: 'number',
		default: 0,
	},
	showCounts: {
		type: 'boolean',
		default: true,
	},
	queryType: {
		type: 'string',
		default: 'or',
	},
	heading: {
		type: 'string',
		default: __( 'Filter by attribute', 'woo-gutenberg-products-block' ),
	},
	headingLevel: {
		type: 'number',
		default: 3,
	},
	displayStyle: {
		type: 'string',
		default: 'list',
	},
	showFilterButton: {
		type: 'boolean',
		default: false,
	},
	/**
	 * Are we previewing?
	 */
	isPreview: {
		type: 'boolean',
		default: false,
	},
};
