/**
 * External dependencies
 */
import { useStoreCart } from '@woocommerce/base-context/hooks';
import classNames from 'classnames';

type MiniCartTitleBlockProps = {
	className: string;
	children: JSX.Element;
};

const Block = ( {
	children,
	className,
}: MiniCartTitleBlockProps ): JSX.Element | null => {
	const { cartIsLoading } = useStoreCart();
	if ( cartIsLoading ) {
		return null;
	}

	return (
		<div className={ classNames( className, 'wc-block-mini-cart__title' ) }>
			{ children }
		</div>
	);
};

export default Block;
