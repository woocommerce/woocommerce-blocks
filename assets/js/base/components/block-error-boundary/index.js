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
	/**
	 * Content to display in the error block below the header.
	 * If it's `null` or an empty string, nothing will be displayed.
	 * If it's not defined, the default content will be used.
	 */
	content: PropTypes.node,
	/**
	 * Text to display as the heading of the error block.
	 * If it's `null` or an empty string, no header will be displayed.
	 * If it's not defined, the default header will be used.
	 */
	header: PropTypes.string,
	/**
	 * URL of the image to display.
	 * If it's `null` or an empty string, no image will be displayed.
	 * If it's not defined, the default image will be used.
	 */
	imageUrl: PropTypes.string,
	/**
	 * Whether to display the JS error message.
	 */
	showErrorMessage: PropTypes.bool,
};

BlockErrorBoundary.defaultProps = {
	showErrorMessage: false,
};

export default BlockErrorBoundary;
