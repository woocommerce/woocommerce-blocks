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
		const { header, imageUrl, showErrorMessage, text } = this.props;
		const { errorMessage, hasError } = this.state;

		if ( hasError ) {
			return (
				<BlockError
					header={ header }
					imageUrl={ imageUrl }
					errorMessage={ showErrorMessage ? errorMessage : null }
					text={ text }
				/>
			);
		}

		return this.props.children;
	}
}

BlockErrorBoundary.propTypes = {
	header: PropTypes.string,
	imageUrl: PropTypes.string,
	showErrorMessage: PropTypes.bool,
	text: PropTypes.string,
};

BlockErrorBoundary.defaultProps = {
	showErrorMessage: false,
};

export default BlockErrorBoundary;
