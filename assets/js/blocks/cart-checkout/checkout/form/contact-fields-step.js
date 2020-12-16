/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { FormStep } from '@woocommerce/base-components/cart-checkout';
import { ValidatedTextInput } from '@woocommerce/base-components/text-input';
import { useCheckoutContext } from '@woocommerce/base-context';
import {
	CHECKOUT_ALLOWS_GUEST,
	CHECKOUT_ALLOWS_SIGNUP,
} from '@woocommerce/block-settings';
import CheckboxControl from '@woocommerce/base-components/checkbox-control';

/**
 * Internal dependencies
 */
import LoginPrompt from './login-prompt';
const ContactFieldsStep = ( {
	emailValue,
	onChangeEmail,
	allowCreateAccount,
} ) => {
	const {
		isProcessing: checkoutIsProcessing,
		customerId,
		shouldCreateAccount,
		setShouldCreateAccount,
	} = useCheckoutContext();

	const createAccountUI = ! customerId &&
		allowCreateAccount &&
		CHECKOUT_ALLOWS_GUEST &&
		CHECKOUT_ALLOWS_SIGNUP && (
			<CheckboxControl
				className="wc-block-checkout__create-account"
				label={ __(
					'Create an account?',
					'woo-gutenberg-products-block'
				) }
				checked={ shouldCreateAccount }
				onChange={ ( value ) => setShouldCreateAccount( value ) }
			/>
		);
	return (
		<FormStep
			id="contact-fields"
			disabled={ checkoutIsProcessing }
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
				value={ emailValue }
				autoComplete="email"
				onChange={ onChangeEmail }
				required={ true }
			/>
			{ createAccountUI }
		</FormStep>
	);
};

export default ContactFieldsStep;
