/**
 * External dependencies
 */
import { store, getContext as getContextFn } from '@woocommerce/interactivity';
import { dispatch } from '@wordpress/data';
import { CART_STORE_KEY as storeKey } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import type { Context, Store } from './frontend';

enum AnimationStatus {
	IDLE = 'IDLE',
	SLIDE_OUT = 'SLIDE-OUT',
	SLIDE_IN = 'SLIDE-IN',
}

const getContext = () => getContextFn< Context >( 'woo' );

const { selectors } = store< Store >( 'woo', {
	selectors: {
		get slideInAnimation() {
			const { animationStatus } = getContext();
			return animationStatus === AnimationStatus.SLIDE_IN;
		},
		get slideOutAnimation() {
			const { animationStatus } = getContext();
			return animationStatus === AnimationStatus.SLIDE_OUT;
		},
	},
	actions: {
		*__addToCart() {
			const context = getContext();
			const { productId, quantityToAdd } = context;

			context.isLoading = true;

			try {
				yield dispatch( storeKey ).addItemToCart(
					productId,
					quantityToAdd
				);

				// After the cart is updated, sync the temporary number of items again.
				context.temporaryNumberOfItems =
					selectors.numberOfItemsInTheCart;
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
				context.temporaryNumberOfItems =
					selectors.numberOfItemsInTheCart;
				context.animationStatus = AnimationStatus.IDLE;
			}
		},
	},
	callbacks: {
		startAnimation: () => {
			const context = getContext();
			// We start the animation if the cart has loaded, the temporary number
			// of items is out of sync with the number of items in the cart, the
			// button is not loading (because that means the user started the
			// interaction) and the animation hasn't started yet.
			if (
				selectors.hasCartLoaded &&
				context.temporaryNumberOfItems !==
					selectors.numberOfItemsInTheCart &&
				! context.isLoading &&
				context.animationStatus === AnimationStatus.IDLE
			) {
				context.animationStatus = AnimationStatus.SLIDE_OUT;
			}
		},
	},
} );
