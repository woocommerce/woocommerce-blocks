/**
 * External dependencies
 */
import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import withComponentId from '../../../base/hocs/with-component-id';

/**
 * The All Products Block. @todo
 */
class Block extends Component {
	static propTypes = {
		/**
		 * The attributes for this block.
		 */
		attributes: PropTypes.object.isRequired,
		/**
		 * From withComponentId.
		 */
		componentId: PropTypes.number,
	}

	render() {
		return (
			<Fragment>
				Content goes here.
			</Fragment>
		);
	}
}

export default withComponentId( Block );
