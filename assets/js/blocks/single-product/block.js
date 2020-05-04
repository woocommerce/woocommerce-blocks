/**
 * External dependencies
 */
import { Component } from 'react';
import PropTypes from 'prop-types';
import {
	InnerBlockConfigurationProvider,
	ProductLayoutContextProvider,
} from '@woocommerce/base-context';

const layoutContextConfig = {
	layoutStyleClassPrefix: 'wc-block-single-product',
};

const parentBlockConfig = { parentName: 'woocommerce/single-product' };

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
			return null;
		}

		/**
		 * Todo classes
		 *
		 * wp-block-{$this->block_name},
		 * wc-block-{$this->block_name},
		 */
		return (
			<InnerBlockConfigurationProvider value={ parentBlockConfig }>
				<ProductLayoutContextProvider value={ layoutContextConfig }>
					TODO
				</ProductLayoutContextProvider>
			</InnerBlockConfigurationProvider>
		);
	}
}

export default Block;
