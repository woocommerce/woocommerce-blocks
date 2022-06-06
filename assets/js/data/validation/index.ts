/**
 * External dependencies
 */
import { registerStore } from '@wordpress/data';

/**
 * Internal dependencies
 */
import reducer, { State } from './reducers';
import { STORE_KEY } from './constants';
import * as actions from './actions';
import * as selectors from './selectors';
import { DispatchFromMap, SelectFromMap } from '../mapped-types';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
registerStore< State >( STORE_KEY, {
	reducer,
	actions,
	selectors,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	// controls: { ...dataControls, ...sharedControls, ...controls } as any,
} );

export const VALIDATION_STORE_KEY = STORE_KEY;

declare module '@wordpress/data' {
	function dispatch(
		key: typeof VALIDATION_STORE_KEY
	): DispatchFromMap< typeof actions >;
	function select(
		key: typeof VALIDATION_STORE_KEY
	): SelectFromMap< typeof selectors > & {
		hasFinishedResolution: ( selector: string ) => boolean;
	};
}
