/**
 * External dependencies
 */
import { objectHasProp } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import { PaymentMethodDataState } from './default-state';
import { filterActiveSavedPaymentMethods } from './utils';
import { STATUS as PAYMENT_STATUS } from './constants';

export const isPaymentStarted = ( state: PaymentMethodDataState ) => {
	return state.status === PAYMENT_STATUS.STARTED;
};

export const isPaymentProcessing = ( state: PaymentMethodDataState ) => {
	return state.status === PAYMENT_STATUS.PROCESSING;
};

export const isPaymentError = ( state: PaymentMethodDataState ) => {
	return state.status === PAYMENT_STATUS.ERROR;
};

export const isPaymentFailed = ( state: PaymentMethodDataState ) => {
	return state.status === PAYMENT_STATUS.FAILED;
};

export const isPaymentFinished = ( state: PaymentMethodDataState ) => {
	return (
		state.status === PAYMENT_STATUS.SUCCESS ||
		state.status === PAYMENT_STATUS.ERROR ||
		state.status === PAYMENT_STATUS.FAILED
	);
};

export const isExpressPaymentMethodActive = (
	state: PaymentMethodDataState
) => {
	return Object.keys( state.availableExpressPaymentMethods ).includes(
		state.activePaymentMethod
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

export const getSavedPaymentMethods = ( state: PaymentMethodDataState ) => {
	return state.savedPaymentMethods;
};

/**
 * Filters the list of saved payment methods and returns only the ones which
 * are active and supported by the payment gateway
 */
export const getActiveSavedPaymentMethods = (
	state: PaymentMethodDataState
) => {
	const availablePaymentMethodKeys = Object.keys(
		state.availablePaymentMethods
	);

	return filterActiveSavedPaymentMethods(
		availablePaymentMethodKeys,
		state.savedPaymentMethods
	);
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

export const getState = ( state: PaymentMethodDataState ) => {
	return state;
};
