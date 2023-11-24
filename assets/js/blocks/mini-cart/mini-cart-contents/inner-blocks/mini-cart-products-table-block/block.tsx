/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { useStoreCart } from '~/base/context/hooks';
import { CartLineItemsTable } from '~/base/components/cart-checkout';

type MiniCartProductsTableBlockProps = {
	className: string;
};

const Block = ( {
	className,
}: MiniCartProductsTableBlockProps ): JSX.Element => {
	const { cartItems, cartIsLoading } = useStoreCart();
	return (
		<div
			className={ classNames(
				className,
				'wc-block-mini-cart__products-table'
			) }
		>
			<CartLineItemsTable
				lineItems={ cartItems }
				isLoading={ cartIsLoading }
				className="wc-block-mini-cart-items"
			/>
		</div>
	);
};

export default Block;
