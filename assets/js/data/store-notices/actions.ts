/**
 * Internal dependencies
 */
import { ACTION_TYPES } from './action-types';

export const registerContainer = (
	containerContext: string,
	ref: React.MutableRefObject< HTMLDivElement | null >
) => {
	return {
		type: ACTION_TYPES.REGISTER_CONTAINER,
		containerContext,
		ref,
	};
};

export const unregisterContainer = ( containerContext: string ) => {
	return {
		type: ACTION_TYPES.UNREGISTER_CONTAINER,
		containerContext,
	};
};
