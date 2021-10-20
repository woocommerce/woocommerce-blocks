/**
 * External dependencies
 */
import classNames from 'classnames';
import { __, _n, sprintf } from '@wordpress/i18n';
import { useState, useEffect, useRef } from '@wordpress/element';
import { dispatch } from '@wordpress/data';
import {
	translateJQueryEventToNative,
	getIconsFromPaymentMethods,
} from '@woocommerce/base-utils';
import {
	useStoreCart,
	usePaymentMethods,
} from '@woocommerce/base-context/hooks';
import Drawer from '@woocommerce/base-components/drawer';
import { CART_STORE_KEY as storeKey } from '@woocommerce/block-data';
import {
	formatPrice,
	getCurrencyFromPriceResponse,
} from '@woocommerce/price-format';
import { getSetting } from '@woocommerce/settings';
import { TotalsItem } from '@woocommerce/blocks-checkout';
import PaymentMethodIcons from '@woocommerce/base-components/cart-checkout/payment-method-icons';

/**
 * Internal dependencies
 */
import CartLineItemsTable from '../cart/full-cart/cart-line-items-table';
import CheckoutButton from '../cart/checkout-button';
import './style.scss';

interface MiniCartBlockProps {
	isPlaceholderOpen?: boolean;
}

const MiniCartBlock = ( {
	isPlaceholderOpen = false,
}: MiniCartBlockProps ): JSX.Element => {
	const {
		cartItems,
		cartItemsCount,
		cartIsLoading,
		cartTotals,
	} = useStoreCart();
	const [ isOpen, setIsOpen ] = useState< boolean >( isPlaceholderOpen );
	const emptyCartRef = useRef< HTMLDivElement | null >( null );
	// We already rendered the HTML drawer placeholder, so we want to skip the
	// slide in animation.
	const [ skipSlideIn, setSkipSlideIn ] = useState< boolean >(
		isPlaceholderOpen
	);
	const { paymentMethods } = usePaymentMethods();

	useEffect( () => {
		const openMiniCartAndRefreshData = ( e ) => {
			const eventDetail = e.detail;
			if ( ! eventDetail || ! eventDetail.preserveCartData ) {
				dispatch( storeKey ).invalidateResolutionForStore();
			}
			setSkipSlideIn( false );
			setIsOpen( true );
		};

		// Make it so we can read jQuery events triggered by WC Core elements.
		const removeJQueryAddedToCartEvent = translateJQueryEventToNative(
			'added_to_cart',
			'wc-blocks_added_to_cart'
		);

		document.body.addEventListener(
			'wc-blocks_added_to_cart',
			openMiniCartAndRefreshData
		);

		return () => {
			removeJQueryAddedToCartEvent();

			document.body.removeEventListener(
				'wc-blocks_added_to_cart',
				openMiniCartAndRefreshData
			);
		};
	}, [] );

	useEffect( () => {
		// If the cart has been completely emptied, move focus to empty cart
		// element.
		if ( isOpen && ! cartIsLoading && cartItems.length === 0 ) {
			if ( emptyCartRef.current instanceof HTMLElement ) {
				emptyCartRef.current.focus();
			}
		}
	}, [ isOpen, cartIsLoading, cartItems.length, emptyCartRef ] );

	const subTotal = getSetting( 'displayCartPricesIncludingTax', false )
		? parseInt( cartTotals.total_items, 10 ) +
		  parseInt( cartTotals.total_items_tax, 10 )
		: parseInt( cartTotals.total_items, 10 );

	const ariaLabel = sprintf(
		/* translators: %1$d is the number of products in the cart. %2$s is the cart total */
		_n(
			'%1$d item in cart, total price of %2$s',
			'%1$d items in cart, total price of %2$s',
			cartItemsCount,
			'woo-gutenberg-products-block'
		),
		cartItemsCount,
		formatPrice( subTotal, getCurrencyFromPriceResponse( cartTotals ) )
	);

	const contents =
		! cartIsLoading && cartItems.length === 0 ? (
			<div
				className="wc-block-mini-cart__empty-cart"
				tabIndex={ -1 }
				ref={ emptyCartRef }
			>
				{ __( 'Cart is empty', 'woo-gutenberg-products-block' ) }
			</div>
		) : (
			<>
				<div className="wc-block-mini-cart__items">
					<CartLineItemsTable
						lineItems={ cartItems }
						isLoading={ cartIsLoading }
					/>
				</div>
				<div className="wc-block-mini-cart__footer">
					<TotalsItem
						className="wc-block-mini-cart__footer-subtotal"
						currency={ getCurrencyFromPriceResponse( cartTotals ) }
						label={ __(
							'Subtotal',
							'woo-gutenberg-products-block'
						) }
						value={ subTotal }
						description={ __(
							'Shipping, taxes, and discounts calculated at checkout.',
							'woo-gutenberg-products-block'
						) }
					/>
					<CheckoutButton />
					<PaymentMethodIcons
						icons={ getIconsFromPaymentMethods( paymentMethods ) }
					/>
				</div>
			</>
		);

	return (
		<>
			<button
				className="wc-block-mini-cart__button"
				onClick={ () => {
					if ( ! isOpen ) {
						setIsOpen( true );
						setSkipSlideIn( false );
					}
				} }
				aria-label={ ariaLabel }
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
				className={ classNames(
					'wc-block-mini-cart__drawer',
					'is-mobile',
					{
						'is-loading': cartIsLoading,
					}
				) }
				title={
					cartIsLoading
						? __( 'Your cart', 'woo-gutenberg-products-block' )
						: sprintf(
								/* translators: %d is the count of items in the cart. */
								_n(
									'Your cart (%d item)',
									'Your cart (%d items)',
									cartItemsCount,
									'woo-gutenberg-products-block'
								),
								cartItemsCount
						  )
				}
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

export default MiniCartBlock;
