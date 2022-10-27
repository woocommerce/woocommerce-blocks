/**
 * External dependencies
 */
import { dispatch, select } from '@wordpress/data';
import { debounce } from 'lodash';

/**
 * Internal dependencies
 */
import { STORE_KEY as PAYMENT_STORE_KEY } from '../payment/constants';
import { STORE_KEY } from './constants';

export const updatePaymentMethods = async () => {
	const isInitialized =
		select( STORE_KEY ).hasFinishedResolution( 'getCartData' );
	if ( ! isInitialized ) {
		return false;
	}
	await dispatch(
		PAYMENT_STORE_KEY
	).__internalUpdateAvailablePaymentMethods();
	return true;
};
export const debouncedUpdatePaymentMethods = debounce(
	updatePaymentMethods,
	1000
);
