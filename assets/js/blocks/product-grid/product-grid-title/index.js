/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import ProductTitle from '../../../base/components/product-grid/product-grid-title';
import sharedConfig from '../shared-config';

/**
 * Register and run the "All Products" block.
 */
const blockConfig = {
	title: __( 'Product Title', 'woo-gutenberg-products-block' ),
	description: __(
		'Shows the title of a product within a product grid.',
		'woo-gutenberg-products-block'
	),
	edit( props ) {
		const { className, attributes } = props;

		return <ProductTitle className={ className } product={ attributes.product } />;
	},
};

registerBlockType( 'woocommerce/product-grid-title', {
	...sharedConfig,
	...blockConfig,
} );
