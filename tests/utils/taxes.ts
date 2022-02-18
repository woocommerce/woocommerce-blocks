/**
 * External dependencies
 */
import { withRestApi } from '@woocommerce/e2e-utils';
import type { TaxRate, ProductResponseItem } from '@woocommerce/types';

export async function showTaxes( onoff: boolean ): Promise< void > {
	await withRestApi.updateSettingOption(
		'general',
		'woocommerce_calc_taxes',
		{ value: onoff ? 'yes' : 'no' }
	);
}

export function getExpectedTaxes(
	taxRates: Array< TaxRate >,
	countryCode: string,
	products: Array< Partial< ProductResponseItem > > = []
): Array< { label: string; value: string } > {
	const taxRatesForCountry = taxRates.filter(
		( taxRate ) => taxRate.country === countryCode
	);

	const total = products.reduce(
		( previous, current ) =>
			parseFloat( previous.regular_price ) +
			parseFloat( current.regular_price ),
		{ regular_price: 0 }
	);

	return taxRatesForCountry.map( ( taxRate ) => {
		const taxCalc = (
			parseFloat( total ) *
			( parseFloat( taxRate.rate ) / 100 )
		).toFixed( 2 );

		return { label: taxRate.name, value: `$${ taxCalc }` };
	} );
}

export async function getTaxesFromCurrentPage(): Promise<
	Array< {
		label: string;
		value: string;
	} >
> {
	return await page.$$eval(
		'.wc-block-components-totals-taxes .wc-block-components-totals-item',
		( nodes ) =>
			nodes.map( ( node ) => {
				const label = node.querySelector(
					'.wc-block-components-totals-item__label'
				)?.innerHTML;
				const value = node.querySelector(
					'.wc-block-components-totals-item__value'
				)?.innerHTML;
				return { label, value };
			} )
	);
}
