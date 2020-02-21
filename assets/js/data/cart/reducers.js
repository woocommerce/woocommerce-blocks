/**
 * Internal dependencies
 */
import { ACTION_TYPES as types } from './action-types';

/**
 * Reducer for receiving items related to the cart.
 *
 * @param   {Object}  state   The current state in the store.
 * @param   {Object}  action  Action object.
 *
 * @return  {Object}          New or existing state.
 */
const reducer = ( state = { errors: [] }, action ) => {
	switch ( action.type ) {
		case types.RECEIVE_ERROR:
			state = {
				...state,
				errors: state.errors.concat( action.error ),
			};
			break;
		case types.REPLACE_ERRORS:
			state = {
				...state,
				errors: [ action.error ],
			};
			break;
		case types.RECEIVE_CART:
			state = {
				...state,
				...action.response,
			};
			break;
	}
	return state;
};

export default reducer;
