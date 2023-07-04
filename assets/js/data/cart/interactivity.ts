import { select, subscribe } from '@wordpress/data';
import { STORE_KEY } from './constants';
import { store as interactivityStore } from '@woocommerce/interactivity';
import { deepSignal } from 'deepsignal';
import { rawStore } from '@woocommerce/interactivity/store';
import { updateStore } from '@woocommerce/interactivity/store';

subscribe( () => {
	const store = select( STORE_KEY );

	const cartData = store.getCartData();

	updateStore( {
		state: {
			woocommerce: {
				cart: cartData,
			},
		},
	} );
}, STORE_KEY );
