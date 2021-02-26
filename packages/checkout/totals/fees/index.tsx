/**
 * External dependencies
 */
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { DISPLAY_CART_PRICES_INCLUDING_TAX } from '@woocommerce/block-settings';
import type { Currency } from '@woocommerce/price-format';

/**
 * Internal dependencies
 */
import TotalsItem from '../item';

interface Totals {
	total: string;
	// eslint-disable-next-line camelcase
	total_tax: string;
}

interface CartFee {
	id: string;
	name: string;
	totals: Totals;
}

interface TotalsFeesProps {
	currency: Currency;
	cartFees: CartFee[];
	className?: string;
}

const TotalsFees = ( {
	currency,
	cartFees,
	className,
}: TotalsFeesProps ): JSX.Element => {
	return (
		<>
			{ cartFees.map( ( { id, name, totals } ) => {
				const feesValue = parseInt( totals.total, 10 );

				if ( ! feesValue ) {
					return null;
				}

				const feesTaxValue = parseInt( totals.total_tax, 10 );

				return (
					<TotalsItem
						key={ id }
						className={ classnames(
							'wc-block-components-totals-fees',
							className
						) }
						currency={ currency }
						label={
							name || __( 'Fee', 'woo-gutenberg-products-block' )
						}
						value={
							DISPLAY_CART_PRICES_INCLUDING_TAX
								? feesValue + feesTaxValue
								: feesValue
						}
					/>
				);
			} ) }
		</>
	);
};

export default TotalsFees;
