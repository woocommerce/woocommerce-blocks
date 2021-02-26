/**
 * External dependencies
 */
import { Component } from 'react';
import triggerFetch from '@wordpress/api-fetch';

class CheckoutSlotErrorBoundary extends Component {
	state = { errorMessage: '', hasError: false, stack: '' };

	static getDerivedStateFromError( error ) {
		if (
			typeof error.statusText !== 'undefined' &&
			typeof error.status !== 'undefined'
		) {
			return {
				errorMessage: (
					<>
						<strong>{ error.status }</strong>
						{ ': ' + error.statusText }
					</>
				),
				hasError: true,
			};
		}

		return {
			errorMessage: error.message,
			stack: error.stack,
			hasError: true,
		};
	}

	sendErrorToHost( origin, content, stack ) {
		triggerFetch( {
			path: '/wc/store/error',
			method: 'POST',
			data: {
				origin,
				content,
				stack,
			},
			cache: 'no-store',
			parse: false,
		} );
	}

	render() {
		const { renderError, origin = '', sendToHost = false } = this.props;
		const { errorMessage, hasError, stack } = this.state;

		if ( hasError ) {
			if ( sendToHost ) {
				this.sendErrorToHost( origin, errorMessage, stack );
			}
			if ( typeof renderError === 'function' ) {
				return renderError( errorMessage );
			}
			return <p>{ errorMessage }</p>;
		}

		return this.props.children;
	}
}

export default CheckoutSlotErrorBoundary;
