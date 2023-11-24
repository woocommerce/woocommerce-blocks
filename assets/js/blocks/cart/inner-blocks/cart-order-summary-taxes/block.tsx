/**
 * External dependencies
 */
import { TotalsTaxes, TotalsWrapper } from '@woocommerce/blocks-components';
import { getCurrencyFromPriceResponse } from '@woocommerce/price-format';
import { getSetting } from '@woocommerce/settings';

/**
 * Internal dependencies
 */
import { useStoreCart } from '~/base/context/hooks';

const Block = ( {
	className,
	showRateAfterTaxName,
}: {
	className: string;
	showRateAfterTaxName: boolean;
} ): JSX.Element | null => {
	const { cartTotals } = useStoreCart();

	const displayCartPricesIncludingTax = getSetting(
		'displayCartPricesIncludingTax',
		false
	);

	if (
		displayCartPricesIncludingTax ||
		parseInt( cartTotals.total_tax, 10 ) <= 0
	) {
		return null;
	}

	const totalsCurrency = getCurrencyFromPriceResponse( cartTotals );

	return (
		<TotalsWrapper className={ className }>
			<TotalsTaxes
				showRateAfterTaxName={ showRateAfterTaxName }
				currency={ totalsCurrency }
				values={ cartTotals }
			/>
		</TotalsWrapper>
	);
};

export default Block;
