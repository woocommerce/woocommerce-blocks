/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { ProductListImage } from '../../../components/product-list';
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

		return <ProductListImage className={ className } product={ attributes.product } />;
	},
};

registerBlockType( 'woocommerce/product-list-image', {
	...sharedConfig,
	...blockConfig,
} );
