/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from 'react';
import { Notice } from 'wordpress-components';
import PropTypes from 'prop-types';
import { CURRENT_USER_IS_ADMIN } from '@woocommerce/block-settings';

class PaymentMethodErrorBoundary extends Component {
	state = { errorMessage: '' };

	static getDerivedStateFromError( error ) {
		const { isEditor } = this.props;

		const errorMessage =
			error.message && ( isEditor || CURRENT_USER_IS_ADMIN )
				? error.message
				: __(
						'There was an error loading the payment method.',
						'woo-gutenberg-products-block'
				  );
		return {
			errorMessage,
		};
	}

	render() {
		const { errorMessage } = this.state;

		if ( errorMessage ) {
			return (
				<Notice isDismissible={ false } status="error">
					{ errorMessage }
				</Notice>
			);
		}

		return this.props.children;
	}
}

PaymentMethodErrorBoundary.propTypes = {
	isEditor: PropTypes.bool,
};

PaymentMethodErrorBoundary.defaultProps = {
	isEditor: false,
};

export default PaymentMethodErrorBoundary;
