/**
 * External dependencies
 */
import { CART_URL } from '@woocommerce/block-settings';
import Button from '@woocommerce/base-components/button';
import classNames from 'classnames';
import { useColorProps } from '@woocommerce/base-hooks';
import { useSelect } from '@wordpress/data';
import { CHECKOUT_STORE_KEY } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import { defaultCartButtonLabel } from './constants';
import { getVariant } from '../utils';

type MiniCartCartButtonBlockProps = {
	cartButtonLabel?: string;
	className?: string;
	style?: string;
};

const Block = ( {
	cartButtonLabel,
	className,
	style,
}: MiniCartCartButtonBlockProps ): JSX.Element | null => {
	const colorProps = useColorProps( { style } );

	const isCalculating = useSelect( ( select ) =>
		select( CHECKOUT_STORE_KEY ).isCalculating()
	);

	if ( ! CART_URL ) {
		return null;
	}

	return (
		<Button
			className={ classNames(
				className,
				colorProps.className,
				'wc-block-mini-cart__footer-cart'
			) }
			style={ { ...colorProps.style } }
			href={ CART_URL }
			variant={ getVariant( className, 'outlined' ) }
			showSpinner={ isCalculating }
			disabled={ isCalculating }
		>
			{ cartButtonLabel || defaultCartButtonLabel }
		</Button>
	);
};

export default Block;
