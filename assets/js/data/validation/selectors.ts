/**
 * Internal dependencies
 */
import type { State } from './reducers';

export const getValidationError = ( state: State, errorId: string ) => {
	return state[ errorId ];
};
