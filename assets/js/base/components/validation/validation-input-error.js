/**
 * External dependencies
 */
import { useValidationContext } from '@woocommerce/base-context';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import './style.scss';

export const ValidationInputError = ( {
	errorMessage = '',
	propertyName = '',
} ) => {
	const { getValidationError } = useValidationContext();
	if ( ! errorMessage && ! propertyName ) {
		return null;
	}
	errorMessage = errorMessage || getValidationError( propertyName );
	return (
		<div className="wc-block-form-input-validation-error" role="alert">
			{ errorMessage }
		</div>
	);
};

ValidationInputError.propTypes = {
	errorMessage: PropTypes.string,
	propertyName: PropTypes.string,
};
