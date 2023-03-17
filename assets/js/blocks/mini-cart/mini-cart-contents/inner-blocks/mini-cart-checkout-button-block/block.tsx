/**
 * External dependencies
 */
import { CHECKOUT_URL } from '@woocommerce/block-settings';
import Button from '@woocommerce/base-components/button';
import classNames from 'classnames';
import { useColorProps } from '@woocommerce/base-hooks';

/**
 * Internal dependencies
 */
import { defaultCheckoutButtonLabel } from './constants';

type MiniCartCheckoutButtonBlockProps = {
	checkoutButtonLabel: string;
	className: string;
	style: string;
};

const Block = ( {
	className,
	checkoutButtonLabel,
	style,
}: MiniCartCheckoutButtonBlockProps ): JSX.Element | null => {
	const colorProps = useColorProps( { style } );

	return (
		<div className="wp-block-button has-text-align-center">
			{ CHECKOUT_URL && (
				<Button
					className={ classNames(
						className,
						colorProps.className,
						'wc-block-mini-cart__checkout-button'
					) }
					style={ { ...colorProps.style } }
					href={ CHECKOUT_URL }
				>
					{ checkoutButtonLabel || defaultCheckoutButtonLabel }
				</Button>
			) }
		</div>
	);
};

export default Block;
