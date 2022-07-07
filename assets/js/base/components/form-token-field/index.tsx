/**
 * External dependencies
 */
import { FormTokenField as WPFormTokenField } from 'wordpress-components';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import './style.scss';

interface Props {
	className?: string;
	style?: React.CSSProperties;
	suggestions: string[];
	value: string[];
	disabled?: boolean;
	multiple?: boolean;
	placeholder?: string;
	onChange: ( value: string[] ) => void;
	displayTransform?: ( value: string ) => string | JSX.Element;
}

const FormTokenField = ( {
	className,
	style,
	suggestions,
	value,
	disabled,
	multiple,
	placeholder,
	onChange,
	displayTransform,
}: Props ) => {
	return (
		<div
			className={ classNames(
				'wc-blocks-components-form-token-field-wrapper',
				className
			) }
			style={ style }
		>
			<WPFormTokenField
				suggestions={ suggestions }
				__experimentalExpandOnFocus={ true }
				__experimentalShowHowTo={ false }
				maxLength={ multiple ? undefined : 1 }
				disabled={ disabled }
				placeholder={ placeholder }
				label=""
				onChange={ onChange }
				value={ value }
				displayTransform={ displayTransform }
			/>
		</div>
	);
};

export default FormTokenField;
