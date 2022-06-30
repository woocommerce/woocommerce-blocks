/**
 * External dependencies
 */
import type { Reducer } from 'redux';
import { objectHasProp } from '@woocommerce/types';
import { getSetting } from '@woocommerce/settings';

/**
 * Internal dependencies
 */
import {
	defaultPaymentMethodDataState,
	PaymentMethodDataState,
} from './default-state';
import { ACTION_TYPES } from './action-types';
import { orderPaymentMethods } from './utils';

const paymentGatewaySortOrder = getSetting< string[] >(
	'paymentGatewaySortOrder',
	[]
);

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
				paymentMethodData:
					action.paymentMethodData || state.paymentMethodData,
			};
			break;

		case ACTION_TYPES.REMOVE_AVAILABLE_PAYMENT_METHOD:
			const previousAvailablePaymentMethods = {
				...state.availablePaymentMethods,
			};
			delete previousAvailablePaymentMethods[ action.name ];

			state = {
				...state,
				availablePaymentMethods: {
					...previousAvailablePaymentMethods,
				},
			};
			break;

		case ACTION_TYPES.REMOVE_AVAILABLE_EXPRESS_PAYMENT_METHOD:
			const previousAvailableExpressPaymentMethods = {
				...state.availablePaymentMethods,
			};
			delete previousAvailableExpressPaymentMethods[ action.name ];
			state = {
				...state,
				availableExpressPaymentMethods: {
					...previousAvailableExpressPaymentMethods,
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
			const orderedMethods = orderPaymentMethods(
				paymentGatewaySortOrder,
				action.methods
			);
			state = {
				...state,
				availablePaymentMethods: orderedMethods,
			};
			break;

		case ACTION_TYPES.SET_AVAILABLE_EXPRESS_PAYMENT_METHODS:
			state = {
				...state,
				availableExpressPaymentMethods: action.methods,
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
