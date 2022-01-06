/**
 * External dependencies
 */
import type { Reducer } from 'redux';

/**
 * Internal dependencies
 */
import { ValidationAction } from './actions';
import { ACTION_TYPES as types } from './action-types';

export interface FieldValidationStatus {
	message: string;
	hidden: boolean;
}

const reducer: Reducer< Record< string, FieldValidationStatus > > = (
	state: Record< string, FieldValidationStatus > = {},
	action: Partial< ValidationAction >
) => {
	switch ( action.type ) {
		case types.SET_VALIDATION_ERRORS:
			return {
				...state,
				...action.errors,
			};
		default:
			return state;
	}
};

export type State = ReturnType< typeof reducer >;
export default reducer;
