/**
 * External dependencies
 */
import { CHECKOUT_URL } from '@woocommerce/block-settings';
import Button from '@woocommerce/base-components/button';
import classNames from 'classnames';
import { useColorProps } from '@woocommerce/base-hooks';
import { useSelect } from '@wordpress/data';
import { CHECKOUT_STORE_KEY } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import { defaultCheckoutButtonLabel } from './constants';
import { getVariant } from '../utils';

type MiniCartCheckoutButtonBlockProps = {
	checkoutButtonLabel?: string;
	className?: string;
	style?: string;
};

const Block = ( {
	checkoutButtonLabel,
	className,
	style,
}: MiniCartCheckoutButtonBlockProps ): JSX.Element | null => {
	const colorProps = useColorProps( { style } );

	const isCalculating = useSelect( ( select ) =>
		select( CHECKOUT_STORE_KEY ).isCalculating()
	);

	if ( ! CHECKOUT_URL ) {
		return null;
	}

	return (
		<Button
			className={ classNames(
				className,
				colorProps.className,
				'wc-block-mini-cart__footer-checkout'
			) }
			variant={ getVariant( className, 'contained' ) }
			style={ { ...colorProps.style } }
			href={ CHECKOUT_URL }
			showSpinner={ isCalculating }
			disabled={ isCalculating }
		>
			{ checkoutButtonLabel || defaultCheckoutButtonLabel }
		</Button>
	);
};

export default Block;
