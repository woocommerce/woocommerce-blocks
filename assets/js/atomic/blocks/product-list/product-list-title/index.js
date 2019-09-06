/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { Disabled } from '@wordpress/components';
import Gridicon from 'gridicons';

/**
 * Internal dependencies
 */
import { ProductListTitle } from '../../../components/product-list';
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
	icon: {
		src: <Gridicon icon="heading-h1" />,
		foreground: '#96588a',
	},
	edit( props ) {
		const { className, attributes } = props;

		return (
			<Disabled>
				<ProductListTitle className={ className } product={ attributes.product } />
			</Disabled>
		);
	},
};

registerBlockType( 'woocommerce/product-list-title', {
	...sharedConfig,
	...blockConfig,
} );
