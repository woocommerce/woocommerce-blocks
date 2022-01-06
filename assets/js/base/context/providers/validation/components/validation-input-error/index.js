/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { useSelect } from '@wordpress/data';
import { VALIDATION_STORE_KEY } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import './style.scss';
//import { useValidationContext } from '../../context';

export const ValidationInputError = ( {
	errorMessage = '',
	propertyName = '',
	elementId = '',
} ) => {
	//const { getValidationError, getValidationErrorId } = useValidationContext();
	/* Note that I've short-circuited the function below to avoid needing the useValidationContext */
	const getValidationErrorId = ( _elementId ) =>
		`error- ${ _elementId }-${ propertyName }`;
	const validationError = useSelect( ( select ) =>
		select( VALIDATION_STORE_KEY ).getValidationError( propertyName )
	);

	if ( ! errorMessage || typeof errorMessage !== 'string' ) {
		const error = validationError || {};
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
