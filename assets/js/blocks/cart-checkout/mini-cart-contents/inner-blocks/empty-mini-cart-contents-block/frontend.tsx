/**
 * External dependencies
 */
import { useStoreCart } from '@woocommerce/base-context/hooks';
import { dispatchEvent } from '@woocommerce/base-utils';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */

type EmptyMiniCartContentsBlockProps = {
	children: JSX.Element | JSX.Element[];
};

const EmptyMiniCartContentsBlock = ( {
	children,
}: EmptyMiniCartContentsBlockProps ): JSX.Element | null => {
	const { cartItems, cartIsLoading } = useStoreCart();

	useEffect( () => {
		dispatchEvent( 'wc-blocks_render_blocks_frontend', {
			element: document.body.querySelector(
				'.wp-block-woocommerce-cart'
			),
		} );
	}, [] );

	return (
		<>{ ! cartIsLoading && cartItems.length === 0 && <>{ children }</> }</>
	);
};

export default EmptyMiniCartContentsBlock;
