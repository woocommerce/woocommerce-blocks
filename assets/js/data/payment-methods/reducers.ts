/**
 * External dependencies
 */
import type { Reducer } from 'redux';
import { objectHasProp } from '@woocommerce/types';

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
		case ACTION_TYPES.SET_PAYMENT_STATUS:
			state = {
				...state,
				currentStatus: action.status,
				errorMessage: action.errorMessage,
			};
			break;
		case ACTION_TYPES.ADD_REGISTERED_PAYMENT_METHOD:
			state = {
				...state,
				registeredPaymentMethods: [
					...state.registeredPaymentMethods,
					action.name,
				],
			};
			break;
		case ACTION_TYPES.REMOVE_REGISTERED_PAYMENT_METHOD:
			state = {
				...state,
				registeredPaymentMethods: state.registeredPaymentMethods.filter(
					( name ) => name !== action.name
				),
			};
			break;
		case ACTION_TYPES.ADD_REGISTERED_EXPRESS_PAYMENT_METHOD:
			state = {
				...state,
				registeredExpressPaymentMethods: [
					...state.registeredExpressPaymentMethods,
					action.name,
				],
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
			state = {
				...state,
				registeredExpressPaymentMethods:
					state.registeredExpressPaymentMethods.filter(
						( name ) => name !== action.name
					),
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
