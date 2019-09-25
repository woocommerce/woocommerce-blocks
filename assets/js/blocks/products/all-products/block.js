/**
 * External dependencies
 */
import { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import withComponentId from '../../../base/hocs/with-component-id';
import withProducts from '../../../base/hocs/with-products';
import ProductGrid from '../../../base/components/product-grid';

/**
 * The All Products Block. @todo
 */
class Block extends Component {
	static propTypes = {
		/**
		 * The attributes for this block.
		 */
		attributes: PropTypes.object.isRequired,
		// From withComponentId.
		componentId: PropTypes.number,
		// From withProducts.
		products: PropTypes.array,
	};

	render() {
		const { attributes, componentId, products } = this.props;
		/**
		 * Todo classes
		 *
		 * wp-block-{$this->block_name},
		 * wc-block-{$this->block_name},
		 */
		return (
			<ProductGrid
				attributes={ attributes }
				componentId={ componentId }
				products={ products }
			/>
		);
	}
}

export default withComponentId( withProducts( Block ) );
