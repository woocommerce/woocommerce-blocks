/**
 * External dependencies
 */
import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import withComponentId from '../../../base/hocs/with-component-id';
import ProductGrid from '../../../base/components/product-grid';

// Temporary data.
import products from './sample-data.json';

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
		/**
		 * Todo classes
		 *
		 * wp-block-{$this->block_name},
		 * wc-block-{$this->block_name},
		 */
		return (
			<Fragment>
				<ProductGrid products={ products } attributes={ this.props.attributes } componentId={ this.props.componentId } />
			</Fragment>
		);
	}
}

export default withComponentId( Block );
