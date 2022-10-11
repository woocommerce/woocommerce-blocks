/**
 * External dependencies
 */
import {
	createReduxStore,
	register,
	subscribe,
	select as wpDataSelect,
	dispatch as wpDataDispatch,
} from '@wordpress/data';

/**
 * Internal dependencies
 */
import { STORE_KEY } from './constants';
import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducers';
import { DispatchFromMap, SelectFromMap } from '../mapped-types';
import { checkPaymentMethodsCanPay } from '../payment/check-payment-methods';

export const config = {
	reducer,
	selectors,
	actions,
	// TODO: Gutenberg with Thunks was released in WP 6.0. Once 6.1 is released, remove the experimental flag here
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore We pass this in case there is an older version of Gutenberg running.
	__experimentalUseThunks: true,
};

const store = createReduxStore( STORE_KEY, config );
register( store );

const isEditor = !! wpDataSelect( 'core/editor' );

// This is needed to ensure that the payment methods are displayed in the editor
if ( isEditor ) {
	const unsubscribeEditor = subscribe( async () => {
		await checkPaymentMethodsCanPay();
		await checkPaymentMethodsCanPay( true );
	} );

	const unsubscribeInitializePaymentStore = subscribe( async () => {
		wpDataDispatch( 'wc/store/payment' ).__internalInitializePaymentStore();
		unsubscribeEditor();
		unsubscribeInitializePaymentStore();
	} );
}

export const CHECKOUT_STORE_KEY = STORE_KEY;
declare module '@wordpress/data' {
	function dispatch(
		key: typeof CHECKOUT_STORE_KEY
	): DispatchFromMap< typeof actions >;
	function select( key: typeof CHECKOUT_STORE_KEY ): SelectFromMap<
		typeof selectors
	> & {
		hasFinishedResolution: ( selector: string ) => boolean;
	};
}
