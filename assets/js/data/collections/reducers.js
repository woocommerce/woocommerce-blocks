/**
 * Internal dependencies
 */
import { ACTION_TYPES as types } from './action-types';
import { hasExisting } from './utils';

const updateState = (
	state = {},
	namespace,
	modelName,
	ids,
	queryString,
	items,
	replace = false
) => {
	if ( ! state[ namespace ] ) {
		state = {
			...state,
			[ namespace ]: {
				[ modelName ]: {
					[ ids ]: {
						[ queryString ]: items,
					},
				},
			},
		};
	} else if ( ! state[ namespace ][ modelName ] ) {
		state = {
			...state,
			[ namespace ]: {
				...state[ namespace ],
				[ modelName ]: {
					[ ids ]: {
						[ queryString ]: items,
					},
				},
			},
		};
	} else if ( ! state[ namespace ][ modelName ][ ids ] ) {
		state = {
			...state,
			[ namespace ]: {
				...state[ namespace ],
				[ modelName ]: {
					...state[ namespace ][ modelName ],
					[ ids ]: {
						[ queryString ]: items,
					},
				},
			},
		};
	} else {
		state = replace
			? {
					...state,
					[ namespace ]: {
						...state[ namespace ],
						[ modelName ]: {
							...state[ namespace ][ modelName ],
							[ ids ]: {
								[ queryString ]: items,
							},
						},
					},
			  }
			: {
					...state,
					[ namespace ]: {
						...state[ namespace ],
						[ modelName ]: {
							...state[ namespace ][ modelName ],
							[ ids ]: {
								...state[ namespace ][ modelName ][ ids ],
								[ queryString ]: items,
							},
						},
					},
			  };
	}
	return state;
};

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
	const { type, namespace, modelName, queryString, items } = action;
	// ids are stringified so they can be used as an index.
	const ids = action.ids ? JSON.stringify( action.ids ) : '[]';
	switch ( type ) {
		case types.RECEIVE_COLLECTION:
			if (
				hasExisting( state, namespace, modelName, ids, queryString )
			) {
				return state;
			}
			state = updateState(
				state,
				namespace,
				modelName,
				ids,
				queryString,
				items
			);
			break;
		case types.RESET_COLLECTION:
			state = updateState(
				state,
				namespace,
				modelName,
				ids,
				queryString,
				items,
				true
			);
			break;
	}
	return state;
};

export default receiveCollection;
