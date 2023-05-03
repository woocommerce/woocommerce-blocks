/**
 * External dependencies
 */
import type { CartShippingPackageShippingRate } from '@woocommerce/type-defs/cart';
/**
 * Internal dependencies
 */
import { getLocalPickupPrices } from '../shared/helpers';
describe( 'Test Min and Max prices', function () {
	const shippingRates: CartShippingPackageShippingRate[] = [
		{
			rate_id: 'pickup_location:0',
			name: 'Pickup (Test)',
			description: '',
			delivery_time: '',
			price: '400',
			taxes: '0',
			instance_id: 0,
			method_id: 'pickup_location',
			meta_data: [
				{
					key: 'pickup_location',
					value: 'Test',
				},
				{
					key: 'pickup_address',
					value: 'United Kingdom (UK)',
				},
				{
					key: 'pickup_details',
					value: '',
				},
				{
					key: 'Items',
					value: 'Beanie with Logo &times; 1',
				},
			],
			selected: true,
			currency_code: 'USD',
			currency_symbol: '$',
			currency_minor_unit: 2,
			currency_decimal_separator: '.',
			currency_thousand_separator: ',',
			currency_prefix: '$',
			currency_suffix: '',
		},
		{
			rate_id: 'pickup_location:1',
			name: 'Pickup (Test)',
			description: '',
			delivery_time: '',
			price: '500',
			taxes: '0',
			instance_id: 1,
			method_id: 'pickup_location',
			meta_data: [
				{
					key: 'pickup_location',
					value: 'Test2',
				},
				{
					key: 'pickup_address',
					value: 'United Kingdom (UK)',
				},
				{
					key: 'pickup_details',
					value: '',
				},
				{
					key: 'Items',
					value: 'Beanie with Logo &times; 2',
				},
			],
			selected: true,
			currency_code: 'USD',
			currency_symbol: '$',
			currency_minor_unit: 2,
			currency_decimal_separator: '.',
			currency_thousand_separator: ',',
			currency_prefix: '$',
			currency_suffix: '',
		},
	];
	it( 'should return correct Min and Max price for local pickup', () => {
		expect( getLocalPickupPrices( shippingRates ) ).toEqual( [
			{
				min: 400,
				max: 500,
			},
		] );
	} );
} );
