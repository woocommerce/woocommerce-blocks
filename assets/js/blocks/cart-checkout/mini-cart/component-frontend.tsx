/**
 * External dependencies
 */
import { __, _n, sprintf } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { renderFrontend } from '@woocommerce/base-utils';
import { useStoreCart } from '@woocommerce/base-context/hooks';
import Drawer from '@woocommerce/base-components/drawer';
import {
	withStoreCartApiHydration,
	withRestApiHydration,
} from '@woocommerce/block-hocs';

/**
 * Internal dependencies
 */
import CartLineItemsTable from '../cart/full-cart/cart-line-items-table';
import './style.scss';

interface MiniCartBlock {
	isPlaceholderOpen?: boolean;
}

const MiniCartBlock = ( { isPlaceholderOpen = false } ): JSX.Element => {
	const { cartItems, cartItemsCount, cartIsLoading } = useStoreCart();
	const [ isOpen, setIsOpen ] = useState< boolean >( isPlaceholderOpen );
	// We already rendered the HTML drawer placeholder, so we want to skip the
	// slide in animation.
	const [ skipSlideIn, setSkipSlideIn ] = useState< boolean >(
		isPlaceholderOpen
	);

	const contents =
		cartItems.length === 0 ? (
			<>{ __( 'Cart is empty', 'woo-gutenberg-products-block' ) }</>
		) : (
			<div className="is-mobile">
				<CartLineItemsTable
					lineItems={ cartItems }
					isLoading={ cartIsLoading }
				/>
			</div>
		);

	return (
		<>
			<button
				className="wc-block-mini-cart__button"
				onClick={ () => {
					setIsOpen( true );
					setSkipSlideIn( false );
				} }
			>
				{ sprintf(
					/* translators: %d is the count of items in the cart. */
					_n(
						'%d item',
						'%d items',
						cartItemsCount,
						'woo-gutenberg-products-block'
					),
					cartItemsCount
				) }
			</button>
			<Drawer
				title={ sprintf(
					/* translators: %d is the count of items in the cart. */
					_n(
						'Your cart (%d item)',
						'Your cart (%d items)',
						cartItemsCount,
						'woo-gutenberg-products-block'
					),
					cartItemsCount
				) }
				isOpen={ isOpen }
				onClose={ () => {
					setIsOpen( false );
				} }
				slideIn={ ! skipSlideIn }
			>
				{ contents }
			</Drawer>
		</>
	);
};

const getProps = ( el: HTMLElement ) => ( {
	isPlaceholderOpen: el.dataset.isPlaceholderOpen,
} );

renderFrontend( {
	selector: '.wc-block-mini-cart',
	Block: withStoreCartApiHydration( withRestApiHydration( MiniCartBlock ) ),
	getProps,
} );

document.querySelectorAll( '.wc-block-mini-cart' ).forEach( ( miniCartEl ) => {
	miniCartEl.classList.remove( 'wc-block-mini-cart--is-loading' );
} );
