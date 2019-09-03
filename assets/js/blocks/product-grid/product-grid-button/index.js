/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import ProductButton from '../../../base/components/product-grid/product-grid-button';
import sharedConfig from '../shared-config';

/**
 * Register and run the "All Products" block.
 */
const blockConfig = {
	title: __( 'Product Button', 'woo-gutenberg-products-block' ),
	description: __(
		'Shows the read more/add to cart button for a product within a product grid.',
		'woo-gutenberg-products-block'
	),
	edit( props ) {
		const { className, attributes } = props;

		return <ProductButton className={ className } product={ attributes.product } />;
	},
};

registerBlockType( 'woocommerce/product-grid-button', {
	...sharedConfig,
	...blockConfig,
} );
