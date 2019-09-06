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
	icon: {
		src: <Gridicon icon="image" />,
		foreground: '#96588a',
	},
	edit( props ) {
		const { className, attributes } = props;

		return (
			<Disabled>
				<ProductListImage className={ className } product={ attributes.product } showSaleBadge={ true } />
			</Disabled>
		);
	},
};

registerBlockType( 'woocommerce/product-list-image', {
	...sharedConfig,
	...blockConfig,
} );
