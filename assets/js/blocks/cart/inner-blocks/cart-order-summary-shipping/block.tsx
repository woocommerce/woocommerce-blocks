/**
 * External dependencies
 */
import { TotalsShipping } from '@woocommerce/base-components/cart-checkout';
import { getCurrencyFromPriceResponse } from '@woocommerce/price-format';
import { useStoreCart } from '@woocommerce/base-context/hooks';

const Block = ( {
	className,
	isShippingCalculatorEnabled,
}: {
	className: string;
	isShippingCalculatorEnabled: boolean;
} ): JSX.Element | null => {
	const { cartTotals, cartNeedsShipping } = useStoreCart();

	if ( ! cartNeedsShipping ) {
		return null;
	}

	const totalsCurrency = getCurrencyFromPriceResponse( cartTotals );

	return (
		<TotalsShipping
			className={ `${ className } wc-block-components-totals-wrapper` }
			showCalculator={ isShippingCalculatorEnabled }
			showRateSelector={ true }
			values={ cartTotals }
			currency={ totalsCurrency }
		/>
	);
};

export default Block;
