/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from 'react';
import { Notice } from 'wordpress-components';
import PropTypes from 'prop-types';
import { CURRENT_USER_IS_ADMIN } from '@woocommerce/block-settings';

class PaymentMethodErrorBoundary extends Component {
	state = { errorMessage: '', hasError: false };

	static getDerivedStateFromError( error ) {
		return {
			errorMessage: error.message,
			hasError: true,
		};
	}

	render() {
		const { hasError, errorMessage } = this.state;
		const { isEditor } = this.props;

		if ( hasError ) {
			return (
				<Notice isDismissible={ false } status="error">
					{ errorMessage && ( isEditor || CURRENT_USER_IS_ADMIN )
						? errorMessage
						: __(
								'There was an error loading the payment method.',
								'woo-gutenberg-products-block'
						  ) }
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
