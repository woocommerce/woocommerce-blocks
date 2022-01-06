/**
 * External dependencies
 */
import { registerStore, select } from '@wordpress/data';

/**
 * Internal dependencies
 */
import reducer, { State } from './reducers';
import { STORE_KEY } from './constants';
import * as actions from './actions';
import * as selectors from './selectors';

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

export const exposedSelectors = {
	getValidationError( propertyName: string ) {
		return select( VALIDATION_STORE_KEY ).getValidationError(
			propertyName
		);
	},
};
