/**
 * External dependencies
 */
import { registerStore } from '@wordpress/data';
import { controls } from '@wordpress/data-controls';

/**
 * Internal dependencies
 */
import { STORE_KEY } from './constants';
import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducers';

registerStore( STORE_KEY, {
	reducer,
	actions,
	controls,
	selectors,
} );

export const NONCE_STORE_KEY = STORE_KEY;
