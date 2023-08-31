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
	orderConfirmation: 'order-confirmation',
	cart: 'cart',
	checkout: 'checkout',
	checkoutHeader: 'checkout-header',
};
export const PLACEHOLDERS = {
	singleProduct: 'single-product',
	archiveProduct: 'archive-product',
	orderConfirmation: 'fallback',
	cart: 'cart',
	checkout: 'checkout',
	checkoutHeader: 'checkout-header',
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
	// Since that it is a fallback value, it has to be the last one.
	'taxonomy-product': {
		type: TYPES.productTaxonomy,
		title: __(
			"WooCommerce Product's Custom Taxonomy Block",
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
	'page-cart': {
		type: TYPES.cart,
		// Title shows up in the list view in the site editor.
		title: __( 'Cart Page Placeholder', 'woo-gutenberg-products-block' ),
		// Description in the site editor.
		description: __(
			'Renders classic cart page content inside the template.',
			'woo-gutenberg-products-block'
		),
		placeholder: PLACEHOLDERS.cart,
	},
	'page-checkout': {
		type: TYPES.checkout,
		title: __(
			'Checkout Page Placeholder',
			'woo-gutenberg-products-block'
		),
		description: __(
			'Renders classic checkout page content inside the template.',
			'woo-gutenberg-products-block'
		),
		placeholder: PLACEHOLDERS.checkout,
	},
	'checkout-header': {
		type: TYPES.checkoutHeader,
		title: __( 'Checkout Header', 'woo-gutenberg-products-block' ),
		placeholder: 'checkout-header',
	},
	'order-confirmation': {
		type: TYPES.orderConfirmation,
		title: __( 'Order Confirmation Block', 'woo-gutenberg-products-block' ),
		placeholder: PLACEHOLDERS.orderConfirmation,
	},
};
