/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { Fragment } from 'react';
import { Disabled } from '@wordpress/components';
import Gridicon from 'gridicons';

/**
 * Internal dependencies
 */
import { ProductListSummary } from '../../../components/product-list';
import sharedConfig from '../shared-config';

/**
 * Register and run the "All Products" block.
 */
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

		return (
			<Fragment>
				<Disabled>
					<ProductListSummary product={ attributes.product } />
				</Disabled>
			</Fragment>
		);
	},
};

registerBlockType( 'woocommerce/product-list-summary', {
	...sharedConfig,
	...blockConfig,
} );
