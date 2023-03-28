/**
 * External dependencies
 */
import { useStoreCart } from '@woocommerce/base-context';
import classNames from 'classnames';
import { _n, sprintf } from '@wordpress/i18n';

const Block = ( { className }: { className: string } ): JSX.Element => {
	const { cartItemsCount } = useStoreCart();

	return (
		<h2 className={ classNames( className ) }>
			{ sprintf(
				/* translators: %d is the count of items in the cart. */
				_n(
					'(%d item)',
					'(%d items)',
					cartItemsCount,
					'woo-gutenberg-products-block'
				),
				cartItemsCount
			) }
		</h2>
	);
};

export default Block;
