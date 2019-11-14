/**
 * External dependencies
 */
import { Component } from 'react';
import PropTypes from 'prop-types';

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
		const { content, header, imageUrl, showErrorMessage } = this.props;
		const { errorMessage, hasError } = this.state;

		if ( hasError ) {
			return (
				<BlockError
					content={ content }
					header={ header }
					imageUrl={ imageUrl }
					errorMessage={ showErrorMessage ? errorMessage : null }
				/>
			);
		}

		return this.props.children;
	}
}

BlockErrorBoundary.propTypes = {
	content: PropTypes.node,
	header: PropTypes.string,
	imageUrl: PropTypes.string,
	showErrorMessage: PropTypes.bool,
};

BlockErrorBoundary.defaultProps = {
	showErrorMessage: false,
};

export default BlockErrorBoundary;
