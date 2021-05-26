/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { ValidatedTextInput } from '@woocommerce/base-components/text-input';
import {
	useCheckoutContext,
	useCheckoutAddress,
} from '@woocommerce/base-context';
import { getSetting } from '@woocommerce/settings';
import CheckboxControl from '@woocommerce/base-components/checkbox-control';

/**
 * Internal dependencies
 */

const Block = ( {
	allowCreateAccount,
}: {
	allowCreateAccount: boolean;
} ): JSX.Element => {
	const {
		customerId,
		shouldCreateAccount,
		setShouldCreateAccount,
	} = useCheckoutContext();
	const { billingFields, setEmail } = useCheckoutAddress();

	const onChangeEmail = ( value ) => {
		setEmail( value );
		//dispatchCheckoutEvent( 'set-email-address' );
	};

	const createAccountUI = ! customerId &&
		allowCreateAccount &&
		getSetting( 'checkoutAllowsGuest', false ) &&
		getSetting( 'checkoutAllowsSignup', false ) && (
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
		<>
			<ValidatedTextInput
				id="email"
				type="email"
				label={ __( 'Email address', 'woo-gutenberg-products-block' ) }
				value={ billingFields.email }
				autoComplete="email"
				onChange={ onChangeEmail }
				required={ true }
			/>
			{ createAccountUI }
		</>
	);
};

export default Block;
