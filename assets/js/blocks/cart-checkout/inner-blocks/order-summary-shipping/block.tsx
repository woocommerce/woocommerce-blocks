/**
 * External dependencies
 */
import { TotalsShipping } from '@woocommerce/base-components/cart-checkout';
import { getCurrencyFromPriceResponse } from '@woocommerce/price-format';
import { useStoreCart, useCheckoutContext } from '@woocommerce/base-context';

const Block = ( {
	className,
	isShippingCalculatorEnabled,
}: {
	className: string;
	isShippingCalculatorEnabled: boolean;
} ): JSX.Element | null => {
	const { cartTotals, cartNeedsShipping } = useStoreCart();
	const { isCart } = useCheckoutContext();

	if ( ! cartNeedsShipping ) {
		return null;
	}

	const totalsCurrency = getCurrencyFromPriceResponse( cartTotals );

	return (
		<TotalsShipping
			className={ className }
			showCalculator={ isShippingCalculatorEnabled && isCart }
			showRateSelector={ isCart }
			values={ cartTotals }
			currency={ totalsCurrency }
		/>
	);
};

export default Block;
