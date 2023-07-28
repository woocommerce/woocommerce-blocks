/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * External dependencies
 */
import { CART_STORE_KEY as storeKey } from '@woocommerce/block-data';
import { store as interactivityStore } from '@woocommerce/interactivity';
import { dispatch, select, subscribe } from '@wordpress/data';
import { Cart } from '@woocommerce/type-defs/cart';
import { createRoot } from '@wordpress/element';
import NoticeBanner from '@woocommerce/base-components/notice-banner';

type Context = {
	woocommerce: {
		isLoading: boolean;
		addToCartText: string;
		productId: number;
		numberOfItems: number;
		productPermalink: string;
		displayViewCart: boolean;
		initialNumberOfItems: number;
		shouldStartAnimation: boolean | undefined;
		slideOutStatus: AnimationStatus;
		slideInStatus: AnimationStatus;
	};
};

enum AnimationStatus {
	NOT_STARTED = 'NOT_STARTED',
	STARTED = 'STARTED',
	FINISHED = 'FINISHED',
}

type State = {
	woocommerce: {
		cart: Cart | undefined;
		prevCart: Cart | undefined;
		inTheCartText: string;
	};
};

const getProductById = ( cartState: Cart | undefined, productId: number ) => {
	return cartState?.items.find( ( item ) => item.id === productId );
};

const getTextButton = ( {
	addToCartText,
	inTheCartText,
	numberOfItems,
}: {
	addToCartText: string;
	inTheCartText: string;
	numberOfItems: number;
} ) => {
	if ( numberOfItems === 0 ) {
		return addToCartText;
	}

	return inTheCartText.replace( '###', numberOfItems.toString() );
};

const productButtonSelectors = {
	woocommerce: {
		addToCartText: ( store: {
			context: Context;
			state: State;
			ref: HTMLElement;
		} ) => {
			const { context, state, selectors } = store;

			if ( ! selectors.woocommerce.hasCartLoaded( store ) ) {
				return getTextButton( {
					addToCartText: context.woocommerce.addToCartText,
					inTheCartText: state.woocommerce.inTheCartText,
					numberOfItems: context.woocommerce.initialNumberOfItems,
				} );
			}

			if (
				context.woocommerce.slideOutStatus ===
					AnimationStatus.FINISHED ||
				context.woocommerce.slideInStatus ===
					AnimationStatus.FINISHED ||
				context.woocommerce.slideInStatus === AnimationStatus.STARTED
			) {
				return getTextButton( {
					addToCartText: context.woocommerce.addToCartText,
					inTheCartText: state.woocommerce.inTheCartText,
					numberOfItems: selectors.woocommerce.numberOfItems( store ),
				} );
			}

			return getTextButton( {
				addToCartText: context.woocommerce.addToCartText,
				inTheCartText: state.woocommerce.inTheCartText,
				numberOfItems:
					selectors.woocommerce.numberOfItems( store ) !==
					context.woocommerce.initialNumberOfItems
						? context.woocommerce.numberOfItems
						: context.woocommerce.initialNumberOfItems,
			} );
		},
		isThereMoreThanOneItem: ( {
			context,
			state,
		}: {
			context: Context;
			state: State;
		} ) => {
			const cartState = state.woocommerce.cart;

			if ( cartState === undefined ) {
				return context.woocommerce.numberOfItems > 0;
			}
			const product = getProductById(
				state.woocommerce.cart,
				context.woocommerce.productId
			);

			return product !== undefined && product.quantity > 0;
		},
		isAdded: ( {
			context,
			selectors,
			state,
		}: {
			context: Context;
			selectors: any;
			state: State;
		} ) => {
			return (
				selectors.woocommerce.isThereMoreThanOneItem( {
					context,
					state,
				} ) && context.woocommerce.displayViewCart
			);
		},
		hasCartLoaded: ( { state }: { state: State } ) => {
			return state.woocommerce.cart !== undefined;
		},
		numberOfItems: ( {
			state,
			context,
		}: {
			selecotrs: any;
			state: State;
			context: Context;
		} ) => {
			const product = getProductById(
				state.woocommerce.cart,
				context.woocommerce.productId
			);

			return product?.quantity || 0;
		},
		numberOfItemsPrev: ( {
			state,
			context,
		}: {
			selecotrs: any;
			state: State;
			context: Context;
		} ) => {
			const product = getProductById(
				state.woocommerce.prevCart,
				context.woocommerce.productId
			);

			return product?.quantity;
		},

		shouldAnimationStart: ( store: {
			context: Context;
			selectors: any;
			state: State;
		} ) => {
			const { context, selectors } = store;

			const isFreshLoad =
				selectors.woocommerce.hasCartLoaded( store ) &&
				context.woocommerce.initialNumberOfItems !==
					selectors.woocommerce.numberOfItems( store ) &&
				context.woocommerce.numberOfItems !==
					selectors.woocommerce.numberOfItems( store );

			const isFromCart =
				selectors.woocommerce.numberOfItemsPrev( store ) !==
					undefined &&
				selectors.woocommerce.numberOfItemsPrev( store ) !==
					selectors.woocommerce.numberOfItems( store ) &&
				selectors.woocommerce.numberOfItems( store ) !==
					context.woocommerce.numberOfItems;

			const isFromUserAction =
				! isFreshLoad &&
				! isFromCart &&
				context.woocommerce.shouldStartAnimation === false;

			return ( isFromCart || isFreshLoad ) && ! isFromUserAction;
		},
		shouldSlideOutAnimationStart: ( store: {
			context: Context;
			selectors: any;
			state: State;
		} ) => {
			const { context, selectors } = store;

			return (
				selectors.woocommerce.shouldAnimationStart( store ) &&
				( context.woocommerce.slideOutStatus ===
					AnimationStatus.NOT_STARTED ||
					context.woocommerce.slideOutStatus === undefined ||
					AnimationStatus.STARTED )
			);
		},
		shouldSlideInAnimationStart: ( store: {
			context: Context;
			selectors: any;
			state: State;
		} ) => {
			const { context } = store;
			return (
				context.woocommerce.slideOutStatus === AnimationStatus.FINISHED
			);
		},
	},
};

