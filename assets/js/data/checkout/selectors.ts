/**
 * Internal dependencies
 */
import { STATUS } from './constants';

export const getRedirectUrl = ( state ) => {
	return state.redirectUrl;
};

export const getCustomerId = ( state ) => {
	return state.customerId;
};

export const hasError = ( state ) => {
	return state.hasError;
};

export const hasOrder = ( state ) => {
	return !! state.orderId;
};

export const isComplete = ( state ) => {
	return state.status === STATUS.COMPLETE;
};

export const isIdle = ( state ) => {
	return state.status === STATUS.IDLE;
};

export const isBeforeProcessing = ( state ) => {
	return state.status === STATUS.BEFORE_PROCESSING;
};

export const isAfterProcessing = ( state ) => {
	return state.status === STATUS.AFTER_PROCESSING;
};

export const isProcessing = ( state ) => {
	return state.status === STATUS.PROCESSING;
};

export const isCalculating = ( state ) => {
	return state.calculatingCount > 0;
};

export const getCheckoutState = ( state ) => state;
