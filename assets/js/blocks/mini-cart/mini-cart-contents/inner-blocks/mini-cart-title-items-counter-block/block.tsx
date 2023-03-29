/**
 * External dependencies
 */
import { useStoreCart } from '@woocommerce/base-context';
import classNames from 'classnames';
import { _n, sprintf } from '@wordpress/i18n';
import { useColorProps, useTypographyProps } from '@woocommerce/base-hooks';

type Props = {
	className?: string;
};

const Block = ( props: Props ): JSX.Element => {
	const { cartItemsCount } = useStoreCart();
	const colorProps = useColorProps( props );
	const typographyProps = useTypographyProps( props );

	return (
		<h2
			className={ classNames(
				props.className,
				colorProps.className,
				typographyProps.className
			) }
			style={ {
				...colorProps.style,
				...typographyProps.style,
			} }
		>
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
