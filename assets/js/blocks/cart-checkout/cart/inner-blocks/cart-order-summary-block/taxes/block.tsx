/**
 * External dependencies
 */
import { TotalsTaxes } from '@woocommerce/blocks-checkout';
import { getCurrencyFromPriceResponse } from '@woocommerce/price-format';
import { useStoreCart } from '@woocommerce/base-context/hooks';
import { getSetting } from '@woocommerce/settings';

const Block = ( { className }: { className: string } ): JSX.Element | null => {
	const showRateAfterTaxName = true; // @todo move
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
