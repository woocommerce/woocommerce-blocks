/**
 * External dependencies
 */
import {
	hasCollectableRate,
	isPackageRateCollectable,
} from '@woocommerce/base-utils';
import { CartShippingRate } from '@woocommerce/type-defs/cart';
import * as blockSettings from '@woocommerce/block-settings';

/**
 * Internal dependencies
 */
import {
	getLocalPickupPrices,
	getShippingPrices,
} from '../../../blocks/checkout/inner-blocks/checkout-shipping-method-block/shared/helpers';

jest.mock( '@woocommerce/settings', () => {
	return {
		__esModule: true,
		...jest.requireActual( '@woocommerce/settings' ),
		getSetting: jest.fn().mockImplementation( ( setting: string ) => {
			if ( setting === 'collectableMethodIds' ) {
				return [ 'local_pickup' ];
			}
			return jest
				.requireActual( '@woocommerce/settings' )
				.getSetting( setting );
		} ),
	};
} );
jest.mock( '@woocommerce/block-settings', () => ( {
	__esModule: true,
	...jest.requireActual( '@woocommerce/block-settings' ),
	LOCAL_PICKUP_ENABLED: true,
} ) );
const testPackage: CartShippingRate = {
	package_id: 0,
	name: 'Shipping',
	destination: {
		address_1: '',
		address_2: '',
		city: '',
		state: '',
		postcode: '',
		country: '',
	},
	items: [],
	shipping_rates: [
		{
			rate_id: 'flat_rate:1',
			name: 'Flat rate',
			description: '',
			delivery_time: '',
			price: '10',
			taxes: '0',
			instance_id: 1,
			method_id: 'flat_rate',
			meta_data: [],
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
			rate_id: 'local_pickup:2',
			name: 'Local pickup',
			description: '',
			delivery_time: '',
			price: '0',
			taxes: '0',
			instance_id: 2,
			method_id: 'local_pickup',
			meta_data: [],
			selected: false,
			currency_code: 'USD',
			currency_symbol: '$',
			currency_minor_unit: 2,
			currency_decimal_separator: '.',
			currency_thousand_separator: ',',
			currency_prefix: '$',
			currency_suffix: '',
		},
		{
			rate_id: 'local_pickup:3',
			name: 'Local pickup',
			description: '',
			delivery_time: '',
			price: '10',
			taxes: '0',
			instance_id: 3,
			method_id: 'local_pickup',
			meta_data: [],
			selected: false,
			currency_code: 'USD',
			currency_symbol: '$',
			currency_minor_unit: 2,
			currency_decimal_separator: '.',
			currency_thousand_separator: ',',
			currency_prefix: '$',
			currency_suffix: '',
		},
		{
			rate_id: 'local_pickup:4',
			name: 'Local pickup',
			description: '',
			delivery_time: '',
			price: '100',
			taxes: '0',
			instance_id: 4,
			method_id: 'local_pickup',
			meta_data: [],
			selected: false,
			currency_code: 'USD',
			currency_symbol: '$',
			currency_minor_unit: 2,
			currency_decimal_separator: '.',
			currency_thousand_separator: ',',
			currency_prefix: '$',
			currency_suffix: '',
		},
		{
			rate_id: 'flat_rate:2',
			name: 'Flat rate',
			description: '',
			delivery_time: '',
			price: '50',
			taxes: '0',
			instance_id: 5,
			method_id: 'flat_rate',
			meta_data: [],
			selected: true,
			currency_code: 'USD',
			currency_symbol: '$',
			currency_minor_unit: 2,
			currency_decimal_separator: '.',
			currency_thousand_separator: ',',
			currency_prefix: '$',
			currency_suffix: '',
		},
	],
};
describe( 'Test Min and Max rates', () => {
	it( 'returns the lowest and highest rates when local pickup method is used', () => {
		expect( getLocalPickupPrices( testPackage.shipping_rates ) ).toEqual( {
			min: {
				rate_id: 'local_pickup:2',
				name: 'Local pickup',
				description: '',
				delivery_time: '',
				price: '0',
				taxes: '0',
				instance_id: 2,
				method_id: 'local_pickup',
				meta_data: [],
				selected: false,
				currency_code: 'USD',
				currency_symbol: '$',
				currency_minor_unit: 2,
				currency_decimal_separator: '.',
				currency_thousand_separator: ',',
				currency_prefix: '$',
				currency_suffix: '',
			},
			max: {
				rate_id: 'local_pickup:4',
				name: 'Local pickup',
				description: '',
				delivery_time: '',
				price: '100',
				taxes: '0',
				instance_id: 4,
				method_id: 'local_pickup',
				meta_data: [],
				selected: false,
				currency_code: 'USD',
				currency_symbol: '$',
				currency_minor_unit: 2,
				currency_decimal_separator: '.',
				currency_thousand_separator: ',',
				currency_prefix: '$',
				currency_suffix: '',
			},
		} );
	} );
	it( 'correctly returns Min and Max rates for shipping', () => {
		expect( getShippingPrices( testPackage.shipping_rates ) ).toEqual( {
			min: {
				rate_id: 'flat_rate:1',
				name: 'Flat rate',
				description: '',
				delivery_time: '',
				price: '10',
				taxes: '0',
				instance_id: 1,
				method_id: 'flat_rate',
				meta_data: [],
				selected: true,
				currency_code: 'USD',
				currency_symbol: '$',
				currency_minor_unit: 2,
				currency_decimal_separator: '.',
				currency_thousand_separator: ',',
				currency_prefix: '$',
				currency_suffix: '',
			},
			max: {
				rate_id: 'flat_rate:2',
				name: 'Flat rate',
				description: '',
				delivery_time: '',
				price: '50',
				taxes: '0',
				instance_id: 5,
				method_id: 'flat_rate',
				meta_data: [],
				selected: true,
				currency_code: 'USD',
				currency_symbol: '$',
				currency_minor_unit: 2,
				currency_decimal_separator: '.',
				currency_thousand_separator: ',',
				currency_prefix: '$',
				currency_suffix: '',
			},
		} );
	} );
} );

describe( 'isPackageRateCollectable', () => {
	it( 'correctly identifies if a package rate is collectable or not', () => {
		expect(
			isPackageRateCollectable( testPackage.shipping_rates[ 0 ] )
		).toBe( false );
		expect(
			isPackageRateCollectable( testPackage.shipping_rates[ 1 ] )
		).toBe( true );
	} );
	describe( 'hasCollectableRate', () => {
		it( 'correctly identifies if an array contains a collectable rate', () => {
			const ratesToTest = [ 'flat_rate', 'local_pickup' ];
			expect( hasCollectableRate( ratesToTest ) ).toBe( true );
			const ratesToTest2 = [ 'flat_rate', 'free_shipping' ];
			expect( hasCollectableRate( ratesToTest2 ) ).toBe( false );
		} );
		it( 'returns false for all rates if local pickup is disabled', () => {
			// Attempt to assign to const or readonly variable error on next line is OK because it is mocked by jest
			blockSettings.LOCAL_PICKUP_ENABLED = false;
			const ratesToTest = [ 'flat_rate', 'local_pickup' ];
			expect( hasCollectableRate( ratesToTest ) ).toBe( false );
		} );
	} );
} );
