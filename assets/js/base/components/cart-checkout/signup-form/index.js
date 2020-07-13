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
				checked={ false }
				onChange={ () => {} }
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
					onChange={ () => {} }
				/>
			) }
			{ showPasswordField && (
				<ValidatedTextInput
					id={ `${ id }-password` }
					className={ 'wc-block-components-signup-form__password' }
					label={ __(
						'Create account password',
						'woo-gutenberg-products-block'
					) }
					required={ true }
					onChange={ () => {} }
				/>
			) }
		</div>
	);
};

SignupForm.propTypes = {
	showUsernameField: PropTypes.bool,
	showPasswordField: PropTypes.bool,
};

export default withInstanceId( SignupForm );
