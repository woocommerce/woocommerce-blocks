/**
 * External dependencies
 */
import {
	dispatch as wpDataDispatch,
	select as wpDataSelect,
} from '@wordpress/data';
import { debounce } from 'lodash';

/**
 * Internal dependencies
 */
import { PAYMENT_STORE_KEY } from '../payment';
import { STORE_KEY } from './constants';

export const updatePaymentMethods = debounce( async () => {
	const isInitialized =
		wpDataSelect( STORE_KEY ).hasFinishedResolution( 'getCartData' );

	if ( ! isInitialized ) {
		return;
	}

	await wpDataDispatch(
		PAYMENT_STORE_KEY
	).__internalUpdateAvailablePaymentMethods();
}, 1000 );
