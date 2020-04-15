/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from 'react';
import { Notice } from 'wordpress-components';

class PaymentMethodErrorBoundary extends Component {
	state = { errorMessage: '' };

	static getDerivedStateFromError( error ) {
		return {
			errorMessage:
				error.message ||
				__(
					'There was an error loading the payment method.',
					'woo-gutenberg-products-block'
				),
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

export default PaymentMethodErrorBoundary;
