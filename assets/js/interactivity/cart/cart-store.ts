/**
 * External dependencies
 */
import { select, subscribe } from '@wordpress/data';
import { CART_STORE_KEY } from '@woocommerce/block-data';
import { rawStore } from '../store';

export const syncStoreWithInteractivityState = () => {
	const store = select( CART_STORE_KEY );
	const cartData = store.getCartData();
	const isResolutionFinished =
		select( CART_STORE_KEY ).hasFinishedResolution( 'getCartData' );

	if ( isResolutionFinished ) {
		rawStore.state.woocommerce.cart = cartData;
	}
};

subscribe( syncStoreWithInteractivityState, CART_STORE_KEY );
