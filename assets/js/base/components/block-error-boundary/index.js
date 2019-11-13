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

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	render() {
		const { hasError } = this.state;

		if ( hasError ) {
			return <BlockError />;
		}

		return this.props.children;
	}
}

export default BlockErrorBoundary;
