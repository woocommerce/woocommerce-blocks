/**
 * External dependencies
 */
import { createReduxStore, register } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { STORE_KEY } from './constants';
import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducers';
import { DispatchFromMap, SelectFromMap } from '../mapped-types';

const store = createReduxStore( STORE_KEY, {
	reducer,
	selectors,
	actions,
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore We pass this in case there is an older version of Gutenberg running.
	__experimentalUseThunks: true,
} );
register( store );

export const CHECKOUT_STORE_KEY = STORE_KEY;
declare module '@wordpress/data' {
	function dispatch(
		key: typeof CHECKOUT_STORE_KEY
	): DispatchFromMap< typeof actions >;
	function select(
		key: typeof CHECKOUT_STORE_KEY
	): SelectFromMap< typeof selectors > & {
		hasFinishedResolution: ( selector: string ) => boolean;
	};
}
