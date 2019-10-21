/**
 * External dependencies
 */
import { combineReducers } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { ACTION_TYPES as types } from './action-types';
import {
	extractModelNameFromRoute,
	getRouteIds,
	simplifyRouteWithId,
	hasRouteInState,
} from './utils';

const updateState = (
	state = {},
	namespace,
	modelName,
	route,
	routeIdNames
) => {
	if ( ! state[ namespace ] ) {
		state = {
			...state,
			[ namespace ]: {
				[ modelName ]: {
					[ route ]: routeIdNames,
				},
			},
		};
	} else if ( ! state[ namespace ][ modelName ] ) {
		state = {
			...state,
			[ namespace ]: {
				...state[ namespace ],
				[ modelName ]: {
					[ route ]: routeIdNames,
				},
			},
		};
	} else {
		state = {
			...state,
			[ namespace ]: {
				...state[ namespace ],
				[ modelName ]: {
					...state[ namespace ][ modelName ],
					[ route ]: routeIdNames,
				},
			},
		};
	}
	return state;
};

/**
 * Reducer for routes
 *
 * @param {Object} state  The current state.
 * @param {Object} action The action object for parsing.
 *
 * @return {Object} The new (or original) state.
 */
export const receiveRoutes = ( state = {}, action ) => {
	const { type, routes, namespace } = action;
	if ( type === types.RECEIVE_MODEL_ROUTES ) {
		routes.forEach( ( route ) => {
			const modelName = extractModelNameFromRoute( namespace, route );
			if ( modelName && modelName !== namespace ) {
				const routeIdNames = getRouteIds( route );
				const savedRoute = simplifyRouteWithId( route, routeIdNames );
				if (
					! hasRouteInState( state, namespace, modelName, savedRoute )
				) {
					state = updateState(
						state,
						namespace,
						modelName,
						savedRoute,
						routeIdNames
					);
				}
			}
		} );
	}
	return state;
};

export default combineReducers( {
	routes: receiveRoutes,
} );
