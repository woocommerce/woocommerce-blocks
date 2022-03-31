/**
 * External dependencies
 */
import { Subtotal } from '@woocommerce/blocks-checkout';
import { getCurrencyFromPriceResponse } from '@woocommerce/price-format';
import { useStoreCart } from '@woocommerce/base-context/hooks';

const Block = ( { className = '' }: { className?: string } ): JSX.Element => {
	const { cartTotals } = useStoreCart();
	const totalsCurrency = getCurrencyFromPriceResponse( cartTotals );

	return (
		<Subtotal
			className={ `${ className } wc-block-components-totals-wrapper` }
			currency={ totalsCurrency }
			values={ cartTotals }
		/>
	);
};

export default Block;
