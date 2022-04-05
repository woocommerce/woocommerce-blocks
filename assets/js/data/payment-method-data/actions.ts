/**
 * Internal dependencies
 */
import { ACTION_TYPES } from './action-types';
import { STATUS } from '../../base/context/providers/cart-checkout/payment-methods/constants';

export const setPaymentStatus = ( status: STATUS ) => ( {
	type: ACTION_TYPES.SET_PAYMENT_STATUS,
	status,
} );

export const setPaymentMethodsInitialized = ( initialized: boolean ) => ( {
	type: ACTION_TYPES.SET_PAYMENT_METHODS_INITIALIZED,
	initialized,
} );

export const setShouldSavePaymentMethod = (
	shouldSavePaymentMethod: boolean
) => ( {
	type: ACTION_TYPES.SET_SHOULD_SAVE_PAYMENT_METHOD,
	shouldSavePaymentMethod,
} );

export const setActivePaymentMethod = ( activePaymentMethod: string ) => ( {
	type: ACTION_TYPES.SET_ACTIVE_PAYMENT_METHOD,
	activePaymentMethod,
} );
