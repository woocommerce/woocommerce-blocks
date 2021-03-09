/**
 * External dependencies
 */
import { __, _x } from '@wordpress/i18n';
import type { CartResponseShippingRateItem } from '@woocommerce/types';

export const previewShippingRates: CartResponseShippingRateItem[] = [
	{
		destination: {
			address_1: '',
			address_2: '',
			city: '',
			state: '',
			postcode: '',
			country: '',
		},
		package_id: 0,
		name: __( 'Shipping', 'woo-gutenberg-products-block' ),
		items: [
			{
				key: '33e75ff09dd601bbe69f351039152189',
				name: _x(
					'Beanie with Logo',
					'example product in Cart Block',
					'woo-gutenberg-products-block'
				),
				quantity: 2,
			},
			{
				key: '6512bd43d9caa6e02c990b0a82652dca',
				name: _x(
					'Beanie',
					'example product in Cart Block',
					'woo-gutenberg-products-block'
				),
				quantity: 1,
			},
		],
		shipping_rates: [
			{
				currency_code: 'USD',
				currency_symbol: '$',
				currency_minor_unit: 2,
				currency_decimal_separator: '.',
				currency_thousand_separator: ',',
				currency_prefix: '$',
				currency_suffix: '',
				name: __( 'Free shipping', 'woo-gutenberg-products-block' ),
				description: '',
				delivery_time: '',
				price: '000',
				taxes: '0',
				rate_id: 'free_shipping:1',
				instance_id: 0,
				meta_data: [],
				method_id: 'flat_rate',
				selected: true,
			},
			{
				currency_code: 'USD',
				currency_symbol: '$',
				currency_minor_unit: 2,
				currency_decimal_separator: '.',
				currency_thousand_separator: ',',
				currency_prefix: '$',
				currency_suffix: '',
				name: __( 'Local pickup', 'woo-gutenberg-products-block' ),
				description: '',
				delivery_time: '',
				price: '200',
				taxes: '0',
				rate_id: 'local_pickup:1',
				instance_id: 1,
				meta_data: [],
				method_id: 'local_pickup',
				selected: false,
			},
		],
	},
];
