/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import ProductRating from '../../../base/components/product-grid/product-grid-rating';
import sharedConfig from '../shared-config';

/**
 * Register and run the "All Products" block.
 */
const blockConfig = {
	title: __( 'Product Rating', 'woo-gutenberg-products-block' ),
	description: __(
		'Shows the rating of a product within a product grid.',
		'woo-gutenberg-products-block'
	),
	edit( props ) {
		const { className, attributes } = props;

		return <ProductRating className={ className } product={ attributes.product } />;
	},
};

registerBlockType( 'woocommerce/product-grid-rating', {
	...sharedConfig,
	...blockConfig,
} );
