/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import Gridicon from 'gridicons';

/**
 * Internal dependencies
 */
import { ProductListSummary } from '@woocommerce/atomic-components/product-list';
import sharedConfig from '../shared-config';

const blockConfig = {
	title: __( 'Product Summary', 'woo-gutenberg-products-block' ),
	description: __(
		'Display the short description of a product.',
		'woo-gutenberg-products-block'
	),
	icon: {
		src: <Gridicon icon="aside" />,
		foreground: '#96588a',
	},
	edit( props ) {
		const { attributes } = props;

		return <ProductListSummary product={ attributes.product } />;
	},
};

registerBlockType( 'woocommerce/product-list-summary', {
	...sharedConfig,
	...blockConfig,
} );
