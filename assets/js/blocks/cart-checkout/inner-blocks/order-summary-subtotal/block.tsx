/**
 * External dependencies
 */
import { Subtotal } from '@woocommerce/blocks-checkout';
import { getCurrencyFromPriceResponse } from '@woocommerce/price-format';
import { useStoreCart } from '@woocommerce/base-context';

const Block = ( { className }: { className: string } ): JSX.Element => {
	const { cartTotals } = useStoreCart();
	const totalsCurrency = getCurrencyFromPriceResponse( cartTotals );

	return (
		<Subtotal
			className={ className }
			currency={ totalsCurrency }
			values={ cartTotals }
		/>
	);
};

export default Block;
