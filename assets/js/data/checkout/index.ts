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
import { checkPaymentMethodsCanPay } from '../payment-methods/check-payment-methods';

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

subscribe( async () => {
	await checkPaymentMethodsCanPay();
	await checkPaymentMethodsCanPay( true );
} );

const unsubscribeInitializePaymentMethodDataStore = subscribe( async () => {
	const cartLoaded =
		wpDataSelect( STORE_KEY ).hasFinishedResolution( 'getCartTotals' );
	const isEditor = !! wpDataSelect( 'core/editor' );
	if ( cartLoaded || isEditor ) {
		wpDataDispatch(
			'wc/store/payment-methods'
		).initializePaymentMethodDataStore();
		unsubscribeInitializePaymentMethodDataStore();
	}
} );

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
