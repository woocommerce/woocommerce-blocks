/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Label from '../label';
import './style.scss';

const TextInput = ( {
	className,
	id,
	ariaLabel,
	label,
	screenReaderLabel,
	disabled,
	help,
} ) => {
	const [ isActive, setIsActive ] = useState( false );
	const [ value, setValue ] = useState( '' );
	return (
		<div
			className={ classnames( 'wc-components-text-input', className, {
				'is-active': isActive || value,
			} ) }
		>
			<Label
				label={ label }
				screenReaderLabel={ screenReaderLabel || label }
				wrapperElement="label"
				wrapperProps={ {
					htmlFor: id,
				} }
				htmlFor={ id }
			/>
			<input
				type="text"
				id={ id }
				value={ value }
				onChange={ ( { target } ) => setValue( target.value ) }
				onFocus={ () => setIsActive( true ) }
				onBlur={ () => setIsActive( false ) }
				aria-label={ ariaLabel || label }
				disabled={ disabled }
				aria-describedby={ !! help ? id + '__help' : undefined }
			/>
			{ !! help && (
				<p
					id={ id + '__help' }
					className="wc-components-text-input__help"
				>
					{ help }
				</p>
			) }
		</div>
	);
};

TextInput.propTypes = {
	id: PropTypes.string,
	value: PropTypes.string,
	onChangeValue: PropTypes.func,
	ariaLabel: PropTypes.string,
	label: PropTypes.string,
	screenReaderLabel: PropTypes.string,
	disabled: PropTypes.bool,
	help: PropTypes.string,
};

export default TextInput;
