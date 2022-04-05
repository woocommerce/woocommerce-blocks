/**
 * External dependencies
 */
import type { Reducer } from 'redux';

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
		case ACTION_TYPES.SET_ACTIVE_PAYMENT_METHOD:
			state = {
				...state,
				activePaymentMethod: action.activePaymentMethod,
			};
			break;
		default:
			return state;
	}
	return state;
};
export type State = ReturnType< typeof reducer >;

export default reducer;
