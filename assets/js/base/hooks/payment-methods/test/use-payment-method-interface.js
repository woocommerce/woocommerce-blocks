/**
 * Internal dependencies
 */
import { prepareTotalItems } from '../use-payment-method-interface';

describe( 'prepareTotalItems', () => {
	const fixture = {
		total_items: '200',
		total_items_tax: '20',
		total_fees: '100',
		total_fees_tax: '10',
		total_discount: '350',
		total_discount_tax: '50',
		total_shipping: '50',
		total_shipping_tax: '5',
		total_tax: '30',
	};
	const expected = [
		{
			label: 'Subtotal:',
			value: 200,
			valueWithTax: 220,
		},
		{
			label: 'Fees:',
			value: 100,
			valueWithTax: 110,
		},
		{
			label: 'Discount:',
			value: 350,
			valueWithTax: 400,
		},
		{
			label: 'Taxes:',
			value: 30,
			valueWithTax: 30,
		},
	];
	const expectedWithShipping = [
		...expected,
		{
			label: 'Shipping:',
			value: 50,
			valueWithTax: 55,
		},
	];
	it( 'returns expected values when needsShipping is false', () => {
		expect( prepareTotalItems( fixture, false ) ).toEqual( expected );
	} );
	it( 'returns expected values when needsShipping is true', () => {
		expect( prepareTotalItems( fixture, true ) ).toEqual(
			expectedWithShipping
		);
	} );
} );
