/**
 * External dependencies
 */
import { updateStore } from '@woocommerce/interactivity';
import { select, subscribe } from '@wordpress/data';
/**
 * Internal dependencies
 */
import { STORE_KEY } from './constants';

subscribe( () => {
	const store = select( STORE_KEY );
	const cartData = store.getCartData();
	const isResolutionFinished =
		select( STORE_KEY ).hasFinishedResolution( 'getCartData' );

	if ( isResolutionFinished ) {
		updateStore( {
			state: {
				woocommerce: {
					cart: cartData,
				},
			},
		} );
	}
}, STORE_KEY );
