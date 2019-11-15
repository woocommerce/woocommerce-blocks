/**
 * External dependencies
 */
import { Component } from 'react';
import PropTypes from 'prop-types';
import ProductListContainer from '@woocommerce/base-components/product-list/container';
import { InnerBlockConfigurationProvider } from '@woocommerce/base-context/inner-block-configuration-context';
import { ProductLayoutContextProvider } from '@woocommerce/base-context/product-layout-context';
import BlockErrorBoundary from '@woocommerce/base-components/block-error-boundary';

const layoutContextConfig = {
	layoutStyleClassPrefix: 'wc-block-grid',
};

const parentBlockConfig = { parentName: 'woocommerce/all-products' };

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
			<BlockErrorBoundary>
				<InnerBlockConfigurationProvider value={ parentBlockConfig }>
					<ProductLayoutContextProvider value={ layoutContextConfig }>
						<ProductListContainer
							attributes={ attributes }
							urlParameterSuffix={ urlParameterSuffix }
						/>
					</ProductLayoutContextProvider>
				</InnerBlockConfigurationProvider>
			</BlockErrorBoundary>
		);
	}
}

export default Block;
