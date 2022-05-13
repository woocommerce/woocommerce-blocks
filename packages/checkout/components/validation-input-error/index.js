/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import './style.scss';
import { VALIDATION_STORE_KEY } from '../../validation';

export const ValidationInputError = ( {
	errorMessage = '',
	propertyName = '',
	elementId = '',
} ) => {
	const { getValidationError, getValidationErrorId } = useSelect(
		( select ) => {
			const store = select( VALIDATION_STORE_KEY );
			return {
				getValidationError: store.getValidationError(),
				getValidationErrorId: store.getValidationErrorId(),
			};
		}
	);

	if ( ! errorMessage || typeof errorMessage !== 'string' ) {
		const error = getValidationError( propertyName ) || {};
		if ( error.message && ! error.hidden ) {
			errorMessage = error.message;
		} else {
			return null;
		}
	}

	return (
		<div className="wc-block-components-validation-error" role="alert">
			<p id={ getValidationErrorId( elementId ) }>{ errorMessage }</p>
		</div>
	);
};

ValidationInputError.propTypes = {
	errorMessage: PropTypes.string,
	propertyName: PropTypes.string,
	elementId: PropTypes.string,
};

export default ValidationInputError;
