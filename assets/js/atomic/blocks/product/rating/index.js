/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import Gridicon from 'gridicons';
import { ProductRating } from '@woocommerce/atomic-components/product';

/**
 * Internal dependencies
 */
import sharedConfig from '../shared-config';

const blockConfig = {
	title: __( 'Average Rating', 'woo-gutenberg-products-block' ),
	description: __(
		'Display the average rating of a product.',
		'woo-gutenberg-products-block'
	),
	icon: {
		src: <Gridicon icon="star-outline" />,
		foreground: '#96588a',
	},

	/**
	 * Renders the edit view for a block.
	 *
	 * @param {Object} props Props to pass to block.
	 */
	edit( props ) {
		const { attributes } = props;

		return <ProductRating product={ attributes.product } />;
	},
};

registerBlockType( 'woocommerce/product-rating', {
	...sharedConfig,
	...blockConfig,
} );
