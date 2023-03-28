/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { _n, sprintf } from '@wordpress/i18n';
import { useStoreCart } from '@woocommerce/base-context';

export const Edit = (): JSX.Element => {
	const blockProps = useBlockProps();
	const { cartItemsCount } = useStoreCart();

	return (
		<h2 { ...blockProps }>
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

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() }></div>;
};
