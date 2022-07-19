/**
 * External dependencies
 */
import { FormTokenField as WPFormTokenField } from 'wordpress-components';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import './style.scss';

export interface Props {
	className?: string;
	style?: React.CSSProperties;
	suggestions: string[];
	value: string[];
	disabled?: boolean;
	multiple?: boolean;
	placeholder?: string;
	onChange: ( value: string[] ) => void;
	displayTransform?: ( value: string ) => string | JSX.Element;
	messages?: Record< string, string >;
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
	messages = {},
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
				__experimentalValidateInput={ ( token: string ) =>
					suggestions.includes( token )
				}
				maxLength={ multiple ? undefined : 1 }
				disabled={ disabled }
				placeholder={ placeholder }
				label=""
				onChange={ onChange }
				value={ value }
				displayTransform={ displayTransform }
				messages={ messages }
			/>
		</div>
	);
};

export default FormTokenField;
