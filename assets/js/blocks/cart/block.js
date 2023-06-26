/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useStoreCart } from '@woocommerce/base-context/hooks';
import { useEffect } from '@wordpress/element';
import LoadingMask from '@woocommerce/base-components/loading-mask';
import { CURRENT_USER_IS_ADMIN } from '@woocommerce/settings';
import BlockErrorBoundary from '@woocommerce/base-components/block-error-boundary';
import { translateJQueryEventToNative } from '@woocommerce/base-utils';
import withScrollToTop from '@woocommerce/base-hocs/with-scroll-to-top';
import {
	CartEventsProvider,
	CartProvider,
	noticeContexts,
} from '@woocommerce/base-context';
import {
	registerCartItemDataControl,
	SlotFillProvider,
	StoreNoticesContainer,
} from '@woocommerce/blocks-checkout';

/**
 * Internal dependencies
 */
import { CartBlockContext } from './context';
import './style.scss';

const reloadPage = () => void window.location.reload( true );

const Cart = ( { children, attributes = {} } ) => {
	const { cartIsLoading } = useStoreCart();
	const { hasDarkControls } = attributes;

	/**
	 * The code in this useEffect would be in an extension.
	 */
	useEffect( () => {
		registerCartItemDataControl( 'wc-blocks/cart-item', {
			key: 'gift-wrapping',
			type: 'checkbox',
			onChange: ( newValue ) => {
				console.log( 'new value of gift-wrapping', newValue );
			},
			isVisible: ( args, cartItem ) => {
				return !! cartItem;
			},
		} );
		registerCartItemDataControl( 'wc-blocks/cart-item', {
			key: 'giftMessage',
			type: 'text',
			onChange: ( newValue ) => {
				console.log( 'we will write a message: ', newValue );
			},
			isVisible: ( args, cartItem ) => {
				return !! cartItem;
			},
		} );
	}, [] );

	return (
		<LoadingMask showSpinner={ true } isLoading={ cartIsLoading }>
			<CartBlockContext.Provider
				value={ {
					hasDarkControls,
				} }
			>
				{ children }
			</CartBlockContext.Provider>
		</LoadingMask>
	);
};

const ScrollOnError = ( { scrollToTop } ) => {
	useEffect( () => {
		// Make it so we can read jQuery events triggered by WC Core elements.
		const removeJQueryAddedToCartEvent = translateJQueryEventToNative(
			'added_to_cart',
			'wc-blocks_added_to_cart'
		);

		document.body.addEventListener(
			'wc-blocks_added_to_cart',
			scrollToTop
		);

		return () => {
			removeJQueryAddedToCartEvent();

			document.body.removeEventListener(
				'wc-blocks_added_to_cart',
				scrollToTop
			);
		};
	}, [ scrollToTop ] );

	return null;
};
const Block = ( { attributes, children, scrollToTop } ) => (
	<BlockErrorBoundary
		header={ __(
			'Something went wrong. Please contact us for assistance.',
			'woo-gutenberg-products-block'
		) }
		text={ __(
			'The cart has encountered an unexpected error. If the error persists, please get in touch with us for help.',
			'woo-gutenberg-products-block'
		) }
		button={
			<button className="wc-block-button" onClick={ reloadPage }>
				{ __( 'Reload the page', 'woo-gutenberg-products-block' ) }
			</button>
		}
		showErrorMessage={ CURRENT_USER_IS_ADMIN }
	>
		<StoreNoticesContainer context={ noticeContexts.CART } />
		<SlotFillProvider>
			<CartProvider>
				<CartEventsProvider>
					<Cart attributes={ attributes }>{ children }</Cart>
					<ScrollOnError scrollToTop={ scrollToTop } />
				</CartEventsProvider>
			</CartProvider>
		</SlotFillProvider>
	</BlockErrorBoundary>
);
export default withScrollToTop( Block );
