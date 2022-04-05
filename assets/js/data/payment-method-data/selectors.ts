/**
 * External dependencies
 */
import { getExpressPaymentMethods } from '@woocommerce/blocks-registry';

/**
 * Internal dependencies
 */
import { PaymentMethodDataState } from '../default-states';

export const isExpressPaymentMethodActive = (
	state: PaymentMethodDataState
) => {
	Object.keys( getExpressPaymentMethods() ).includes(
		state.activePaymentMethod
	);
};

export const getPaymentMethods = () => {
	return 'lala';
};

export const getActiveSavedToken = ( state: PaymentMethodDataState ) => {
	return state.activeSavedToken;
};

export const getActivePaymentMethod = ( state: PaymentMethodDataState ) => {
	return state.activePaymentMethod;
};
