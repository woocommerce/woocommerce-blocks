/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import Gridicon from 'gridicons';

/**
 * Holds default config for this collection of blocks.
 */
export default {
	category: 'woocommerce',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	icon: {
		src: <Gridicon icon="grid" />,
		foreground: '#96588a',
	},
	supports: {
		html: false,
	},
	parent: [ 'woocommerce/all-products' ],
	attributes: {
		product: {
			type: 'object',
			default: {
				id: 0,
				name: 'Sample Product',
				images: [],
				prices: {
					currency_code: 'GBP',
					decimal_separator: '.',
					thousand_separator: ',',
					decimals: 2,
					price_prefix: '£',
					price_suffix: '',
					price: '9.99',
					regular_price: '9.99',
					sale_price: null,
					price_range: null,
				},
				average_rating: 5,
				add_to_cart: {
					text: 'Add to cart',
					description: 'Add to cart',
				},
				permalink: '#',
				has_options: false,
				is_purchasable: true,
				is_in_stock: true,
			},
		},
	},
	save() {},
};
