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
		case ACTION_TYPES.UNHIGHLIGHT_ALL_NOTICES:
			return {
				...state,
				highlightedNotices: [],
			};
		case ACTION_TYPES.HIGHLIGHT_NOTICE:
			return {
				...state,
				highlightedNotices: [
					...state.highlightedNotices,
					{
						context: action.containerContext,
						id: action.noticeId,
					},
				],
			};
		case ACTION_TYPES.UNHIGHLIGHT_NOTICE:
			return {
				...state,
				highlightedNotices: state.highlightedNotices.filter(
					( notice ) => {
						return (
							notice.context !== action.containerContext ||
							notice.id !== action.noticeId
						);
					}
				),
			};
		case ACTION_TYPES.REGISTER_CONTAINER:
			return {
				...state,
				containers: [ ...state.containers, action.containerContext ],
			};
		case ACTION_TYPES.UNREGISTER_CONTAINER:
			const newContainers = state.containers.filter(
				( container ) => container !== action.containerContext
			);
			return {
				...state,
				containers: newContainers,
			};
	}
	return state;
};

export default reducer;
