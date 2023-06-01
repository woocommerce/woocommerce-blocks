/**
 * Internal dependencies
 */
import { ACTION_TYPES } from './action-types';

export const registerContainer = ( containerContext: string ) => {
	return {
		type: ACTION_TYPES.REGISTER_CONTAINER,
		containerContext,
	};
};

export const unregisterContainer = ( containerContext: string ) => {
	return {
		type: ACTION_TYPES.UNREGISTER_CONTAINER,
		containerContext,
	};
};

export const unHighlightNotice = (
	containerContext: string,
	noticeId: string
) => {
	return {
		type: ACTION_TYPES.UNHIGHLIGHT_NOTICE,
		containerContext,
		noticeId,
	};
};

export const unHighlightAllNotices = () => {
	return {
		type: ACTION_TYPES.UNHIGHLIGHT_ALL_NOTICES,
	};
};
