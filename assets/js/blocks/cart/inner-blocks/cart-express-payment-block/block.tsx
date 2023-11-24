/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { useStoreCart } from '~/base/context/hooks';
import { CartExpressPayment } from '../../../cart-checkout-shared/payment-methods';

const Block = ( { className }: { className: string } ): JSX.Element | null => {
	const { cartNeedsPayment } = useStoreCart();

	if ( ! cartNeedsPayment ) {
		return null;
	}

	return (
		<div
			className={ classnames(
				'wc-block-cart__payment-options',
				className
			) }
		>
			<CartExpressPayment />
		</div>
	);
};

export default Block;
