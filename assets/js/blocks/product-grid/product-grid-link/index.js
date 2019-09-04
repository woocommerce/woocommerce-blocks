/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
} from '@wordpress/editor';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import ProductLink from '../../../base/components/product-grid/product-grid-link';
import sharedConfig from '../shared-config';

/**
 * Register and run the "All Products" block.
 */
const blockConfig = {
	title: __( 'Product Link', 'woo-gutenberg-products-block' ),
	description: __(
		'Links to the product page. Can contain other blocks.',
		'woo-gutenberg-products-block'
	),
	edit( props ) {
		const { className, attributes } = props;

		const BLOCKS_TEMPLATE = [
			[ 'woocommerce/product-grid-image', {} ],
			[ 'woocommerce/product-grid-title', {} ],
		];

		return (
			<ProductLink className={ className } product={ attributes.product }>
				<InnerBlocks
					template={ BLOCKS_TEMPLATE }
					templateLock={ false }
					renderAppender={ false }
				/>
			</ProductLink>
		);
	},
};

registerBlockType( 'woocommerce/product-grid-link', {
	...sharedConfig,
	...blockConfig,
} );
