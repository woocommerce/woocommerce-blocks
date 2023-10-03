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

const getContext = () => getContextFn< Context >( 'woo' );

const { selectors } = store< Store >( 'woo', {
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
	},
} );
