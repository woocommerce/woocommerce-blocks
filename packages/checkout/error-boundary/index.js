/**
 * External dependencies
 */
import { Component } from 'react';
import triggerFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import BlockError from './block-error';
import './style.scss';
class BlockErrorBoundary extends Component {
	state = { errorMessage: '', hasError: false };

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
			hasError: true,
		};
	}
	componentDidCatch( error ) {
		if ( this.props.sendToHost ) {
			triggerFetch( {
				path: '/wc/store/error',
				method: 'POST',
				data: {
					origin: this.props.origin,
					content: error.message,
				},
				cache: 'no-store',
				parse: false,
			} );
		}
	}

	render() {
		const {
			header,
			imageUrl,
			showErrorMessage,
			text,
			errorMessagePrefix,
			renderError,
		} = this.props;
		const { errorMessage, hasError } = this.state;
		if ( hasError ) {
			if ( typeof renderError === 'function' ) {
				return renderError( { errorMessage } );
			}
			return (
				<BlockError
					errorMessage={ showErrorMessage ? errorMessage : null }
					header={ header }
					imageUrl={ imageUrl }
					text={ text }
					errorMessagePrefix={ errorMessagePrefix }
				/>
			);
		}

		return this.props.children;
	}
}

export default BlockErrorBoundary;
