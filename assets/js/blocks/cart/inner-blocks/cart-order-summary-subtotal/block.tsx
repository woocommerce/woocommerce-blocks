/**
 * External dependencies
 */
import { Subtotal, TotalsWrapper } from '@woocommerce/blocks-components';
import { getCurrencyFromPriceResponse } from '@woocommerce/price-format';

/**
 * Internal dependencies
 */
import { useStoreCart } from '~/base/context/hooks';

const Block = ( { className = '' }: { className?: string } ): JSX.Element => {
	const { cartTotals } = useStoreCart();
	const totalsCurrency = getCurrencyFromPriceResponse( cartTotals );

	return (
		<TotalsWrapper className={ className }>
			<Subtotal currency={ totalsCurrency } values={ cartTotals } />
		</TotalsWrapper>
	);
};

export default Block;
