/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import ProductPrice from '../../../base/components/product-grid/product-grid-price';
import sharedConfig from '../shared-config';

/**
 * Register and run the "All Products" block.
 */
const blockConfig = {
	title: __( 'Product Price', 'woo-gutenberg-products-block' ),
	description: __(
		'Shows the price of a product within a product grid.',
		'woo-gutenberg-products-block'
	),
	edit( props ) {
		const { className, attributes } = props;

		return <ProductPrice className={ className } product={ attributes.product } />;
	},
};

registerBlockType( 'woocommerce/product-grid-price', {
	...sharedConfig,
	...blockConfig,
} );
