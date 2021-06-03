/**
 * External dependencies
 */
import { forwardRef, HTMLProps, InputHTMLAttributes } from 'react';
import classnames from 'classnames';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './style.scss';
import Label from '../label';

interface TextInputProps
	extends Omit<
		InputHTMLAttributes< HTMLInputElement >,
		'onChange' | 'onBlur'
	> {
	id: string;
	ariaLabel?: string;
	label?: string;
	ariaDescribedBy?: string;
	screenReaderLabel?: string;
	help?: string;
	feedback?: boolean | JSX.Element;
	autoComplete?: string;
	onChange: ( newValue: string ) => void;
	onBlur?: ( newValue: string ) => void;
	inputProps?: Omit<
		HTMLProps< HTMLInputElement >,
		'onChange' | 'onBlur' | 'ref'
	>;
}

const TextInput = forwardRef< HTMLInputElement, TextInputProps >(
	(
		{
			className,
			id,
			type = 'text',
			ariaLabel,
			ariaDescribedBy,
			label,
			screenReaderLabel,
			disabled,
			help,
			autoCapitalize = 'off',
			autoComplete = 'off',
			value = '',
			onChange,
			required = false,
			onBlur = () => {
				/* Do nothing */
			},
			feedback,
			inputProps,
		},
		ref
	) => {
		const [ isActive, setIsActive ] = useState( false );
		return (
			<div
				className={ classnames(
					'wc-block-components-text-input',
					className,
					{
						'is-active':
							isActive ||
							value ||
							( value === 0 && type === 'number' ),
					}
				) }
			>
				<input
					type={ type }
					id={ id }
					value={ value }
					ref={ ref }
					autoCapitalize={ autoCapitalize }
					autoComplete={ autoComplete }
					onChange={ ( event ) => {
						onChange( event.target.value );
					} }
					onFocus={ () => setIsActive( true ) }
					onBlur={ ( event ) => {
						onBlur( event.target.value );
						setIsActive( false );
					} }
					aria-label={ ariaLabel || label }
					disabled={ disabled }
					aria-describedby={
						!! help && ! ariaDescribedBy
							? id + '__help'
							: ariaDescribedBy
					}
					required={ required }
					{ ...inputProps }
				/>
				<Label
					label={ label }
					screenReaderLabel={ screenReaderLabel || label }
					wrapperElement="label"
					wrapperProps={ {
						htmlFor: id,
					} }
					htmlFor={ id }
				/>
				{ !! help && (
					<p
						id={ id + '__help' }
						className="wc-block-components-text-input__help"
					>
						{ help }
					</p>
				) }
				{ feedback }
			</div>
		);
	}
);

export default TextInput;
