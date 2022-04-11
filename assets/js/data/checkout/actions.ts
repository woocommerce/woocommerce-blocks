/**
 * Internal dependencies
 */
import { ACTION_TYPES as types } from './action-types';

export const setHasError = ( error ) => {
	return {
		type: types.SET_HAS_ERROR,
		error,
	};
};
