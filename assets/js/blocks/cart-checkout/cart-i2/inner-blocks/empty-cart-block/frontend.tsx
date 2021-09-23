/**
 * External dependencies
 */
import { useStoreCart } from '@woocommerce/base-context/hooks';

const FrontendBlock = ( {
	children,
}: {
	children: JSX.Element;
} ): JSX.Element | null => {
	const { cartItems, cartIsLoading } = useStoreCart();
	if ( ! cartIsLoading && cartItems.length === 0 ) {
		return <div>{ children }</div>;
	}
	return null;
};

export default FrontendBlock;
