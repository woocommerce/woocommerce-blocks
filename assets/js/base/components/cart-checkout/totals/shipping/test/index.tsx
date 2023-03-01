/**
 * External dependencies
 */
import { screen, render } from '@testing-library/react';
require( '@wordpress/data' );

/**
 * Internal dependencies
 */
import { TotalsShipping } from '../index';

jest.mock( '@wordpress/data', () => ( {
	__esModule: true,
	...jest.requireActual( '@wordpress/data' ),
	AsyncModeProvider:
		jest.requireActual( '@wordpress/data' ).AsyncModeProvider,
	useSelect: jest.fn().mockImplementation( ( selector ) => {
		return { prefersCollection: true };
	} ),
} ) );

jest.mock( '@woocommerce/base-context/hooks', () => ( {
	...jest.requireActual( '@woocommerce/base-context/hooks' ),
	useShippingData: jest.fn().mockReturnValue( {
		needsShipping: true,
		shippingRates: [
			{
				package_id: 0,
				name: 'Shipping method',
				destination: {
					address_1: '',
					address_2: '',
					city: '',
					state: '',
					postcode: '',
					country: '',
				},
				items: [
					{
						key: 'fb0c0a746719a7596f296344b80cb2b6',
						name: 'Hoodie - Blue, Yes',
						quantity: 1,
					},
					{
						key: '1f0e3dad99908345f7439f8ffabdffc4',
						name: 'Beanie',
						quantity: 1,
					},
				],
				shipping_rates: [
					{
						rate_id: 'flat_rate:1',
						name: 'Flat rate',
						description: '',
						delivery_time: '',
						price: '500',
						taxes: '0',
						instance_id: 1,
						method_id: 'flat_rate',
						meta_data: [
							{
								key: 'Items',
								value: 'Hoodie - Blue, Yes &times; 1, Beanie &times; 1',
							},
						],
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
						rate_id: 'local_pickup:2',
						name: 'Local pickup',
						description: '',
						delivery_time: '',
						price: '0',
						taxes: '0',
						instance_id: 2,
						method_id: 'local_pickup',
						meta_data: [
							{
								key: 'Items',
								value: 'Hoodie - Blue, Yes &times; 1, Beanie &times; 1',
							},
						],
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
						rate_id: 'free_shipping:5',
						name: 'Free shipping',
						description: '',
						delivery_time: '',
						price: '0',
						taxes: '0',
						instance_id: 5,
						method_id: 'free_shipping',
						meta_data: [
							{
								key: 'Items',
								value: 'Hoodie - Blue, Yes &times; 1, Beanie &times; 1',
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
				],
			},
		],
	} ),
} ) );
describe( 'TotalsShipping', () => {
	it( 'should show correct calculator button label if address is complete', () => {
		const { rerender } = render(
			<TotalsShipping
				currency={ {
					code: 'USD',
					symbol: '$',
					position: 'left',
					precision: 2,
				} }
				values={ {
					total_shipping: '10',
					total_shipping_tax: '0',
				} }
				showCalculator={ true }
				showRateSelector={ true }
				isCheckout={ true }
				className={ '' }
			/>
		);
		expect( screen.getByText( 'Calculate' ) ).toBeInTheDocument();
	} );
} );
