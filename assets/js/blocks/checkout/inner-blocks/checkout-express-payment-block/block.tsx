/**
 * External dependencies
 */
import { useStoreCart } from '@woocommerce/base-context';

/**
 * Internal dependencies
 */
import { CheckoutExpressPayment } from '../../../cart-checkout/payment-methods';

const Block = ( { className }: { className?: string } ): JSX.Element | null => {
	const { cartNeedsPayment } = useStoreCart();

	if ( ! cartNeedsPayment ) {
		return null;
	}

	return (
		<div className={ className }>
			<CheckoutExpressPayment />
		</div>
	);
};

export default Block;
