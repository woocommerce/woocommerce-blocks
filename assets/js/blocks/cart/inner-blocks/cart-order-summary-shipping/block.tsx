/**
 * External dependencies
 */
import { getCurrencyFromPriceResponse } from '@woocommerce/price-format';
import { TotalsWrapper } from '@woocommerce/blocks-components';
import { getSetting } from '@woocommerce/settings';

/**
 * Internal dependencies
 */
import { useStoreCart } from '~/base/context/hooks';
import { TotalsShipping } from '~/base/components/cart-checkout';

const Block = ( { className }: { className: string } ): JSX.Element | null => {
	const { cartTotals, cartNeedsShipping } = useStoreCart();

	if ( ! cartNeedsShipping ) {
		return null;
	}

	const totalsCurrency = getCurrencyFromPriceResponse( cartTotals );

	return (
		<TotalsWrapper className={ className }>
			<TotalsShipping
				showCalculator={ getSetting< boolean >(
					'isShippingCalculatorEnabled',
					true
				) }
				showRateSelector={ true }
				values={ cartTotals }
				currency={ totalsCurrency }
			/>
		</TotalsWrapper>
	);
};

export default Block;
