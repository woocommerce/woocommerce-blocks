/**
 * Internal dependencies
 */
import { ACTION_TYPES as types } from './action-types';
import { hasInState, updateState } from '../utils';

/**
 * Reducer for receiving items to a collection.
 *
 * @param   {Object}  state   The current state in the store.
 * @param   {Object}  action  Action object.
 *
 * @return  {Object}          New or existing state depending on if there are
 *                            any changes.
 */
const receiveCollection = ( state = {}, action ) => {
	// Update last modified and previous last modified values.
	if ( action.type === types.RECEIVE_LAST_MODIFIED ) {
		if ( action.timestamp === state.lastModified ) {
			return state;
		}
		return {
			...state,
			previousLastModified: state.lastModified || action.timestamp,
			lastModified: action.timestamp,
		};
	}

	// Reset previousLastModified to the last known lastModified value.
	if ( action.type === types.RESET_LAST_MODIFIED ) {
		return {
			...state,
			previousLastModified: state.lastModified,
		};
	}

	const { type, namespace, resourceName, queryString, response } = action;
	// ids are stringified so they can be used as an index.
	const ids = action.ids ? JSON.stringify( action.ids ) : '[]';
	switch ( type ) {
		case types.RECEIVE_COLLECTION:
			if (
				hasInState( state, [
					namespace,
					resourceName,
					ids,
					queryString,
				] )
			) {
				return state;
			}
			state = updateState(
				state,
				[ namespace, resourceName, ids, queryString ],
				response
			);
			break;
		case types.RESET_COLLECTION:
			state = updateState(
				state,
				[ namespace, resourceName, ids, queryString ],
				response
			);
			break;
		case types.ERROR:
			state = updateState(
				state,
				[ namespace, resourceName, ids, queryString ],
				response
			);
			break;
	}
	return state;
};

export default receiveCollection;
