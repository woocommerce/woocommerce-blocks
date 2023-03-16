/**
 * External dependencies
 */
import { SHOP_URL } from '@woocommerce/block-settings';
import Button from '@woocommerce/base-components/button';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { defaultCheckoutButtonLabel } from './constants';

type MiniCartCheckoutButtonBlockProps = {
	className: string;
	checkoutButtonLabel: string;
};

const Block = ( {
	className,
	checkoutButtonLabel,
}: MiniCartCheckoutButtonBlockProps ): JSX.Element | null => {
	return (
		<div className="wp-block-button has-text-align-center">
			<Button
				className={ classNames(
					className,
					'wc-block-mini-cart__checkout-button'
				) }
				href={ SHOP_URL }
			>
				{ checkoutButtonLabel || defaultCheckoutButtonLabel }
			</Button>
		</div>
	);
};

export default Block;
