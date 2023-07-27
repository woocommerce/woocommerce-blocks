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
		firstAnimationFinished: boolean | undefined;
		shouldStartAnimation: boolean | undefined;
		animationStatus: AnimationStatus;
	};
};

enum AnimationStatus {
	NOT_STARTED = 'NOT_STARTED',
	STARTED = 'STARTED',
	IN_PROGRESS = 'IN_PROGRESS',
	FINISHED = 'FINISHED',
}

type State = {
	woocommerce: {
		cart: Cart | undefined;
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

			if ( selectors.woocommerce.shouldAnimationStart( store ) ) {
				if ( context.woocommerce.firstAnimationFinished ) {
					return getTextButton( {
						addToCartText: context.woocommerce.addToCartText,
						inTheCartText: state.woocommerce.inTheCartText,
						numberOfItems:
							selectors.woocommerce.numberOfItems( store ),
					} );
				}

				return getTextButton( {
					addToCartText: context.woocommerce.addToCartText,
					inTheCartText: state.woocommerce.inTheCartText,
					numberOfItems: context.woocommerce.initialNumberOfItems,
				} );
			}

			return getTextButton( {
				addToCartText: context.woocommerce.addToCartText,
				inTheCartText: state.woocommerce.inTheCartText,
				numberOfItems: selectors.woocommerce.numberOfItems( store ),
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

		shouldAnimationStart: ( store: {
			context: Context;
			selectors: any;
			state: State;
		} ) => {
			const { context, selectors } = store;
			return (
				selectors.woocommerce.hasCartLoaded( store ) &&
				context.woocommerce.initialNumberOfItems !==
					selectors.woocommerce.numberOfItems( store ) &&
				context.woocommerce.shouldStartAnimation !== false
			);
		},
		shouldSlideOutAnimationStart: ( store: {
			context: Context;
			selectors: any;
			state: State;
		} ) => {
			const { context, selectors } = store;
			return (
				selectors.woocommerce.shouldAnimationStart( store ) &&
				context.woocommerce.firstAnimationFinished === undefined
			);
		},
		// eslint-disable-next-line @typescript-eslint/no-shadow
		shouldSlideInAnimationStart: ( store: {
			context: Context;
			selectors: any;
			state: State;
		} ) => {
			const { context, selectors } = store;
			return (
				selectors.woocommerce.shouldAnimationStart( store ) &&
				context.woocommerce.firstAnimationFinished
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
						context.woocommerce.numberOfItems++;
						context.woocommerce.isLoading = false;
						context.woocommerce.displayViewCart = true;
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
				handleAnimationEnd: ( {
					event,
					context,
				}: {
					event: AnimationEvent;
					context: Context;
				} ) => {
					if ( event.animationName === 'slideOut' ) {
						context.woocommerce.firstAnimationFinished = true;
					}
				},
			},
		},
	},
	{
		afterLoad: ( { state } ) => {
			// Subscribe to changes in Cart data.
			subscribe( () => {
				const cartData = select( storeKey ).getCartData();
				const isResolutionFinished =
					select( storeKey ).hasFinishedResolution( 'getCartData' );

				if ( isResolutionFinished ) {
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
