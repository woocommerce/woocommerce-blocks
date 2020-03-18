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
const reducer = ( state = { nonce: '' }, action ) => {
	switch ( action.type ) {
		case types.RECEIVE_NONCE:
			state = {
				...state,
				nonce: action.nonce,
			};
			break;
	}
	return state;
};

export default reducer;
