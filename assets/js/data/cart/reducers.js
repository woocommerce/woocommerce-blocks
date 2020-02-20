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
	switch ( action.type ) {
		case types.RECEIVE_ERROR:
			if ( ! state.errors ) {
				state.errors = [];
			}
			state.errors.push( action.error );
			break;
		case types.RECEIVE_CART:
			state = {
				...state,
				...action.response,
			};
			break;
	}
	console.log( state );
	return state;
};

export default reducer;
