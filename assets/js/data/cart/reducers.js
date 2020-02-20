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
const reducer = ( state = {}, action ) => {
	const { type, response } = action;
	switch ( type ) {
		case types.RECEIVE_CART:
			state = {
				...state,
				...response,
			};
			break;
	}
	return state;
};

export default reducer;
