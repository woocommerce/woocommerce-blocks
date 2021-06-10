/**
 * External dependencies
 */
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import TotalsFooterItem from '../index';
import { allSettings } from '../../../../../../settings/shared/settings-init';

describe( 'TotalsFooterItem', () => {
	beforeEach( () => {
		allSettings.taxesEnabled = true;
		allSettings.displayCartPricesIncludingTax = true;
	} );
	const currency = {
		code: 'GBP',
		decimalSeparator: '.',
		minorUnit: 2,
		prefix: '£',
		suffix: '',
		symbol: '£',
		thousandSeparator: ',',
	};

	const values = {
		currency_code: 'GBP',
		currencyDecimalSeparator: '.',
		currencyMinorUnit: 2,
		currencyPrefix: '£',
		currencySuffix: '',
		currencySymbol: '£',
		currencyThousandSeparator: ',',
		taxLines: [],
		length: 2,
		totalDiscount: '0',
		totalDiscountTax: '0',
		totalFees: '0',
		totalFeesTax: '0',
		totalItems: '7100',
		totalItemsTax: '0',
		totalPrice: '8500',
		totalShipping: '0',
		totalShippingTax: '0',
		totalTax: '0',
	};

	it( 'Does not show the "including %s of tax" line if tax is 0', () => {
		const { container } = render(
			<TotalsFooterItem currency={ currency } values={ values } />
		);
		expect( container ).toMatchSnapshot();
	} );

	it( 'Does not show the "including %s of tax" line if tax is disabled', () => {
		allSettings.taxesEnabled = false;
		/* This shouldn't ever happen if taxes are disabled, but this is to test whether the taxesEnabled setting works */
		const valuesWithTax = {
			...values,
			totalTax: '100',
			totalItemsTax: '100',
		};
		const { container } = render(
			<TotalsFooterItem currency={ currency } values={ valuesWithTax } />
		);
		expect( container ).toMatchSnapshot();
	} );

	it( 'Shows the "including %s of tax" line if tax is greater than 0', () => {
		const valuesWithTax = {
			...values,
			totalTax: '100',
			totalItemsTax: '100',
		};
		const { container } = render(
			<TotalsFooterItem currency={ currency } values={ valuesWithTax } />
		);
		expect( container ).toMatchSnapshot();
	} );
} );
