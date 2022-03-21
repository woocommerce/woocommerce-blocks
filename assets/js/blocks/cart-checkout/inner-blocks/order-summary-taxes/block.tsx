/**
 * External dependencies
 */
import { TotalsTaxes } from '@woocommerce/blocks-checkout';
import { getCurrencyFromPriceResponse } from '@woocommerce/price-format';
import { useStoreCart } from '@woocommerce/base-context';
import { getSetting } from '@woocommerce/settings';

const Block = ( {
	className,
	showRateAfterTaxName,
}: {
	className: string;
	showRateAfterTaxName: boolean;
} ): JSX.Element | null => {
	const { cartTotals } = useStoreCart();
	const totalsCurrency = getCurrencyFromPriceResponse( cartTotals );
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

	return (
		<TotalsTaxes
			className={ className }
			showRateAfterTaxName={ showRateAfterTaxName }
			currency={ totalsCurrency }
			values={ cartTotals }
		/>
	);
};

export default Block;
