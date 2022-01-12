/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

type TemplateAttributes = {
	title: string;
	placeholder: string;
};

export const TEMPLATES: Record< string, TemplateAttributes > = {
	'single-product': {
		title: __(
			'WooCommerce Single Product Block',
			'woo-gutenberg-products-block'
		),
		placeholder: 'single-product',
	},
	'archive-product': {
		title: __(
			'WooCommerce Product Grid Block',
			'woo-gutenberg-products-block'
		),
		placeholder: 'archive-product',
	},
	'taxonomy-product_cat': {
		title: __(
			'WooCommerce Product Taxonomy Block',
			'woo-gutenberg-products-block'
		),
		placeholder: 'archive-product',
	},
	'taxonomy-product_tag': {
		title: __(
			'WooCommerce Product Tag Block',
			'woo-gutenberg-products-block'
		),
		placeholder: 'archive-product',
	},
};
