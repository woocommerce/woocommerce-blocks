/**
 * External dependencies
 */
import { Component } from 'react';

/**
 * Internal dependencies
 */
import BlockError from './block-error';
import './style.scss';

interface DerivedStateReturn {
	errorMessage: JSX.Element | string;
	hasError: boolean;
}

interface Error {
	status: string;
	statusText: string;
	message: string;
}

type RenderError = ( props: RenderErrorProps ) => React.ReactNode | null;

interface RenderErrorProps {
	errorMessage: React.ReactNode;
}

interface BlockErrorBoundaryProps {
	header: string;
	imageUrl: string;
	showErrorMessage: boolean;
	text: React.ReactNode;
	errorMessagePrefix: string;
	renderError: RenderError;
	button: React.ReactNode;
}

class BlockErrorBoundary extends Component< BlockErrorBoundaryProps > {
	state = { errorMessage: '', hasError: false };

	static getDerivedStateFromError( error: Error ): DerivedStateReturn {
		if (
			typeof error.statusText !== 'undefined' &&
			typeof error.status !== 'undefined'
		) {
			return {
				errorMessage: (
					<>
						<strong>{ error.status }</strong>:&nbsp;
						{ error.statusText }
					</>
				),
				hasError: true,
			};
		}

		return { errorMessage: error.message, hasError: true };
	}

	render(): JSX.Element | React.ReactNode {
		const {
			header,
			imageUrl,
			showErrorMessage = true,
			text,
			errorMessagePrefix,
			renderError,
			button,
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
					button={ button }
				/>
			);
		}

		return this.props.children;
	}
}

export default BlockErrorBoundary;
