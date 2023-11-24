/**
 * External dependencies
 */
import { getCurrencyFromPriceResponse } from '@woocommerce/price-format';
import { TotalsWrapper } from '@woocommerce/blocks-checkout';

/**
 * Internal dependencies
 */
import { useStoreCart } from '~/base/context/hooks';
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
