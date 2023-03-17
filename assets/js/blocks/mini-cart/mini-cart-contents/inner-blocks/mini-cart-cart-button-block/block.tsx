/**
 * External dependencies
 */
import { CART_URL } from '@woocommerce/block-settings';
import Button from '@woocommerce/base-components/button';
import classNames from 'classnames';
import { useColorProps } from '@woocommerce/base-hooks';

/**
 * Internal dependencies
 */
import { defaultCartButtonLabel } from './constants';

type MiniCartCartButtonBlockProps = {
	cartButtonLabel: string;
	className: string;
	style: string;
};

const Block = ( {
	className,
	cartButtonLabel,
	style,
}: MiniCartCartButtonBlockProps ): JSX.Element | null => {
	const colorProps = useColorProps( { style } );

	return (
		<div className="wp-block-button has-text-align-center">
			{ CART_URL && (
				<Button
					className={ classNames(
						className,
						colorProps.className,
						'wc-block-mini-cart__footer-cart'
					) }
					style={ { ...colorProps.style } }
					href={ CART_URL }
					variant="outlined"
				>
					{ cartButtonLabel || defaultCartButtonLabel }
				</Button>
			) }
		</div>
	);
};

export default Block;
