/**
 * External dependencies
 */
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import {
	TAXES_ENABLED,
	DISPLAY_ITEMIZED_TAXES,
} from '@woocommerce/block-settings';
import type { Currency } from '@woocommerce/price-format';

/**
 * Internal dependencies
 */
import TotalsItem from '../item';

interface TaxLine {
	name: string;
	price: string;
}

interface Values {
	// eslint-disable-next-line camelcase
	tax_lines: TaxLine[];
	// eslint-disable-next-line camelcase
	total_tax: string;
}

interface TotalsTaxesProps {
	className?: string;
	currency: Currency;
	values: Values;
}

const TotalsTaxes = ( {
	currency,
	values,
	className,
}: TotalsTaxesProps ): JSX.Element | null => {
	const { total_tax: totalTax, tax_lines: taxLines } = values;

	if ( ! TAXES_ENABLED ) {
		return null;
	}

	if ( ! DISPLAY_ITEMIZED_TAXES ) {
		return (
			<TotalsItem
				className={ classnames(
					'wc-block-components-totals-taxes',
					className
				) }
				currency={ currency }
				label={ __( 'Taxes', 'woo-gutenberg-products-block' ) }
				value={ parseInt( totalTax, 10 ) }
			/>
		);
	}

	return (
		<>
			{ taxLines.map( ( { name, price }, i ) => (
				<TotalsItem
					key={ `tax-line-${ i }` }
					className="wc-block-components-totals-taxes"
					currency={ currency }
					label={ name }
					value={ parseInt( price, 10 ) }
				/>
			) ) }{ ' ' }
		</>
	);
};

export default TotalsTaxes;
