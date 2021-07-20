/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { ValidatedTextInput } from '@woocommerce/base-components/text-input';

/**
 * Renders a phone number input.
 *
 * @param {Object} props Component props.
 * @param {boolean} props.isRequired Is the phone number required or optional.
 * @param {Function} props.onChange Event fired when the input changes.
 * @param {string} props.value Value of the input.
 * @return {*} The component.
 */
const PhoneNumber = ( { isRequired = false, value = '', onChange } ) => {
	return (
		<ValidatedTextInput
			id="phone"
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
