/**
 * External dependencies
 */
import { Component } from 'react';
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
			<ProductGrid products={ products } layoutConfig={ this.props.layoutConfig } attributes={ this.props.attributes } componentId={ this.props.componentId } />
		);
	}
}

export default withComponentId( Block );
