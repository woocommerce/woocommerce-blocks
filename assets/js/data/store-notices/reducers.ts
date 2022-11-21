/**
 * External dependencies
 */
import type { Reducer } from 'redux';

/**
 * Internal dependencies
 */
import { defaultStoreNoticesState, StoreNoticesState } from './default-state';
import { ACTION_TYPES } from './action-types';

const reducer: Reducer< StoreNoticesState > = (
	state = defaultStoreNoticesState,
	action
) => {
	switch ( action.type ) {
		case ACTION_TYPES.REGISTER_CONTAINER:
			return {
				...state,
				containers: {
					...state.containers,
					[ action.containerContext ]: action.ref,
				},
			};
		case ACTION_TYPES.UNREGISTER_CONTAINER:
			const { [ action.containerContext ]: _, ...containers } =
				state.containers;
			return {
				...state,
				containers,
			};
	}
	return state;
};

export default reducer;
