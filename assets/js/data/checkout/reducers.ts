/**
 * Internal dependencies
 */
import { ACTION_TYPES as types } from './action-types';
import { defaultState } from './default-state';

const reducer = ( state = defaultState, action ) => {
	switch ( action.type ) {
		case types.SET_HAS_ERROR:
			return {
				...state,
				hasError: action.action,
			};
	}
};

export default reducer;
