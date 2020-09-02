/**
 * External dependencies
 */
import { useState, useEffect } from '@wordpress/element';
import { ValidatedTextInput } from '@woocommerce/base-components/text-input';
import { useShallowEqual } from '@woocommerce/base-hooks';
import { useDebouncedCallback } from 'use-debounce';
import PropTypes from 'prop-types';

const DebouncedValidatedTextInput = ( { onChange, value = '', ...props } ) => {
	// Keep a local copy of the value so we can debounce updates.
	const [ val, setVal ] = useState( value );
	const [ debouncedCallback ] = useDebouncedCallback( ( fields ) => {
		onChange( fields );
	}, 400 );
	const debouncedOnChange = useShallowEqual( debouncedCallback );
	useEffect( () => {
		debouncedOnChange( val );
	}, [ debouncedOnChange, val ] );

	return (
		<ValidatedTextInput onChange={ setVal } value={ val } { ...props } />
	);
};

DebouncedValidatedTextInput.propTypes = {
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string,
};

export default DebouncedValidatedTextInput;
