/**
 * External dependencies
 */
import { SHOP_URL } from '@woocommerce/block-settings';
import Button from '@woocommerce/base-components/button';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { defaultCartButtonLabel } from './constants';

type MiniCartCartButtonBlockProps = {
	className: string;
	cartButtonLabel: string;
};

const Block = ( {
	className,
	cartButtonLabel,
}: MiniCartCartButtonBlockProps ): JSX.Element | null => {
	return (
		<div className="wp-block-button has-text-align-center">
			<Button
				className={ classNames(
					className,
					'wc-block-mini-cart__cart-button'
				) }
				href={ SHOP_URL }
				variant="outlined"
			>
				{ cartButtonLabel || defaultCartButtonLabel }
			</Button>
		</div>
	);
};

export default Block;
