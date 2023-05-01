/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { TemplateDetails } from './types';

export const BLOCK_SLUG = 'woocommerce/legacy-template';
export const TYPES = {
	singleProduct: 'single-product',
	productCatalog: 'product-catalog',
	productTaxonomy: 'product-taxonomy',
	productSearchResults: 'product-search-results',
	orderReceived: 'order-received',
};
export const PLACEHOLDERS = {
	singleProduct: 'single-product',
	archiveProduct: 'archive-product',
	orderReceived: 'fallback',
};

export const TEMPLATES: TemplateDetails = {
	'single-product': {
		type: TYPES.singleProduct,
		title: __(
			'WooCommerce Single Product Block',
			'woo-gutenberg-products-block'
		),
		placeholder: PLACEHOLDERS.singleProduct,
	},
	'archive-product': {
		type: TYPES.productCatalog,
		title: __(
			'WooCommerce Product Grid Block',
			'woo-gutenberg-products-block'
		),
		placeholder: PLACEHOLDERS.archiveProduct,
	},
	'taxonomy-product_cat': {
		type: TYPES.productTaxonomy,
		title: __(
			'WooCommerce Product Taxonomy Block',
			'woo-gutenberg-products-block'
		),
		placeholder: PLACEHOLDERS.archiveProduct,
	},
	'taxonomy-product_tag': {
		type: TYPES.productTaxonomy,
		title: __(
			'WooCommerce Product Tag Block',
			'woo-gutenberg-products-block'
		),
		placeholder: PLACEHOLDERS.archiveProduct,
	},
	'taxonomy-product_attribute': {
		type: TYPES.productTaxonomy,
		title: __(
			'WooCommerce Product Attribute Block',
			'woo-gutenberg-products-block'
		),
		placeholder: PLACEHOLDERS.archiveProduct,
	},
	'product-search-results': {
		type: TYPES.productSearchResults,
		title: __(
			'WooCommerce Product Search Results Block',
			'woo-gutenberg-products-block'
		),
		placeholder: PLACEHOLDERS.archiveProduct,
	},
	cart: {
		title: __( 'WooCommerce Cart Block', 'woo-gutenberg-products-block' ),
		placeholder: 'cart',
	},
	checkout: {
		title: __(
			'WooCommerce Checkout Block',
			'woo-gutenberg-products-block'
		),
		placeholder: 'checkout',
	},
	'order-received': {
		type: TYPES.orderReceived,
		title: __(
			'WooCommerce Order Received Block',
			'woo-gutenberg-products-block'
		),
		placeholder: PLACEHOLDERS.orderReceived,
	},
};
