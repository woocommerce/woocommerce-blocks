/**
 * External dependencies
 */
import { select, subscribe } from '@wordpress/data';
import { CART_STORE_KEY } from '@woocommerce/block-data';
import { updateStore } from '../store';
/**
 * Internal dependencies
 */

export const syncStoreWithInteractivityState = () => {
	const store = select( CART_STORE_KEY );
	const cartData = store.getCartData();
	const isResolutionFinished =
		select( CART_STORE_KEY ).hasFinishedResolution( 'getCartData' );

	if ( isResolutionFinished ) {
		updateStore( {
			state: {
				woocommerce: {
					cart: cartData,
				},
			},
		} );
	}
};

subscribe( syncStoreWithInteractivityState, CART_STORE_KEY );
