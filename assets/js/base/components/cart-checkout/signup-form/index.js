/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { ValidatedTextInput } from '@woocommerce/base-components/text-input';
import { withInstanceId } from '@woocommerce/base-hocs/with-instance-id';
import CheckboxControl from '@woocommerce/base-components/checkbox-control';

/**
 * Checkout signup form.
 */
const SignupForm = ( {
	instanceId: id,
	createAccount = false,
	username = '',
	password = '',
	setCreateAccount = () => {},
	setUsername = () => {},
	setPassword = () => {},
	showUsernameField = false,
	showPasswordField = false,
} ) => {
	// coming soon to all fields: value, onChange, errorMessage

	return (
		<div id={ id } className="wc-block-components-signup-form">
			<CheckboxControl
				className="wc-block-checkout__create-account"
				label={ __(
					'Create an account?',
					'woo-gutenberg-products-block'
				) }
				checked={ createAccount }
				onChange={ ( value ) => setCreateAccount( value ) }
			/>
			{ showUsernameField && (
				<ValidatedTextInput
					id={ `${ id }-username` }
					className={ 'wc-block-components-signup-form__username' }
					label={ __(
						'Account username',
						'woo-gutenberg-products-block'
					) }
					required={ true }
					value={ username }
					onChange={ ( value ) => setUsername( value ) }
				/>
			) }
			{ showPasswordField && (
				<ValidatedTextInput
					id={ `${ id }-password` }
					className={ 'wc-block-components-signup-form__password' }
					type="password"
					label={ __(
						'Create account password',
						'woo-gutenberg-products-block'
					) }
					required={ true }
					value={ password }
					onChange={ ( value ) => setPassword( value ) }
				/>
			) }
		</div>
	);
};

SignupForm.propTypes = {
	createAccount: PropTypes.bool,
	username: PropTypes.string,
	password: PropTypes.string,
	setCreateAccount: PropTypes.func,
	setUsername: PropTypes.func,
	setPassword: PropTypes.func,
	showUsernameField: PropTypes.bool,
	showPasswordField: PropTypes.bool,
};

export default withInstanceId( SignupForm );
