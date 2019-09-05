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
import { ProductListLink } from '../../../components/product-list';
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
			[ 'woocommerce/product-list-image', {} ],
			[ 'woocommerce/product-list-title', {} ],
		];

		return (
			<ProductListLink className={ className } product={ attributes.product }>
				<InnerBlocks
					template={ BLOCKS_TEMPLATE }
					templateLock={ false }
					renderAppender={ false }
				/>
			</ProductListLink>
		);
	},
};

registerBlockType( 'woocommerce/product-list-link', {
	...sharedConfig,
	...blockConfig,
} );
