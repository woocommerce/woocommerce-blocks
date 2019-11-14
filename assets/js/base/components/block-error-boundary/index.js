/**
 * External dependencies
 */
import { Component } from 'react';

/**
 * Internal dependencies
 */
import BlockError from './block-error';
import './style.scss';

class BlockErrorBoundary extends Component {
	state = { hasError: false };

	static getDerivedStateFromError( error ) {
		return { errorMessage: error.message, hasError: true };
	}

	render() {
		const { errorMessage, hasError } = this.state;

		if ( hasError ) {
			return <BlockError errorMessage={ errorMessage } />;
		}

		return this.props.children;
	}
}

export default BlockErrorBoundary;
