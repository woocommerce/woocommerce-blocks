/**
 * External dependencies
 */
import { useCallback } from '@wordpress/element';
import type {
	ValidationData,
	ValidationContextError,
} from '@woocommerce/type-defs/contexts';

/**
 * Internal dependencies
 */
import { useValidationContext } from '../providers/validation/';

/**
 * Custom hook for setting for adding errors to the validation system.
 */
export const useValidation = (): ( (
	validationErrorId: string
) => ValidationData ) => {
	const {
		hasValidationErrors,
		getValidationError,
		clearValidationError,
		hideValidationError,
		setValidationErrors,
	} = useValidationContext();

	return useCallback(
		( validationErrorId: string ) => {
			validationErrorId = `extensions-errors-${ validationErrorId }`;
			return {
				hasValidationErrors,
				getValidationError: () =>
					getValidationError( validationErrorId ),
				clearValidationError: () =>
					clearValidationError( validationErrorId ),
				hideValidationError: () =>
					hideValidationError( validationErrorId ),
				setValidationError: ( error: ValidationContextError ) =>
					setValidationErrors( {
						[ validationErrorId ]: error,
					} ),
			};
		},
		[
			clearValidationError,
			getValidationError,
			hasValidationErrors,
			hideValidationError,
			setValidationErrors,
		]
	);
};
