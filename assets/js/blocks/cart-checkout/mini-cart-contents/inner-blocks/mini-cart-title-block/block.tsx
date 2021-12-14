/**
 * External dependencies
 */
import { sprintf, _n, __ } from '@wordpress/i18n';
import { useStoreCart } from '@woocommerce/base-context/hooks';

const Block = (): JSX.Element => {
	const { cartItemsCount, cartIsLoading } = useStoreCart();
	return (
		<h2 className="mini-cart-title-block">
			{ cartIsLoading
				? __( 'Your cart', 'woo-gutenberg-products-block' )
				: sprintf(
						/* translators: %d is the count of items in the cart. */
						_n(
							'Your cart (%d item)',
							'Your cart (%d items)',
							cartItemsCount,
							'woo-gutenberg-products-block'
						),
						cartItemsCount
				  ) }
		</h2>
	);
};

export default Block;
