/**
 * External dependencies
 */
import { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import ProductListContainer from '@woocommerce/base-components/product-list/container.js';
import BlockNameContext from '../../../base/utils/block-name-context';

/**
 * The All Products Block. @todo
 */
class Block extends Component {
	static propTypes = {
		/**
		 * The attributes for this block.
		 */
		attributes: PropTypes.object.isRequired,
	};

	render() {
		const { attributes, urlParameterSuffix } = this.props;
		/**
		 * Todo classes
		 *
		 * wp-block-{$this->block_name},
		 * wc-block-{$this->block_name},
		 */
		return (
			<BlockNameContext.Provider value="woocommerce/all-products">
				<ProductListContainer
					attributes={ attributes }
					urlParameterSuffix={ urlParameterSuffix }
				/>
			</BlockNameContext.Provider>
		);
	}
}

export default Block;
