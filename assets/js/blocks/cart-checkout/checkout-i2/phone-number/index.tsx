/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { ValidatedTextInput } from '@woocommerce/base-components/text-input';

/**
 * Renders a phone number input.
 */
const PhoneNumber = ( {
	id = 'phone',
	isRequired = false,
	value = '',
	onChange,
}: {
	id?: string;
	isRequired: boolean;
	value: string;
	onChange: ( value: string ) => void;
} ): JSX.Element => {
	return (
		<ValidatedTextInput
			id={ id }
			type="tel"
			autoComplete="tel"
			required={ isRequired }
			label={
				isRequired
					? __( 'Phone', 'woo-gutenberg-products-block' )
					: __( 'Phone (optional)', 'woo-gutenberg-products-block' )
			}
			value={ value }
			onChange={ onChange }
		/>
	);
};

export default PhoneNumber;
