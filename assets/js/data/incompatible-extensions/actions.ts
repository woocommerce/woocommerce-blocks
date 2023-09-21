/**
 * Internal dependencies
 */
import { ACTION_TYPES } from './action-types';

export const addIncompatibleExtension = ( extension: string ) => {
	return {
		type: ACTION_TYPES.ADD_INCOMPATIBLE_EXTENSION,
		extension,
	};
};

export const removeIncompatibleExtension = ( extension: string ) => {
	return {
		type: ACTION_TYPES.REMOVE_INCOMPATIBLE_EXTENSION,
		extension,
	};
};
