/**
 * External dependencies
 */
import type { Reducer } from 'redux';
import { objectHasProp } from '@woocommerce/types';
import { PaymentMethods } from '@woocommerce/type-defs/payments';

/**
 * Internal dependencies
 */
import {
	defaultPaymentMethodDataState,
	PaymentMethodDataState,
} from '../default-states';
import { ACTION_TYPES } from './action-types';

const reducer: Reducer< PaymentMethodDataState > = (
	state = defaultPaymentMethodDataState,
	action
) => {
	switch ( action.type ) {
		case ACTION_TYPES.SET_SHOULD_SAVE_PAYMENT_METHOD:
			state = {
				...state,
				shouldSavePaymentMethod: action.shouldSavePaymentMethod,
			};
			break;
		case ACTION_TYPES.SET_PAYMENT_METHOD_DATA:
			state = {
				...state,
				paymentMethodData: action.paymentMethodData,
			};
			break;
		case ACTION_TYPES.SET_PAYMENT_STATUS:
			state = {
				...state,
				currentStatus: {
					...state.currentStatus,
					...action.status,
					isFinished:
						action.status.hasError ||
						action.status.hasFailed ||
						action.status.isSuccessful,
					isDoingExpressPayment:
						! action.status.isPristine &&
						! state.currentStatus.isPristine &&
						state.isExpressPaymentMethodActive,
				},
				errorMessage: action.errorMessage,
				paymentMethodData:
					action.paymentMethodData || state.paymentMethodData,
			};
			break;
		case ACTION_TYPES.ADD_REGISTERED_PAYMENT_METHOD:
			state = {
				...state,
				registeredPaymentMethods: {
					...state.registeredPaymentMethods,
					[ action.registeredPaymentMethod.name ]:
						action.registeredPaymentMethod,
				},
			};
			break;
		case ACTION_TYPES.SET_REGISTERED_PAYMENT_METHODS:
			state = {
				...state,
				registeredPaymentMethods: {
					...state.registeredPaymentMethods,
					...( action.paymentMethods as PaymentMethods ),
				},
			};
			break;
		case ACTION_TYPES.REMOVE_REGISTERED_PAYMENT_METHOD:
			const previousRegisteredPaymentMethods = {
				...state.registeredPaymentMethods,
			};
			delete previousRegisteredPaymentMethods[
				action.registeredPaymentMethod.name
			];
			state = {
				...state,
				registeredPaymentMethods: {
					...previousRegisteredPaymentMethods,
				},
			};
			break;
		case ACTION_TYPES.ADD_REGISTERED_EXPRESS_PAYMENT_METHOD:
			state = {
				...state,
				registeredExpressPaymentMethods: {
					...state.registeredExpressPaymentMethods,
					[ action.registeredExpressPaymentMethods.name ]:
						action.registeredExpressPaymentMethods,
				},
			};
			break;
		case ACTION_TYPES.SET_REGISTERED_EXPRESS_PAYMENT_METHOD:
			state = {
				...state,
				registeredExpressPaymentMethods: {
					...state.registeredExpressPaymentMethods,
					...( action.paymentMethods as PaymentMethods ),
				},
			};
			break;
		case ACTION_TYPES.SET_PAYMENT_METHODS_INITIALIZED:
			state = {
				...state,
				paymentMethodsInitialized: action.initialized,
			};
			break;
		case ACTION_TYPES.SET_EXPRESS_PAYMENT_METHODS_INITIALIZED:
			state = {
				...state,
				expressPaymentMethodsInitialized: action.initialized,
			};
			break;
		case ACTION_TYPES.SET_AVAILABLE_PAYMENT_METHODS:
			state = {
				...state,
				availablePaymentMethods: action.methods,
			};
			break;
		case ACTION_TYPES.SET_AVAILABLE_EXPRESS_PAYMENT_METHODS:
			state = {
				...state,
				availableExpressPaymentMethods: action.methods,
			};
			break;
		case ACTION_TYPES.REMOVE_REGISTERED_EXPRESS_PAYMENT_METHOD:
			const previousExpressRegisteredPaymentMethods = {
				...state.registeredPaymentMethods,
			};
			delete previousExpressRegisteredPaymentMethods[
				action.registeredExpressPaymentMethods.name
			];
			state = {
				...state,
				registeredExpressPaymentMethods: {
					...previousExpressRegisteredPaymentMethods,
				},
			};
			break;
		case ACTION_TYPES.SET_ACTIVE_PAYMENT_METHOD:
			const activeSavedToken =
				typeof state.paymentMethodData === 'object' &&
				objectHasProp( action.paymentMethodData, 'token' )
					? action.paymentMethodData.token + ''
					: '';
			state = {
				...state,
				activeSavedToken,
				activePaymentMethod: action.activePaymentMethod,
				paymentMethodData:
					action.paymentMethodData || state.paymentMethodData,
			};
			break;
		default:
			return state;
	}
	return state;
};
export type State = ReturnType< typeof reducer >;

export default reducer;
