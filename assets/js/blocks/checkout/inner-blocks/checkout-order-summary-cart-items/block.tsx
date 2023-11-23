/**
 * External dependencies
 */
import { useStoreCart } from '@woocommerce/base-context/hooks';
import { TotalsWrapper } from '@woocommerce/blocks-components';

/**
 * Internal dependencies
 */
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
