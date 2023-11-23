/**
 * External dependencies
 */
import { getCurrencyFromPriceResponse } from '@woocommerce/price-format';
import { useStoreCart } from '@woocommerce/base-context/hooks';
import { TotalsWrapper } from '@woocommerce/blocks-checkout';

/**
 * Internal dependencies
 */
import { TotalsShipping } from '~/base/components/cart-checkout';

const Block = ( {
	className = '',
}: {
	className?: string;
} ): JSX.Element | null => {
	const { cartTotals, cartNeedsShipping } = useStoreCart();

	if ( ! cartNeedsShipping ) {
		return null;
	}

	const totalsCurrency = getCurrencyFromPriceResponse( cartTotals );

	return (
		<TotalsWrapper className={ className }>
			<TotalsShipping
				showCalculator={ false }
				showRateSelector={ false }
				values={ cartTotals }
				currency={ totalsCurrency }
				isCheckout={ true }
			/>
		</TotalsWrapper>
	);
};

export default Block;
