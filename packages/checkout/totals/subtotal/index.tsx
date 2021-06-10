/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import type { Currency } from '@woocommerce/price-format';
import type { ReactElement } from 'react';
import { getSetting } from '@woocommerce/settings';

/**
 * Internal dependencies
 */
import TotalsItem from '../item';

interface Values {
	// eslint-disable-next-line camelcase
	totalItems: string;
	// eslint-disable-next-line camelcase
	totalItemsTax: string;
}

interface SubtotalProps {
	className?: string;
	currency: Currency;
	values: Values | Record< string, never >;
}

const Subtotal = ( {
	currency,
	values,
	className,
}: SubtotalProps ): ReactElement => {
	const { totalItems: totalItems, totalItemsTax: totalItemsTax } = values;
	const itemsValue = parseInt( totalItems, 10 );
	const itemsTaxValue = parseInt( totalItemsTax, 10 );

	return (
		<TotalsItem
			className={ className }
			currency={ currency }
			label={ __( 'Subtotal', 'woo-gutenberg-products-block' ) }
			value={
				getSetting( 'displayCartPricesIncludingTax', false )
					? itemsValue + itemsTaxValue
					: itemsValue
			}
		/>
	);
};

export default Subtotal;
