/**
 * External dependencies
 */
import { Component } from 'react';
import PropTypes from 'prop-types';
import ProductListContainer from '@woocommerce/base-components/product-list/container';
import { useInnerBlockLayoutContextProvider } from '@woocommerce/shared-context';
import { gridBlockPreview } from '@woocommerce/resource-previews';

/**
 * The All Products Block.
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

		if ( attributes.isPreview ) {
			return gridBlockPreview;
		}

		/**
		 * Todo classes
		 *
		 * wp-block-{$this->block_name},
		 * wc-block-{$this->block_name},
		 */
		return (
			<useInnerBlockLayoutContextProvider
				parentName="woocommerce/all-products"
				layoutStyleClassPrefix="wc-block-grid"
			>
				<ProductListContainer
					attributes={ attributes }
					urlParameterSuffix={ urlParameterSuffix }
				/>
			</useInnerBlockLayoutContextProvider>
		);
	}
}

export default Block;
