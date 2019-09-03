/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import ProductImage from '../../../base/components/product-grid/product-grid-image';
import sharedConfig from '../shared-config';

/**
 * Register and run the "All Products" block.
 */
const blockConfig = {
	title: __( 'Product Image', 'woo-gutenberg-products-block' ),
	description: __(
		'Shows the image of a product within a product grid.',
		'woo-gutenberg-products-block'
	),
	edit( props ) {
		const { className, attributes } = props;

		return <ProductImage className={ className } product={ attributes.product } />;
	},
};

registerBlockType( 'woocommerce/product-grid-image', {
	...sharedConfig,
	...blockConfig,
} );
