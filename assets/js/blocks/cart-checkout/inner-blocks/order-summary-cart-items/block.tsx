/**
 * External dependencies
 */
import { OrderSummary } from '@woocommerce/base-components/cart-checkout';
import { useStoreCart } from '@woocommerce/base-context';

const Block = ( { className }: { className: string } ): JSX.Element => {
	const { cartItems } = useStoreCart();

	return <OrderSummary className={ className } cartItems={ cartItems } />;
};

export default Block;
