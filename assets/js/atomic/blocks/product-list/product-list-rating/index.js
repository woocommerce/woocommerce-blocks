/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { ProductListRating } from '../../../components/product-list';
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

		return <ProductListRating className={ className } product={ attributes.product } />;
	},
};

registerBlockType( 'woocommerce/product-list-rating', {
	...sharedConfig,
	...blockConfig,
} );
