/**
 * Internal dependencies
 */
import {
	ACTION_TYPES,
	STATUS,
	DEFAULT_PAYMENT_DATA_CONTEXT_STATE,
} from './constants';
import type { PaymentMethodDataContextState } from './types';
import type { ActionType } from './actions';
const {
	STARTED,
	ERROR,
	FAILED,
	SUCCESS,
	PROCESSING,
	PRISTINE,
	COMPLETE,
} = STATUS;
const {
	SET_REGISTERED_PAYMENT_METHODS,
	SET_REGISTERED_EXPRESS_PAYMENT_METHODS,
	SET_SHOULD_SAVE_PAYMENT_METHOD,
} = ACTION_TYPES;

const hasSavedPaymentToken = (
	paymentMethodData: Record< string, unknown >
): boolean => {
	return !! (
		typeof paymentMethodData === 'object' && paymentMethodData.isSavedToken
	);
};

/**
 * Reducer for payment data state
 */
const reducer = (
	state = DEFAULT_PAYMENT_DATA_CONTEXT_STATE,
	{
		type,
		paymentMethodData = {},
		shouldSavePaymentMethod = false,
		errorMessage = '',
		paymentMethods = {},
	}: ActionType
): PaymentMethodDataContextState => {
	switch ( type ) {
		case STARTED:
			return state.currentStatus !== STARTED
				? {
						...state,
						currentStatus: STARTED,
				  }
				: state;
		case ERROR:
			return state.currentStatus !== ERROR
				? {
						...state,
						currentStatus: ERROR,
						errorMessage: errorMessage || state.errorMessage,
				  }
				: state;
		case FAILED:
			return state.currentStatus !== FAILED
				? {
						...state,
						currentStatus: FAILED,
						paymentMethodData:
							paymentMethodData || state.paymentMethodData,
						errorMessage: errorMessage || state.errorMessage,
				  }
				: state;
		case SUCCESS:
			return state.currentStatus !== SUCCESS
				? {
						...state,
						currentStatus: SUCCESS,
						paymentMethodData:
							paymentMethodData || state.paymentMethodData,
						hasSavedToken: hasSavedPaymentToken(
							paymentMethodData
						),
				  }
				: state;
		case PROCESSING:
			return state.currentStatus !== PROCESSING
				? {
						...state,
						currentStatus: PROCESSING,
						errorMessage: '',
				  }
				: state;
		case COMPLETE:
			return state.currentStatus !== COMPLETE
				? {
						...state,
						currentStatus: COMPLETE,
				  }
				: state;

		case PRISTINE:
			return {
				...DEFAULT_PAYMENT_DATA_CONTEXT_STATE,
				currentStatus: PRISTINE,
				// keep payment method registration state
				paymentMethods: {
					...state.paymentMethods,
				},
				expressPaymentMethods: {
					...state.expressPaymentMethods,
				},
				shouldSavePaymentMethod: state.shouldSavePaymentMethod,
			};
		case SET_REGISTERED_PAYMENT_METHODS:
			return {
				...state,
				paymentMethods,
			};
		case SET_REGISTERED_EXPRESS_PAYMENT_METHODS:
			return {
				...state,
				expressPaymentMethods: paymentMethods,
			};
		case SET_SHOULD_SAVE_PAYMENT_METHOD:
			return {
				...state,
				shouldSavePaymentMethod,
			};
	}
};

export default reducer;
