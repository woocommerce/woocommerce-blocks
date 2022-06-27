/**
 * External dependencies
 */
import type {
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
export { emitProcessingEvent } from './thunks';

export const setPaymentStatus = (
	status: PaymentStatus,
	errorMessage = '',
	paymentMethodData?: Record< string, unknown >
) => ( {
	type: ACTION_TYPES.SET_PAYMENT_STATUS,
	status,
	errorMessage,
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

export const setAvailablePaymentMethods = ( methods: string[] ) => {
	return async ( { dispatch } ) => {
		// If the currently selected method is not in this new list, then we need to select a new one, or select a default.
		await setDefaultPaymentMethod( methods );
		dispatch( {
			type: ACTION_TYPES.SET_AVAILABLE_PAYMENT_METHODS,
			methods,
		} );
	};
};

export const setAvailableExpressPaymentMethods = ( methods: string[] ) => ( {
	type: ACTION_TYPES.SET_AVAILABLE_EXPRESS_PAYMENT_METHODS,
	methods,
} );

export function addRegisteredPaymentMethod() {
	return async ( { dispatch } ) => {
		const registered = await checkPaymentMethodsCanPay();
		if ( registered ) {
			dispatch( setPaymentMethodsInitialized( true ) );
		}
	};
}

export const setRegisteredPaymentMethods = (
	paymentMethods: PaymentMethods
) => {
	return {
		type: ACTION_TYPES.SET_REGISTERED_PAYMENT_METHODS,
		paymentMethods,
	};
};

export const removeRegisteredPaymentMethod = ( name: string ) => ( {
	type: ACTION_TYPES.REMOVE_REGISTERED_PAYMENT_METHOD,
	name,
} );

export function addRegisteredExpressPaymentMethod() {
	return async ( { dispatch } ) => {
		const registered = await checkPaymentMethodsCanPay( true );
		if ( registered ) {
			dispatch( setExpressPaymentMethodsInitialized( true ) );
		}
	};
}

export const setRegisteredExpressPaymentMethod = (
	paymentMethods: ExpressPaymentMethods
) => {
	return {
		type: ACTION_TYPES.SET_REGISTERED_EXPRESS_PAYMENT_METHOD,
		paymentMethods,
	};
};

export const removeRegisteredExpressPaymentMethod = ( name: string ) => ( {
	type: ACTION_TYPES.REMOVE_REGISTERED_EXPRESS_PAYMENT_METHOD,
	name,
} );
