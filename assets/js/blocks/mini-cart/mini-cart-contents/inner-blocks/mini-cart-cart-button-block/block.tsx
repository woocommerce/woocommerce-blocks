/**
 * External dependencies
 */
import { CART_URL } from '@woocommerce/block-settings';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { useStyleProps } from '~/base/hooks';
import Button from '~/base/components/button';
import { defaultCartButtonLabel } from './constants';
import { getVariant } from '../utils';

type MiniCartCartButtonBlockProps = {
	cartButtonLabel?: string;
	className?: string;
	style?: string;
};

const Block = ( {
	className,
	cartButtonLabel,
	style,
}: MiniCartCartButtonBlockProps ): JSX.Element | null => {
	const styleProps = useStyleProps( { style } );

	if ( ! CART_URL ) {
		return null;
	}

	return (
		<Button
			className={ classNames(
				className,
				styleProps.className,
				'wc-block-mini-cart__footer-cart'
			) }
			style={ styleProps.style }
			href={ CART_URL }
			variant={ getVariant( className, 'outlined' ) }
		>
			{ cartButtonLabel || defaultCartButtonLabel }
		</Button>
	);
};

export default Block;
