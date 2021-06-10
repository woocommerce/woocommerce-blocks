/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { WC_BLOCKS_ASSET_URL } from '@woocommerce/block-settings';
import { PreviewCart } from '@woocommerce/types';
import { getSetting } from '@woocommerce/settings';

/**
 * Internal dependencies
 */
import { previewShippingRates } from './shipping-rates';
import mapKeysToCamelCase from '../utils/map-keys-to-camel-case';

const displayWithTax = getSetting( 'displayCartPricesIncludingTax', false );
// Sample data for cart block.
// This closely resembles the data returned from the Store API /cart endpoint.
// https://github.com/woocommerce/woocommerce-gutenberg-products-block/tree/trunk/src/RestApi/StoreApi#cart-api
export const previewCart: PreviewCart = {
	coupons: [],
	errors: [],
	payment_requirements: [],
	shippingRates: getSetting( 'shippingMethodsExist', false )
		? previewShippingRates.map( ( rate ) => mapKeysToCamelCase( rate ) )
		: [],
	items: [
		{
			key: '1',
			id: 1,
			quantity: 2,
			name: __( 'Beanie', 'woo-gutenberg-products-block' ),
			shortDescription: __(
				'Warm hat for winter',
				'woo-gutenberg-products-block'
			),
			description:
				'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.',
			sku: 'woo-beanie',
			permalink: 'https://example.org',
			lowStockRemaining: 2,
			backordersAllowed: false,
			showBackorderBadge: false,
			soldIndividually: false,
			catalogVisibility: 'visible',
			itemData: [],
			summary: '',
			images: [
				{
					id: 10,
					src: WC_BLOCKS_ASSET_URL + 'img/beanie.jpg',
					thumbnail: WC_BLOCKS_ASSET_URL + 'img/beanie.jpg',
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
				currencyCode: 'USD',
				currencySymbol: '$',
				currencyMinorUnit: 2,
				currencyDecimalSeparator: '.',
				currencyThousandSeparator: ',',
				currencyPrefix: '$',
				currencySuffix: '',
				price: displayWithTax ? '800' : '640',
				regularPrice: displayWithTax ? '800' : '640',
				salePrice: displayWithTax ? '800' : '640',
				priceRange: null,
				rawPrices: {
					precision: 6,
					price: displayWithTax ? '8000000' : '6400000',
					regularPrice: displayWithTax ? '8000000' : '6400000',
					salePrice: displayWithTax ? '8000000' : '6400000',
				},
			},
			totals: {
				currencyCode: 'USD',
				currencySymbol: '$',
				currencyMinorUnit: 2,
				currencyDecimalSeparator: '.',
				currencyThousandSeparator: ',',
				currencyPrefix: '$',
				currencySuffix: '',
				lineSubtotal: displayWithTax ? '1600' : '1280',
				lineSubtotalTax: '0',
				lineTotal: '1600',
				lineTotalTax: displayWithTax ? '0' : '320',
			},
			extensions: {},
		},
		{
			key: '2',
			id: 2,
			quantity: 1,
			name: __( 'Cap', 'woo-gutenberg-products-block' ),
			shortDescription: __(
				'Lightweight baseball cap',
				'woo-gutenberg-products-block'
			),
			description:
				'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.',
			sku: 'woo-cap',
			permalink: 'https://example.org',
			backordersAllowed: false,
			showBackorderBadge: false,
			soldIndividually: false,
			catalogVisibility: 'visible',
			lowStockRemaining: null,
			itemData: [],
			summary: '',
			images: [
				{
					id: 11,
					src: WC_BLOCKS_ASSET_URL + 'img/cap.jpg',
					thumbnail: WC_BLOCKS_ASSET_URL + 'img/cap.jpg',
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
				currencyCode: 'USD',
				currencySymbol: '$',
				currencyMinorUnit: 2,
				currencyDecimalSeparator: '.',
				currencyThousandSeparator: ',',
				currencyPrefix: '$',
				currencySuffix: '',
				price: displayWithTax ? '1400' : '1120',
				regularPrice: displayWithTax ? '1600' : '1280',
				salePrice: displayWithTax ? '1400' : '1120',
				priceRange: null,
				rawPrices: {
					precision: 6,
					price: displayWithTax ? '14000000' : '11200000',
					regularPrice: displayWithTax ? '16000000' : '12800000',
					salePrice: displayWithTax ? '14000000' : '11200000',
				},
			},
			totals: {
				currencyCode: 'USD',
				currencySymbol: '$',
				currencyMinorUnit: 2,
				currencyDecimalSeparator: '.',
				currencyThousandSeparator: ',',
				currencyPrefix: '$',
				currencySuffix: '',
				lineSubtotal: displayWithTax ? '1400' : '1120',
				lineSubtotalTax: displayWithTax ? '0' : '280',
				lineTotal: '1400',
				lineTotalTax: displayWithTax ? '0' : '280',
			},
			extensions: {},
		},
	],
	fees: [],
	items_count: 3,
	items_weight: 0,
	needs_payment: true,
	needs_shipping: getSetting( 'shippingEnabled', true ),
	has_calculated_shipping: true,
	extensions: {},
	shipping_address: {
		first_name: '',
		last_name: '',
		company: '',
		address_1: '',
		address_2: '',
		city: '',
		state: '',
		postcode: '',
		country: '',
	},
	billing_address: {
		first_name: '',
		last_name: '',
		company: '',
		address_1: '',
		address_2: '',
		city: '',
		state: '',
		postcode: '',
		country: '',
		email: '',
		phone: '',
	},
	totals: {
		currencyCode: 'USD',
		currencySymbol: '$',
		currencyMinorUnit: 2,
		currencyDecimalSeparator: '.',
		currencyThousandSeparator: ',',
		currencyPrefix: '$',
		currencySuffix: '',
		totalItems: displayWithTax ? '3000' : '2400',
		totalItemsTax: '0',
		totalFees: '0',
		totalFeesTax: '0',
		totalDiscount: '0',
		totalDiscountTax: '0',
		totalShipping: '0',
		totalShippingTax: '0',
		totalTax: '600',
		totalPrice: '3000',
		taxLines: [
			{
				name: __( 'Sales tax', 'woo-gutenberg-products-block' ),
				rate: '20%',
				price: 600,
			},
		],
	},
};
