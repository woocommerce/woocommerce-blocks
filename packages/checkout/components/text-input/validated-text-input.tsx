/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useRef, useEffect, useState, InputHTMLAttributes } from 'react';
import classnames from 'classnames';
import { withInstanceId } from '@wordpress/compose';
import { isObject } from '@woocommerce/types';
import { useDispatch, useSelect } from '@wordpress/data';
import { VALIDATION_STORE_KEY } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import TextInput from './text-input';
import './style.scss';
import { ValidationInputError } from '../validation-input-error';

interface ValidatedTextInputProps
	extends Omit<
		InputHTMLAttributes< HTMLInputElement >,
		'onChange' | 'onBlur'
	> {
	id?: string;
	instanceId: string;
	className?: string | undefined;
	ariaDescribedBy?: string | undefined;
	errorId?: string;
	focusOnMount?: boolean;
	showError?: boolean;
	errorMessage?: string | undefined;
	onChange: ( newValue: string ) => void;
	label?: string | undefined;
	value: string;
	requiredMessage?: string | undefined;
	customValidation?:
		| ( ( inputObject: HTMLInputElement ) => boolean )
		| undefined;
}

const ValidatedTextInput = ( {
	className,
	instanceId,
	id,
	ariaDescribedBy,
	errorId,
	focusOnMount = false,
	onChange,
	showError = true,
	errorMessage: passedErrorMessage = '',
	value = '',
	requiredMessage,
	customValidation,
	...rest
}: ValidatedTextInputProps ): JSX.Element => {
	const [ isPristine, setIsPristine ] = useState( true );
	const [ inputValue, setInputValue ] = useState( value );
	const inputRef = useRef< HTMLInputElement >( null );
	const textInputId =
		typeof id !== 'undefined' ? id : 'textinput-' + instanceId;
	const errorIdString = errorId !== undefined ? errorId : textInputId;

	const { setValidationErrors, hideValidationError, clearValidationError } =
		useDispatch( VALIDATION_STORE_KEY );

	const { validationError, validationErrorId } = useSelect( ( select ) => {
		const store = select( VALIDATION_STORE_KEY );
		return {
			validationError: store.getValidationError( errorIdString ),
			validationErrorId: store.getValidationErrorId( errorIdString ),
		};
	} );

	/**
	 * If the input is in pristine state on mount, focus the element.
	 */
	useEffect( () => {
		if ( isPristine && focusOnMount ) {
			inputRef.current?.focus();
		}
		setIsPristine( false );
	}, [ focusOnMount, isPristine, setIsPristine ] );

	/**
	 * Trigger validation on state change if the current element is not in focus. This is because autofilled elements do not
	 * trigger the blur() event, and so values can be validated in the background if the state changes elsewhere.
	 */
	useEffect( () => {
		if (
			inputRef &&
			inputRef.current !== null &&
			inputRef.current?.ownerDocument?.activeElement !== inputRef.current
		) {
			inputRef.current.blur();
		}
		// We need to track value even if it is not directly used so we know when it changes.
	}, [ value ] );

	// Remove validation errors when unmounted.
	useEffect( () => {
		return () => {
			clearValidationError( errorIdString );
		};
	}, [ clearValidationError, errorIdString ] );

	const validateInput = ( errorsHidden = true ) => {
		const inputObject = inputRef.current || null;

		if ( inputObject === null ) {
			return;
		}

		inputObject.value = inputObject.value.trim(); // Trim white space before validation.
		inputObject.setCustomValidity( '' );

		const inputIsValid = customValidation
			? inputObject.checkValidity() && customValidation( inputObject )
			: inputObject.checkValidity();

		if ( inputIsValid ) {
			clearValidationError( errorIdString );
			return;
		}

		const validityState = inputObject.validity;

		if ( validityState.valueMissing && requiredMessage ) {
			inputObject.setCustomValidity( requiredMessage );
		}

		setValidationErrors( {
			[ errorIdString ]: {
				message:
					inputObject.validationMessage ||
					__( 'Invalid value.', 'woo-gutenberg-products-block' ),
				hidden: errorsHidden,
			},
		} );
	};

	const inputIsValid = (): boolean => {
		const inputObject = inputRef.current || null;

		if ( inputObject === null ) {
			return false;
		}

		return inputObject.validity.valid;
	};

	if ( passedErrorMessage !== '' && isObject( validationError ) ) {
		validationError.message = passedErrorMessage;
	}

	const hasError = validationError?.message && ! validationError?.hidden;
	const describedBy =
		showError && hasError && validationErrorId
			? validationErrorId
			: ariaDescribedBy;

	return (
		<TextInput
			className={ classnames( className, {
				'has-error': hasError,
			} ) }
			aria-invalid={ hasError === true }
			id={ textInputId }
			feedback={
				showError && (
					<ValidationInputError
						errorMessage={ passedErrorMessage }
						propertyName={ errorIdString }
					/>
				)
			}
			ref={ inputRef }
			onInput={ () => {
				validateInput( true );
			} }
			onChange={ ( val ) => {
				// Update our local state.
				setInputValue( val );
				// Hide errors while typing.
				hideValidationError( errorIdString );
				// Revalidate on user input so we know if the value is valid.
				validateInput( true );
				// Push the changes up to the parent component if the value is valid.
				if ( inputIsValid() ) {
					onChange( val );
				}
			} }
			onBlur={ () => {
				validateInput( false );
			} }
			ariaDescribedBy={ describedBy }
			value={ inputValue }
			{ ...rest }
		/>
	);
};
export const __ValidatedTexInputWithoutId = ValidatedTextInput;
export default withInstanceId( ValidatedTextInput );
