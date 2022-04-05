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

export const shouldSavePaymentMethod = ( state: PaymentMethodDataState ) => {
	return state.shouldSavePaymentMethod;
};
