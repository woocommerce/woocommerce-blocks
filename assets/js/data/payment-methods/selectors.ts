/**
 * Internal dependencies
 */
import { PaymentMethodDataState } from '../default-states';
import { getExpressPaymentMethods } from '../../blocks-registry';

export const isExpressPaymentMethodActive = (
	state: PaymentMethodDataState
) => {
	Object.keys( getExpressPaymentMethods() ).includes(
		state.activePaymentMethod
	);
};

export const getActiveSavedToken = ( state: PaymentMethodDataState ) => {
	return state.activeSavedToken;
};

export const getActivePaymentMethod = ( state: PaymentMethodDataState ) => {
	return state.activePaymentMethod;
};

export const getAvailablePaymentMethods = ( state: PaymentMethodDataState ) => {
	return state.availablePaymentMethods;
};

export const getAvailableExpressPaymentMethods = (
	state: PaymentMethodDataState
) => {
	return state.availableExpressPaymentMethods;
};

export const shouldSavePaymentMethod = ( state: PaymentMethodDataState ) => {
	return state.shouldSavePaymentMethod;
};

export const paymentMethodsInitialized = ( state: PaymentMethodDataState ) => {
	return state.paymentMethodsInitialized;
};

export const expressPaymentMethodsInitialized = (
	state: PaymentMethodDataState
) => {
	return state.expressPaymentMethodsInitialized;
};
