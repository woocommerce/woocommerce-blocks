/**
 * External dependencies
 */
import { store, getContext as getContextFn } from '@woocommerce/interactivity';
import { select, subscribe } from '@wordpress/data';
import { dispatch } from '@wordpress/data';
import { CART_STORE_KEY as storeKey } from '@woocommerce/block-data';
import { Cart } from '@woocommerce/type-defs/cart';

// import { createRoot } from '@wordpress/element';
// import NoticeBanner from '@woocommerce/base-components/notice-banner';

interface Context {
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

interface Store {
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
	};
	callbacks: {
		startAnimation: () => void;
		syncTemporaryNumberOfItemsOnLoad: () => void;
	};
}

// RequestIdleCallback is not available in Safari, so we use setTimeout as an alternative.
const callIdleCallback =
	window.requestIdleCallback || ( ( cb ) => setTimeout( cb, 100 ) );

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

const getContext = getContextFn< Context >;

const { state } = store< Store >( 'woocommerce/product-button', {
	state: {
		get slideInAnimation() {
			const { animationStatus } = getContext();
			return animationStatus === AnimationStatus.SLIDE_IN;
		},
		get slideOutAnimation() {
			const { animationStatus } = getContext();
			return animationStatus === AnimationStatus.SLIDE_OUT;
		},
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
				state.numberOfItemsInTheCart
			);
		},
		get displayViewCart(): boolean {
			const { displayViewCart, temporaryNumberOfItems } = getContext();
			if ( ! displayViewCart ) return false;
			if ( ! state.hasCartLoaded ) {
				return temporaryNumberOfItems > 0;
			}
			return state.numberOfItemsInTheCart > 0;
		},
	},
	actions: {
		*addToCart() {
			const context = getContext();
			const { productId, quantityToAdd } = context;

			context.isLoading = true;

			try {
				yield dispatch( storeKey ).addItemToCart(
					productId,
					quantityToAdd
				);

				// After the cart is updated, sync the temporary number of items again.
				context.temporaryNumberOfItems = state.numberOfItemsInTheCart;
			} catch ( error ) {
				// eslint-disable-next-line no-console
				console.error( error );
			} finally {
				context.displayViewCart = true;
				context.isLoading = false;
			}
		},
		handleAnimationEnd: ( event: AnimationEvent ) => {
			const context = getContext();
			if ( event.animationName === 'slideOut' ) {
				// When the first part of the animation (slide-out) ends, we move
				// to the second part (slide-in).
				context.animationStatus = AnimationStatus.SLIDE_IN;
			} else if ( event.animationName === 'slideIn' ) {
				// When the second part of the animation ends, we update the
				// temporary number of items to sync it with the cart and reset the
				// animation status so it can be triggered again.
				context.temporaryNumberOfItems = state.numberOfItemsInTheCart;
				context.animationStatus = AnimationStatus.IDLE;
			}
		},
	},
	callbacks: {
		syncTemporaryNumberOfItemsOnLoad: () => {
			const context = getContext();
			// If the cart has loaded when we instantiate this element, we sync
			// the temporary number of items with the number of items in the cart
			// to avoid triggering the animation. We do this only once, but we
			// use useLayoutEffect to avoid the useEffect flickering.
			if ( state.hasCartLoaded ) {
				context.temporaryNumberOfItems = state.numberOfItemsInTheCart;
			}
		},
		startAnimation: () => {
			const context = getContext();
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
} );

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
