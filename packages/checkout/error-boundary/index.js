/**
 * External dependencies
 */
import { Component, Fragment } from 'react';

class BlockErrorBoundary extends Component {
	state = { errorMessage: '', hasError: false };

	static getDerivedStateFromError( error ) {
		if (
			typeof error.statusText !== 'undefined' &&
			typeof error.status !== 'undefined'
		) {
			return {
				errorMessage: (
					<Fragment>
						<strong>{ error.status }</strong>:&nbsp;
						{ error.statusText }
					</Fragment>
				),
				hasError: true,
			};
		}

		return { errorMessage: error.message, hasError: true };
	}

	render() {
		const { errorMessage, hasError } = this.state;

		if ( hasError ) {
			return <p>{ errorMessage }</p>;
		}

		return this.props.children;
	}
}

export default BlockErrorBoundary;
