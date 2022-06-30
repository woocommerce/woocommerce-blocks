/**
 * External dependencies
 */
import { objectHasProp } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import { PaymentMethodDataState } from './default-state';
import { filterEnabledCustomerPaymentMethods } from './utils';

export const isExpressPaymentMethodActive = (
	state: PaymentMethodDataState
) => {
	return (
		Array.isArray( state.availableExpressPaymentMethods ) &&
		state.availableExpressPaymentMethods.includes(
			state.activePaymentMethod
		)
	);
};

export const getActiveSavedToken = ( state: PaymentMethodDataState ) => {
	return typeof state.paymentMethodData === 'object' &&
		objectHasProp( state.paymentMethodData, 'token' )
		? state.paymentMethodData.token + ''
		: '';
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

export const getPaymentMethodData = ( state: PaymentMethodDataState ) => {
	return state.paymentMethodData;
};

export const getCustomerPaymentMethods = ( state: PaymentMethodDataState ) => {
	return state.customerPaymentMethods;
};

export const getEnabledCustomerPaymentMethods = (
	state: PaymentMethodDataState
) => {
	return filterEnabledCustomerPaymentMethods(
		state.registeredPaymentMethods,
		state.customerPaymentMethods
	);
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

export const getCurrentStatus = ( state: PaymentMethodDataState ) => {
	return state.currentStatus;
};

export const getShouldSavePaymentMethod = ( state: PaymentMethodDataState ) => {
	return state.shouldSavePaymentMethod;
};
