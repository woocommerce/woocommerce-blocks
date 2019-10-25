/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import Gridicon from 'gridicons';

/**
 * Internal dependencies
 */
import { ProductListRating } from '@woocommerce/atomic-components/product-list';
import sharedConfig from '../shared-config';

const blockConfig = {
	title: __( 'Product Rating', 'woo-gutenberg-products-block' ),
	description: __(
		'Display the average rating of a product.',
		'woo-gutenberg-products-block'
	),
	icon: {
		src: <Gridicon icon="star-outline" />,
		foreground: '#96588a',
	},
	edit( props ) {
		const { attributes } = props;

		return <ProductListRating product={ attributes.product } />;
	},
};

registerBlockType( 'woocommerce/product-list-rating', {
	...sharedConfig,
	...blockConfig,
} );
