/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { TemplateDetails } from './types';

export const BLOCK_SLUG = 'woocommerce/legacy-template';
export const PLACEHOLDERS = {
	singleProduct: 'single-product',
	archiveProduct: 'archive-product',
};
export const TEMPLATES: TemplateDetails = {
	'single-product': {
		title: __(
			'WooCommerce Single Product Block',
			'woo-gutenberg-products-block'
		),
		placeholder: PLACEHOLDERS.singleProduct,
	},
	'archive-product': {
		title: __(
			'WooCommerce Product Grid Block',
			'woo-gutenberg-products-block'
		),
		placeholder: PLACEHOLDERS.archiveProduct,
	},
	'taxonomy-product_cat': {
		title: __(
			'WooCommerce Product Taxonomy Block',
			'woo-gutenberg-products-block'
		),
		placeholder: PLACEHOLDERS.archiveProduct,
	},
	'taxonomy-product_tag': {
		title: __(
			'WooCommerce Product Tag Block',
			'woo-gutenberg-products-block'
		),
		placeholder: PLACEHOLDERS.archiveProduct,
	},
	'taxonomy-product_attribute': {
		title: __(
			'WooCommerce Product Attribute Block',
			'woo-gutenberg-products-block'
		),
		placeholder: PLACEHOLDERS.archiveProduct,
	},
	'product-search-results': {
		title: __(
			'WooCommerce Product Search Results Block',
			'woo-gutenberg-products-block'
		),
		placeholder: PLACEHOLDERS.archiveProduct,
	},
};
