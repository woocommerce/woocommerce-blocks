/**
 * External dependencies
 */
import { TotalsFees } from '@woocommerce/blocks-checkout';
import { getCurrencyFromPriceResponse } from '@woocommerce/price-format';
import { useStoreCart } from '@woocommerce/base-context/hooks';

const Block = ( { className }: { className: string } ): JSX.Element => {
	const { cartFees, cartTotals } = useStoreCart();
	const totalsCurrency = getCurrencyFromPriceResponse( cartTotals );

	return (
		<TotalsFees
			className={ `${ className } wc-block-components-totals-wrapper` }
			currency={ totalsCurrency }
			cartFees={ cartFees }
		/>
	);
};

export default Block;
