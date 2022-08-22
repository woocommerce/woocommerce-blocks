/**
 * External dependencies
 */
import {
	PaymentMethods,
	ExpressPaymentMethods,
} from '@woocommerce/type-defs/payments';

/**
 * Internal dependencies
 */
import { ACTION_TYPES } from './action-types';
import { checkPaymentMethodsCanPay } from './check-payment-methods';
import { setDefaultPaymentMethod } from './set-default-payment-method';
import { PaymentStatus } from './types';

// `Thunks are functions that can be dispatched, similar to actions creators
export * from './thunks';

export const setPaymentStatus = (
	status: PaymentStatus,
	paymentMethodData?: Record< string, unknown >
) => ( {
	type: ACTION_TYPES.SET_PAYMENT_STATUS,
	status,
	paymentMethodData,
} );

export const setPaymentMethodsInitialized = ( initialized: boolean ) => {
	return async ( { select, dispatch } ) => {
		// If the currently selected method is not in this new list, then we need to select a new one, or select a default.
		const methods = select.getAvailablePaymentMethods();
		if ( initialized ) {
			await setDefaultPaymentMethod( methods );
		}
		dispatch( {
			type: ACTION_TYPES.SET_PAYMENT_METHODS_INITIALIZED,
			initialized,
		} );
	};
};

export const setExpressPaymentMethodsInitialized = (
	initialized: boolean
) => ( {
	type: ACTION_TYPES.SET_EXPRESS_PAYMENT_METHODS_INITIALIZED,
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

export const setPaymentMethodData = (
	paymentMethodData: Record< string, unknown > = {}
) => ( {
	type: ACTION_TYPES.SET_PAYMENT_METHOD_DATA,
	paymentMethodData,
} );

/**
 * Set the available payment methods.
 * An available payment method is one that has been validated and can make a payment.
 */
export const setAvailablePaymentMethods = (
	paymentMethods: PaymentMethods
) => {
	return async ( { dispatch } ) => {
		// If the currently selected method is not in this new list, then we need to select a new one, or select a default.
		await setDefaultPaymentMethod( paymentMethods );
		dispatch( {
			type: ACTION_TYPES.SET_AVAILABLE_PAYMENT_METHODS,
			paymentMethods,
		} );
	};
};

/**
 * Set the available express payment methods.
 * An available payment method is one that has been validated and can make a payment.
 */
export const setAvailableExpressPaymentMethods = (
	paymentMethods: ExpressPaymentMethods
) => ( {
	type: ACTION_TYPES.SET_AVAILABLE_EXPRESS_PAYMENT_METHODS,
	paymentMethods,
} );

/**
 * Remove a payment method name from the available payment methods.
 * This is called when a payment method is removed from the registry.
 */
export const removeAvailablePaymentMethod = ( name: string ) => ( {
	type: ACTION_TYPES.REMOVE_AVAILABLE_PAYMENT_METHOD,
	name,
} );

/**
 * Remove an express payment method name from the available payment methods.
 * This is called when an express payment method is removed from the registry.
 */
export const removeRegisteredExpressPaymentMethod = ( name: string ) => ( {
	type: ACTION_TYPES.REMOVE_AVAILABLE_EXPRESS_PAYMENT_METHOD,
	name,
} );

export function initializePaymentMethodDataStore() {
	return async ( { dispatch } ) => {
		const expressRegistered = await checkPaymentMethodsCanPay( true );
		const registered = await checkPaymentMethodsCanPay( false );
		if ( registered && expressRegistered ) {
			dispatch( setExpressPaymentMethodsInitialized( true ) );
			dispatch( setPaymentMethodsInitialized( true ) );
		}
	};
}
