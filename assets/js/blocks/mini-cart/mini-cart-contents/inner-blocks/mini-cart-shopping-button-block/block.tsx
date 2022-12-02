/**
 * External dependencies
 */
import { SHOP_URL } from '@woocommerce/block-settings';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { defaultShoppingButtonLabel } from './constants';

type MiniCartShoppingButtonBlockProps = {
	className: string;
	shoppingButtonLabel: string;
};

const Block = ( {
	className,
	shoppingButtonLabel,
}: MiniCartShoppingButtonBlockProps ): JSX.Element | null => {
	if ( ! SHOP_URL ) {
		return null;
	}

	return (
		<div
			className={ classNames(
				className,
				'wc-block-mini-cart__shopping-button'
			) }
		>
			<a href={ SHOP_URL }>
				{ shoppingButtonLabel || defaultShoppingButtonLabel }
			</a>
		</div>
	);
};

export default Block;
