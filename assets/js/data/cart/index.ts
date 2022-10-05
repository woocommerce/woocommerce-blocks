/**
 * External dependencies
 */
import {
	dispatch as wpDataDispatch,
	register,
	subscribe,
	createReduxStore,
	select as wpDataSelect,
} from '@wordpress/data';
import { controls as dataControls } from '@wordpress/data-controls';

/**
 * Internal dependencies
 */
import { STORE_KEY } from './constants';
import * as selectors from './selectors';
import * as actions from './actions';
import * as resolvers from './resolvers';
import reducer from './reducers';
import { controls as sharedControls } from '../shared-controls';
import { controls } from './controls';
import type { SelectFromMap, DispatchFromMap } from '../mapped-types';
import { pushChanges } from './push-changes';
import { checkPaymentMethodsCanPay } from '../payment/check-payment-methods';

const store = createReduxStore( STORE_KEY, {
	reducer,
	actions,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	controls: { ...dataControls, ...sharedControls, ...controls } as any,
	selectors,
	resolvers,
} );
register( store );

subscribe( pushChanges );
subscribe( async () => {
	const isInitialized =
		wpDataSelect( STORE_KEY ).hasFinishedResolution( 'getCartData' );

	if ( ! isInitialized ) {
		return;
	}
	await checkPaymentMethodsCanPay();
	await checkPaymentMethodsCanPay( true );
} );

const unsubscribeInitializePaymentMethodDataStore = subscribe( async () => {
	const cartLoaded =
		wpDataSelect( STORE_KEY ).hasFinishedResolution( 'getCartTotals' );
	if ( cartLoaded ) {
		wpDataDispatch(
			'wc/store/payment'
		).__internalInitializePaymentMethodDataStore();
		unsubscribeInitializePaymentMethodDataStore();
	}
} );

export const CART_STORE_KEY = STORE_KEY;

declare module '@wordpress/data' {
	function dispatch(
		key: typeof CART_STORE_KEY
	): DispatchFromMap< typeof actions >;
	function select( key: typeof CART_STORE_KEY ): SelectFromMap<
		typeof selectors
	> & {
		hasFinishedResolution: ( selector: string ) => boolean;
	};
}
