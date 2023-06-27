/**
 * External dependencies
 */
import { CART_STORE_KEY as storeKey } from '@woocommerce/block-data';
import { store } from '@woocommerce/interactivity';
import { dispatch } from '@wordpress/data';

store( {
	state: {
		woocommerce: {
			moreThanOneItem: ( { context } ) => {
				return true;
			},
			addToCartText: ( { context, state } ) => {
				if ( context.woocommerce.numberOfItems === 0 ) {
					return context.woocommerce.addToCart;
				}

				return state.woocommerce.inTheCart.replace(
					'###',
					context.woocommerce.numberOfItems
				);
			},
		},
	},
	actions: {
		woocommerce: {
			addToCart: async ( { context, event, ref } ) => {
				context.woocommerce.isLoading = true;

				try {
					await dispatch( storeKey ).addItemToCart(
						context.woocommerce.productId,
						1
					);
				} catch ( error ) {
					context.woocommerce.numberOfItems--;
				}

				context.woocommerce.numberOfItems++;
				context.woocommerce.isAdded = true;
				context.woocommerce.isLoading = false;
			},
		},
	},
} );