interactivityStore(
	// @ts-expect-error: Store function isn't typed.
	{
		selectors: productButtonSelectors,
		actions: {
			woocommerce: {
				addToCart: async ( {
					context,
					ref,
				}: {
					context: Context;
					state: State;
					ref: HTMLElement;
				} ) => {
					if ( ! ref.classList.contains( 'ajax_add_to_cart' ) ) {
						return;
					}

					context.woocommerce.isLoading = true;
					const body = document.body;

					// Allow 3rd parties to validate and quit early. https://github.com/woocommerce/woocommerce/blob/154dd236499d8a440edf3cde712511b56baa8e45/plugins/woocommerce/client/legacy/js/frontend/add-to-cart.js/#L74-L77
					const event = new CustomEvent(
						'should_send_ajax_request.adding_to_cart',
						{ detail: [ ref ], cancelable: true }
					);
					const shouldSendRequest = body.dispatchEvent( event );

					if ( shouldSendRequest === false ) {
						const ajaxNotSentEvent = new CustomEvent(
							'ajax_request_not_sent.adding_to_cart',
							{ detail: [ false, false, ref ] }
						);
						body.dispatchEvent( ajaxNotSentEvent );
						return true;
					}

					context.woocommerce.shouldStartAnimation = false;
					try {
						await dispatch( storeKey ).addItemToCart(
							context.woocommerce.productId,
							1
						);
						context.woocommerce.isLoading = false;
						context.woocommerce.displayViewCart = true;
						context.woocommerce.numberOfItems++;
						context.woocommerce.shouldStartAnimation = undefined;
					} catch ( error ) {
						const domNode = document.querySelector(
							'.wc-block-store-notices'
						);

						const root = createRoot( domNode );

						root.render(
							<NoticeBanner
								status="error"
								onRemove={ () => root.unmount() }
							>
								{ error.message }
							</NoticeBanner>
						);

						domNode?.scrollIntoView( {
							behavior: 'smooth',
							inline: 'nearest',
						} );

						context.woocommerce.isLoading = false;

						// we don't care about errors blocking execution, but will console.error for troubleshooting.
						// eslint-disable-next-line no-console
						console.error( error );
					}
				},
				handleAnimationStart: ( {
					context,
					event,
				}: {
					context: Context;
					event: AnimationEvent;
				} ) => {
					if ( event.animationName === 'slideOut' ) {
						context.woocommerce.slideInStatus =
							AnimationStatus.NOT_STARTED;
						context.woocommerce.slideOutStatus =
							AnimationStatus.STARTED;
					}
					if ( event.animationName === 'slideIn' ) {
						context.woocommerce.slideInStatus =
							AnimationStatus.STARTED;
					}
				},
				handleAnimationEnd: ( {
					event,
					context,
					state,
				}: {
					event: AnimationEvent;
					context: Context;
					state: State;
				} ) => {
					if ( event.animationName === 'slideOut' ) {
						context.woocommerce.slideOutStatus =
							AnimationStatus.FINISHED;
						context.woocommerce.numberOfItems =
							getProductById(
								state.woocommerce.cart,
								context.woocommerce.productId
							)?.quantity || 0;
					}
					if ( event.animationName === 'slideIn' ) {
						context.woocommerce.slideInStatus =
							AnimationStatus.FINISHED;
						context.woocommerce.slideOutStatus =
							AnimationStatus.NOT_STARTED;
					}
				},
			},
		},
	},
	{
		afterLoad: ( { state }: { state: State } ) => {
			// Subscribe to changes in Cart data.
			subscribe( () => {
				const cartData = select( storeKey ).getCartData();
				const isResolutionFinished =
					select( storeKey ).hasFinishedResolution( 'getCartData' );

				if ( isResolutionFinished ) {
					if (
						cartData.itemsCount !==
						state.woocommerce.cart?.itemsCount
					) {
						state.woocommerce.prevCart = state.woocommerce.cart;
					}
					state.woocommerce.cart = cartData;
				}
			}, storeKey );

			// This selector triggers a fetch of the Cart data. It is done in a
			// `requestIdleCallback` to avoid potential performance issues.
			requestIdleCallback( () => {
				select( storeKey ).getCartData();
			} );
		},
	}
);
