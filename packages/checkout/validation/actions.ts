/**
 * Internal dependencies
 */
import { ACTION_TYPES as types } from './action-types';
import { ReturnOrGeneratorYieldUnion } from '../../../assets/js/data/mapped-types';
import { FieldValidationStatus } from './reducers';

export const setValidationErrors = (
	errors: Record< string, FieldValidationStatus >
) =>
	( {
		type: types.SET_VALIDATION_ERRORS,
		errors,
	} as const );

export type ValidationAction = ReturnOrGeneratorYieldUnion<
	typeof setValidationErrors
>;
