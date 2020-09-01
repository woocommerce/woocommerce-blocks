/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { FormStep } from '@woocommerce/base-components/cart-checkout';
import { ValidatedTextInput } from '@woocommerce/base-components/text-input';
import { useCheckoutAddress } from '@woocommerce/base-hooks';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import LoginPrompt from './login-prompt';

const ContactFieldsStep = ( { disabled } ) => {
	const { billingFields, setEmail } = useCheckoutAddress();

	return (
		<FormStep
			id="contact-fields"
			disabled={ disabled }
			className="wc-block-checkout__contact-fields"
			title={ __(
				'Contact information',
				'woo-gutenberg-products-block'
			) }
			description={ __(
				"We'll use this email to send you details and updates about your order.",
				'woo-gutenberg-products-block'
			) }
			stepHeadingContent={ () => <LoginPrompt /> }
		>
			<ValidatedTextInput
				id="email"
				type="email"
				label={ __( 'Email address', 'woo-gutenberg-products-block' ) }
				value={ billingFields.email }
				autoComplete="email"
				onChange={ setEmail }
				required={ true }
			/>
		</FormStep>
	);
};

ContactFieldsStep.propTypes = {
	disabled: PropTypes.bool.isRequired,
};

export default ContactFieldsStep;
