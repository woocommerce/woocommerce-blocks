/**
 * External dependencies
 */
import { CART_STORE_KEY as storeKey } from '@woocommerce/block-data';
import { store, navigate } from '@woocommerce/interactivity';
import { dispatch } from '@wordpress/data';
import { addAction } from '@wordpress/hooks';

type Context = {
	woocommerce: {
		isLoading: boolean;
		numberOfItems: number;
		addToCart: string;
		productId: number;
		isAdded: boolean;
		moreThanOneItem: boolean;
	};
};

type State = {
	woocommerce: {
		inTheCart: string;
		viewCart: string;
		cartUrl: string;
	};
};

addAction(
	'experimental__woocommerce_blocks-refresh-page',
	'woocommerce',
	async () => {
		await navigate( window.location.href, {
			force: true,
			replace: true,
		} );
	}
);

store( {
	state: {
		woocommerce: {
			addToCartText: ( {
				context,
				state,
			}: {
				context: Context;
				state: State;
			} ) => {
				if ( context.woocommerce.numberOfItems === 0 ) {
					return context.woocommerce.addToCart;
				}

				return state.woocommerce.inTheCart.replace(
					'###',
					context.woocommerce.numberOfItems.toString()
				);
			},
		},
	},
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
					context.woocommerce.moreThanOneItem = true;
					context.woocommerce.isLoading = false;
					context.woocommerce.isAdded = true;
				} catch ( error ) {
					context.woocommerce.numberOfItems--;
				}
			},
		},
	},
} );
