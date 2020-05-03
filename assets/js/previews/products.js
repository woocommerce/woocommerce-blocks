/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { WC_BLOCKS_ASSET_URL } from '@woocommerce/block-settings';

const shortDescription = __(
	'Fly your WordPress banner with this beauty! Deck out your office space or add it to your kids walls. This banner will spruce up any space it’s hung!',
	'woo-gutenberg-products-block'
);

export const previewProducts = [
	{
		id: 1,
		name: 'WordPress Pennant',
		variation: '',
		permalink: 'https://example.org',
		sku: 'wp-pennant',
		short_description: shortDescription,
		description:
			'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.',
		price: '7.99',
		price_html:
			'<span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">$</span>7.99</span>',
		images: [
			{
				id: 1,
				src: WC_BLOCKS_ASSET_URL + 'img/pennant.jpg',
				thumbnail: WC_BLOCKS_ASSET_URL + 'img/pennant.jpg',
				name: 'pennant-1.jpg',
				alt: 'WordPress Pennant',
				srcset: '',
				sizes: '',
			},
		],
		average_rating: 5,
		review_count: 1,
		prices: {
			currency_code: 'GBP',
			decimal_separator: '.',
			thousand_separator: ',',
			decimals: 2,
			price_prefix: '£',
			price_suffix: '',
			price: '7.99',
			regular_price: '9.99',
			sale_price: '7.99',
			price_range: null,
		},
		add_to_cart: {
			text: __( 'Add to cart', 'woo-gutenberg-products-block' ),
			description: __( 'Add to cart', 'woo-gutenberg-products-block' ),
		},
		has_options: false,
		is_purchasable: true,
		is_in_stock: true,
		on_sale: true,
	},
];
