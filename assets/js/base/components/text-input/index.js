/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useState } from '@wordpress/element';
import { withInstanceId } from 'wordpress-compose';
import { useValidationContext } from '@woocommerce/base-context';
import { ValidationInputError } from '@woocommerce/base-components/validation';

/**
 * Internal dependencies
 */
import Label from '../label';
import './style.scss';

const TextInput = ( {
	className,
	instanceId,
	id,
	type = 'text',
	ariaLabel,
	ariaDescribedBy,
	label,
	screenReaderLabel,
	disabled,
	help,
	autoComplete = 'off',
	value = '',
	onChange,
	required = false,
	errorId,
	validateOnMount = true,
	showError = true,
} ) => {
	const [ isActive, setIsActive ] = useState( false );
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
		!! help && ! ariaDescribedBy ? textInputId + '__help' : ariaDescribedBy;
	if ( showError && hasError ) {
		describedBy = getValidationErrorId( textInputId );
	}

	return (
		<div
			className={ classnames( 'wc-block-text-input', className, {
				'is-active': isActive || value,
				'has-error': hasError,
			} ) }
		>
			<input
				type={ type }
				id={ textInputId }
				value={ value }
				ref={ inputRef }
				autoComplete={ autoComplete }
				onChange={ ( event ) => {
					hideValidationError( errorId );
					onChange( event.target.value );
				} }
				onFocus={ () => setIsActive( true ) }
				onBlur={ () => {
					validateInput( false );
					setIsActive( false );
				} }
				aria-label={ ariaLabel || label }
				disabled={ disabled }
				aria-describedby={ describedBy }
				required={ required }
			/>
			<Label
				label={ label }
				screenReaderLabel={ screenReaderLabel || label }
				wrapperElement="label"
				wrapperProps={ {
					htmlFor: textInputId,
				} }
				htmlFor={ textInputId }
			/>
			{ !! help && (
				<p
					id={ textInputId + '__help' }
					className="wc-block-text-input__help"
				>
					{ help }
				</p>
			) }
			{ showError && <ValidationInputError propertyName={ errorId } /> }
		</div>
	);
};

TextInput.propTypes = {
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

export default withInstanceId( TextInput );
