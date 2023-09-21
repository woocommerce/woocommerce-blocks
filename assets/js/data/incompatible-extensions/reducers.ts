/**
 * External dependencies
 */
import type { Reducer } from 'redux';

/**
 * Internal dependencies
 */
import {
	defaultIncompatibleExtensionsState,
	IncompatibleExtensionsState,
} from './default-state';
import { ACTION_TYPES } from './action-types';

const reducer: Reducer< IncompatibleExtensionsState > = (
	state = defaultIncompatibleExtensionsState,
	action
) => {
	switch ( action.type ) {
		case ACTION_TYPES.ADD_INCOMPATIBLE_EXTENSION:
			return {
				...state,
				extensions: [ ...state.extensions, action.extension ],
			};
		case ACTION_TYPES.REMOVE_INCOMPATIBLE_EXTENSION:
			const newExtensions = state.extensions.filter(
				( extensions ) => extensions !== action.extension
			);
			return {
				...state,
				extensions: newExtensions,
			};
	}
	return state;
};

export default reducer;
