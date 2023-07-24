/**
 * External dependencies
 */
import { CART_STORE_KEY as storeKey } from '@woocommerce/block-data';
import { store } from '@woocommerce/interactivity';
import { dispatch } from '@wordpress/data';
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
	};
};

type State = {
	woocommerce: {
		cart: Cart;
		inTheCartText: string;
	};
};

const getProductById = ( cartState: Cart, productId: number ) => {
	return cartState.items.find( ( item ) => item.id === productId );
};

const productButtonSelectors = {
	woocommerce: {
		addToCartText: ( {
			context,
			state,
		}: {
			context: Context;
			state: State;
		} ) => {
			if ( context.woocommerce.numberOfItems === 0 ) {
				return context.woocommerce.addToCartText;
			}

			if ( ! state.woocommerce.cart ) {
				return state.woocommerce.inTheCartText.replace(
					'###',
					context.woocommerce.numberOfItems.toString()
				);
			}

			const cartState = state.woocommerce.cart;
			const product = getProductById(
				cartState,
				context.woocommerce.productId
			);

			if ( ! product ) {
				return context.woocommerce.addToCartText;
			}

			return state.woocommerce.inTheCartText.replace(
				'###',
				product?.quantity?.toString()
			);
		},
		isThereMoreThanOneItem: ( {
			context,
			state,
		}: {
			context: Context;
			state: State;
		} ) => {
			if ( ! state.woocommerce?.cart ) {
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
			// For now, let's just use any.
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			selectors: any;
			state: State;
		} ) => {
			return selectors.woocommerce.isThereMoreThanOneItem( {
				context,
				state,
			} );
		},
	},
};

// @ts-expect-error: Store function isn't typed.
store( {
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

				try {
					await dispatch( storeKey ).addItemToCart(
						context.woocommerce.productId,
						1
					);
					context.woocommerce.numberOfItems++;
					context.woocommerce.isLoading = false;
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
		},
	},
} );
