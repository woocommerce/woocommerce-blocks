/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { CHECKOUT_SHOW_LOGIN_REMINDER } from '@woocommerce/block-settings';
import { useCheckoutContext } from '@woocommerce/base-context';
import PropTypes from 'prop-types';

const LoginPrompt = ( { loginToCheckoutUrl } ) => {
	const { customerId } = useCheckoutContext();

	if ( ! CHECKOUT_SHOW_LOGIN_REMINDER || customerId ) {
		return null;
	}

	return (
		<>
			{ __(
				'Already have an account? ',
				'woo-gutenberg-products-block'
			) }
			<a href={ loginToCheckoutUrl }>
				{ __( 'Log in.', 'woo-gutenberg-products-block' ) }
			</a>
		</>
	);
};

LoginPrompt.propTypes = {
	loginToCheckoutUrl: PropTypes.string.isRequired,
};

export default LoginPrompt;
