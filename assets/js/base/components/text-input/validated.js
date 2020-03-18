/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useValidationContext } from '@woocommerce/base-context';
import { ValidationInputError } from '@woocommerce/base-components/validation';
import { withInstanceId } from 'wordpress-compose';

/**
 * Internal dependencies
 */
import TextInput from './index';
import './style.scss';

const ValidatedTextInput = ( {
	className,
	instanceId,
	id,
	ariaDescribedBy,
	help,
	value = '',
	errorId,
	validateOnMount = true,
	onChange,
	showError = true,
	...rest
} ) => {
	const inputRef = useRef();
	const {
		getValidationError,
		hideValidationError,
		setValidationErrors,
		clearValidationError,
		getValidationErrorId,
	} = useValidationContext();

	const textInputId = id || 'textinput-' + instanceId;
	errorId = errorId || textInputId;
	const validateInput = ( errorsHidden = true ) => {
		if ( inputRef.current.checkValidity() ) {
			clearValidationError( errorId );
		} else {
			setValidationErrors( {
				[ errorId ]: {
					message:
						inputRef.current.validationMessage ||
						__( 'Invalid value.', 'woo-gutenberg-products-block' ),
					hidden: errorsHidden,
				},
			} );
		}
	};

	useEffect( () => {
		if ( validateOnMount ) {
			validateInput();
		}
	}, [ validateOnMount ] );

	const errorMessage = getValidationError( errorId ) || {};
	const hasError = errorMessage.message && ! errorMessage.hidden;
	let describedBy =
		!! help && ! ariaDescribedBy ? textInputId + '__help' : ariaDescribedBy; // @todo can be removed?
	if ( showError && hasError ) {
		describedBy = getValidationErrorId( textInputId );
	}

	return (
		<TextInput
			className={ classnames( className, {
				'has-error': hasError,
			} ) }
			id={ textInputId }
			onBlur={ () => {
				validateInput( false );
			} }
			feedback={
				showError && <ValidationInputError propertyName={ errorId } />
			}
			value={ value }
			ref={ inputRef }
			onChange={ ( val ) => {
				hideValidationError( errorId );
				onChange( val );
			} }
			ariaDescribedBy={ describedBy }
			{ ...rest }
		/>
	);
};

ValidatedTextInput.propTypes = {
	onChange: PropTypes.func.isRequired,
	id: PropTypes.string,
	value: PropTypes.string,
	ariaLabel: PropTypes.string,
	ariaDescribedBy: PropTypes.string,
	label: PropTypes.string,
	screenReaderLabel: PropTypes.string,
	disabled: PropTypes.bool,
	help: PropTypes.string,
	autoComplete: PropTypes.string,
	required: PropTypes.bool,
	errorId: PropTypes.string,
	validateOnMount: PropTypes.bool,
	showError: PropTypes.bool,
};

export default withInstanceId( ValidatedTextInput );
