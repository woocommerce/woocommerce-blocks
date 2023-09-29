/**
 * External dependencies
 */
import { store, getContext as getContextFn } from '@woocommerce/interactivity';
import { select, subscribe } from '@wordpress/data';
import { CART_STORE_KEY as storeKey } from '@woocommerce/block-data';
import { Cart } from '@woocommerce/type-defs/cart';
// import { createRoot } from '@wordpress/element';
// import NoticeBanner from '@woocommerce/base-components/notice-banner';

export interface Context {
	isLoading: boolean;
	addToCartText: string;
	productId: number;
	displayViewCart: boolean;
	quantityToAdd: number;
	temporaryNumberOfItems: number;
	animationStatus: AnimationStatus;
}

enum AnimationStatus {
	IDLE = 'IDLE',
	SLIDE_OUT = 'SLIDE-OUT',
	SLIDE_IN = 'SLIDE-IN',
}

export interface Store {
	state: {
		cart?: Cart;
		inTheCartText?: string;
	};
	selectors: {
		numberOfItemsInTheCart: number;
		hasCartLoaded: boolean;
		slideInAnimation: boolean;
		slideOutAnimation: boolean;
		addToCartText: string;
		displayViewCart: boolean;
	};
	actions: {
		addToCart: () => void;
		handleAnimationEnd: ( event: AnimationEvent ) => void;
		__addToCart: () => void;
	};
	callbacks: {
		startAnimation: () => void;
		syncTemporaryNumberOfItemsOnLoad: () => void;
	};
}

const getContext = () => getContextFn< Context >( 'woo' );

const getProductById = ( cartState: Cart | undefined, productId: number ) => {
	return cartState?.items.find( ( item ) => item.id === productId );
};

const getTextButton = (
	addToCart: string,
	inTheCart: string,
	numberOfItems: number
): string => {
	if ( numberOfItems === 0 ) return addToCart;
	return inTheCart.replace( '###', numberOfItems.toString() );
};

const { state, selectors, actions } = store< Store >(
	'woo',
	{
		selectors: {
			get numberOfItemsInTheCart() {
				const { productId } = getContext();
				const product = getProductById( state.cart, productId );
				return product?.quantity || 0;
			},
			get hasCartLoaded(): boolean {
				return !! state.cart;
			},
			get addToCartText(): string {
				const context = getContext();
				// We use the temporary number of items when there's no animation, or the
				// second part of the animation hasn't started.
				if (
					context.animationStatus === AnimationStatus.IDLE ||
					context.animationStatus === AnimationStatus.SLIDE_OUT
				) {
					return getTextButton(
						context.addToCartText,
						state.inTheCartText!,
						context.temporaryNumberOfItems
					);
				}
				return getTextButton(
					context.addToCartText,
					state.inTheCartText!,
					selectors.numberOfItemsInTheCart
				);
			},
			get displayViewCart(): boolean {
				const context = getContext();
				if ( ! context.displayViewCart ) return false;
				if ( ! selectors.hasCartLoaded ) {
					return context.temporaryNumberOfItems > 0;
				}
				return selectors.numberOfItemsInTheCart > 0;
			},
		},
		actions: {
			*addToCart() {
				yield import( './frontend-add-to-cart' );
				yield actions.__addToCart();
			},
		},
		callbacks: {
			syncTemporaryNumberOfItemsOnLoad: () => {
				const context = getContext();
				// If the cart has loaded when we instantiate this element, we sync
				// the temporary number of items with the number of items in the cart
				// to avoid triggering the animation. We do this only once, but we
				// use useLayoutEffect to avoid the useEffect flickering.
				if ( selectors.hasCartLoaded ) {
					context.temporaryNumberOfItems =
						selectors.numberOfItemsInTheCart;
				}
			},
		},
	},
	{
		afterLoad: () => {
			// Subscribe to changes in Cart data.
			subscribe( () => {
				const cartData = select( storeKey ).getCartData();
				const isResolutionFinished =
					select( storeKey ).hasFinishedResolution( 'getCartData' );
				if ( isResolutionFinished ) {
					state.cart = cartData;
				}
			}, storeKey );

			// This selector triggers a fetch of the Cart data. It is done in a
			// `requestIdleCallback` to avoid potential performance issues.
			requestIdleCallback( () => {
				if ( ! selectors.hasCartLoaded ) {
					select( storeKey ).getCartData();
				}
			} );
		},
	}
);

interface WooTestCtx {
	emoji: string;
}

store( 'woo-test', {
	selectors: {
		get addToCartText(): string {
			const ctx = getContextFn< WooTestCtx >( 'woo-test' );
			return `${ selectors.addToCartText } ${ ctx.emoji }`;
		},
	},
} );
