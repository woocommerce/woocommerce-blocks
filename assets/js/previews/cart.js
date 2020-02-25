/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import productPicture from './product-image';

// Sample data for cart block.
// This closely resembles the data returned from the Store API /cart endpoint.
// https://github.com/woocommerce/woocommerce-gutenberg-products-block/tree/master/src/RestApi/StoreApi#cart-api
export const previewCart = {
	items: [
		{
			key: '1',
			id: 1,
			quantity: 2,
			name: __( 'Beanie', 'woo-gutenberg-products-block' ),
			summary: __(
				'Warm hat for winter',
				'woo-gutenberg-products-block'
			),
			short_description: __(
				'Warm hat for winter',
				'woo-gutenberg-products-block'
			),
			description:
				'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.',
			sku: 'woo-beanie',
			permalink: 'https://example.org',
			low_stock_remaining: 2,
			images: [
				{
					id: 10,
					src: productPicture,
					thumbnail: productPicture,
					srcset: '',
					sizes: '',
					name: '',
					alt: '',
				},
			],
			variation: [
				{
					attribute: __( 'Color', 'woo-gutenberg-products-block' ),
					value: __( 'Yellow', 'woo-gutenberg-products-block' ),
				},
				{
					attribute: __( 'Size', 'woo-gutenberg-products-block' ),
					value: __( 'Small', 'woo-gutenberg-products-block' ),
				},
			],
			prices: {
				currency_code: 'USD',
				currency_symbol: '$',
				currency_minor_unit: 2,
				currency_decimal_separator: '.',
				currency_thousand_separator: ',',
				currency_prefix: '$',
				currency_suffix: '',
				price: '800',
				regular_price: '800',
				sale_price: '800',
			},
			totals: {
				currency_code: 'USD',
				currency_symbol: '$',
				currency_minor_unit: 2,
				currency_decimal_separator: '.',
				currency_thousand_separator: ',',
				currency_prefix: '$',
				currency_suffix: '',
				line_subtotal: '1600',
				line_subtotal_tax: '0',
				line_total: '1600',
				line_total_tax: '0',
			},
		},
		{
			key: '2',
			id: 2,
			quantity: 1,
			name: __( 'Cap', 'woo-gutenberg-products-block' ),
			summary: __(
				'Lightweight baseball cap',
				'woo-gutenberg-products-block'
			),
			short_description: __(
				'Lightweight baseball cap',
				'woo-gutenberg-products-block'
			),
			description:
				'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.',
			sku: 'woo-cap',
			permalink: 'https://example.org',
			images: [
				{
					id: 11,
					src: productPicture,
					thumbnail: productPicture,
					srcset: '',
					sizes: '',
					name: '',
					alt: '',
				},
			],
			variation: [
				{
					attribute: __( 'Color', 'woo-gutenberg-products-block' ),
					value: __( 'Orange', 'woo-gutenberg-products-block' ),
				},
			],
			prices: {
				currency_code: 'USD',
				currency_symbol: '$',
				currency_minor_unit: 2,
				currency_decimal_separator: '.',
				currency_thousand_separator: ',',
				currency_prefix: '$',
				currency_suffix: '',
				price: '1400',
				regular_price: '1600',
				sale_price: '1400',
			},
			totals: {
				currency_code: 'USD',
				currency_symbol: '$',
				currency_minor_unit: 2,
				currency_decimal_separator: '.',
				currency_thousand_separator: ',',
				currency_prefix: '$',
				currency_suffix: '',
				line_subtotal: '1400',
				line_subtotal_tax: '0',
				line_total: '1400',
				line_total_tax: '0',
			},
		},
	],
	totals: {
		currency: 'USD',
		currency_minor_unit: 2,
		total_items: '3000',
		total_items_tax: '0',
		total_fees: '0',
		total_fees_tax: '0',
		total_discount: '0',
		total_discount_tax: '0',
		total_shipping: '0',
		total_shipping_tax: '0',
		total_tax: '0',
		total_price: '3000',
	},
};
