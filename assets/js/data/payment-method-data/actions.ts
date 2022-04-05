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

export const setActivePaymentMethod = (
	activePaymentMethod: string,
	paymentMethodData: Record< string, unknown > = {}
) => ( {
	type: ACTION_TYPES.SET_ACTIVE_PAYMENT_METHOD,
	activePaymentMethod,
	paymentMethodData,
} );

export const setAvailablePaymentMethods = ( methods: string[] ) => ( {
	type: ACTION_TYPES.SET_AVAILABLE_PAYMENT_METHODS,
	methods,
} );

export const addRegisteredPaymentMethod = ( name: string ) => ( {
	type: ACTION_TYPES.ADD_REGISTERED_PAYMENT_METHOD,
	name,
} );

export const removeRegisteredPaymentMethod = ( name: string ) => ( {
	type: ACTION_TYPES.ADD_REGISTERED_PAYMENT_METHOD,
	name,
} );

export const addRegisteredExpressPaymentMethod = ( name: string ) => ( {
	type: ACTION_TYPES.ADD_REGISTERED_EXPRESS_PAYMENT_METHOD,
	name,
} );

export const removeRegisteredExpressPaymentMethod = ( name: string ) => ( {
	type: ACTION_TYPES.ADD_REGISTERED_EXPRESS_PAYMENT_METHOD,
	name,
} );
