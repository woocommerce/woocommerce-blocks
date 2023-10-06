/**
 * External dependencies
 */
import { store, getContext } from '@woocommerce/interactivity';
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

const { state, actions } = store< Store >(
	'woo',
	{
		state: {
			get slideInAnimation() {
				const { animationStatus } = getContext< Context >();
				return animationStatus === AnimationStatus.SLIDE_IN;
			},
			get slideOutAnimation() {
				const { animationStatus } = getContext< Context >();
				return animationStatus === AnimationStatus.SLIDE_OUT;
			},
			get numberOfItemsInTheCart() {
				const { productId } = getContext< Context >();
				const product = getProductById( state.cart, productId );
				return product?.quantity || 0;
			},
			get hasCartLoaded(): boolean {
				return !! state.cart;
			},
			get addToCartText(): string {
				const context = getContext< Context >();
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
					state.numberOfItemsInTheCart
				);
			},
			get displayViewCart(): boolean {
				const context = getContext< Context >();
				if ( ! context.displayViewCart ) return false;
				if ( ! state.hasCartLoaded ) {
					return context.temporaryNumberOfItems > 0;
				}
				return state.numberOfItemsInTheCart > 0;
			},
		},
		actions: {
			*addToCart() {
				yield import( './frontend-add-to-cart' );
				yield actions.__addToCart();
			},
			handleAnimationEnd: ( event: AnimationEvent ) => {
				const context = getContext< Context >();
				if ( event.animationName === 'slideOut' ) {
					// When the first part of the animation (slide-out) ends, we move
					// to the second part (slide-in).
					context.animationStatus = AnimationStatus.SLIDE_IN;
				} else if ( event.animationName === 'slideIn' ) {
					// When the second part of the animation ends, we update the
					// temporary number of items to sync it with the cart and reset the
					// animation status so it can be triggered again.
					context.temporaryNumberOfItems =
						state.numberOfItemsInTheCart;
					context.animationStatus = AnimationStatus.IDLE;
				}
			},
		},
		callbacks: {
			syncTemporaryNumberOfItemsOnLoad: () => {
				const context = getContext< Context >( 'woo' );
				// If the cart has loaded when we instantiate this element, we sync
				// the temporary number of items with the number of items in the cart
				// to avoid triggering the animation. We do this only once, but we
				// use useLayoutEffect to avoid the useEffect flickering.
				if ( state.hasCartLoaded ) {
					context.temporaryNumberOfItems =
						state.numberOfItemsInTheCart;
				}
			},
			startAnimation: () => {
				const context = getContext< Context >( 'woo' );
				// We start the animation if the cart has loaded, the temporary number
				// of items is out of sync with the number of items in the cart, the
				// button is not loading (because that means the user started the
				// interaction) and the animation hasn't started yet.
				if (
					state.hasCartLoaded &&
					context.temporaryNumberOfItems !==
						state.numberOfItemsInTheCart &&
					! context.isLoading &&
					context.animationStatus === AnimationStatus.IDLE
				) {
					context.animationStatus = AnimationStatus.SLIDE_OUT;
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
				if ( ! state.hasCartLoaded ) {
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
	state: {
		get addToCartText(): string {
			const ctx = getContext< WooTestCtx >();
			return `${ state.addToCartText } ${ ctx.emoji }`;
		},
	},
} );
