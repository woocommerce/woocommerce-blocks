/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	// @ts-expect-error Using experimental features
	__experimentalNumberControl as NumberControl,
	// @ts-expect-error Using experimental features
	__experimentalInputControlPrefixWrapper as InputControlPrefixWrapper,
} from '@wordpress/components';

interface PriceTextFieldProps {
	value: number;
	onChange: ( min: number ) => void;
	label?: string;
}

const PriceTextField: React.FC< PriceTextFieldProps > = ( {
	value,
	onChange,
	label,
} ) => {
	return (
		<NumberControl
			value={ value }
			onChange={ ( min: string ) => {
				onChange( Number( min ) );
			} }
			label={ label }
			prefix={
				<InputControlPrefixWrapper>{ label }</InputControlPrefixWrapper>
			}
			placeholder={ __( 'Auto', 'woo-gutenberg-products-block' ) }
			isPressEnterToChange
			hideLabelFromVision
			hideHTMLArrows
			type="number"
			min={ 0 }
			style={ {
				textAlign: 'right',
			} }
			__next40pxDefaultSize
		/>
	);
};

export default PriceTextField;
