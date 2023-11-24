/**
 * External dependencies
 */
import { TotalsWrapper } from '@woocommerce/blocks-components';

/**
 * Internal dependencies
 */
import { useStoreCart } from '~/base/context/hooks';
import { OrderSummary } from '~/base/components/cart-checkout';

const Block = ( { className }: { className: string } ): JSX.Element => {
	const { cartItems } = useStoreCart();

	return (
		<TotalsWrapper className={ className }>
			<OrderSummary cartItems={ cartItems } />
		</TotalsWrapper>
	);
};

export default Block;
