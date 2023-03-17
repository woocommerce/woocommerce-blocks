/**
 * External dependencies
 */
import { SHOP_URL } from '@woocommerce/block-settings';
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
			<Button
				className={ classNames(
					className,
					colorProps.className,
					'wc-block-mini-cart__cart-button'
				) }
				style={ { ...colorProps.style } }
				href={ SHOP_URL }
				variant="outlined"
			>
				{ cartButtonLabel || defaultCartButtonLabel }
			</Button>
		</div>
	);
};

export default Block;
