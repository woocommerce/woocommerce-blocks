/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { image, Icon } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';

import { supports } from './supports';
import { attributes } from './attributes';
import sharedConfig from '../shared/config';

const blockConfig = {
	name: 'woocommerce/product-image',
	title: __( 'Product Image', 'woo-gutenberg-products-block' ),
	icon: {
		src: (
			<Icon
				icon={ image }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	keywords: [ 'WooCommerce' ],
	description: __(
		'Display the main product image.',
		'woo-gutenberg-products-block'
	),
	supports,
	attributes,
	usesContext: [ 'query', 'queryId', 'postId' ],
	textdomain: 'woo-gutenberg-products-block',
	apiVersion: 2,
	$schema: 'https://schemas.wp.org/trunk/block.json',
	edit,
};

registerBlockType( 'woocommerce/product-image', {
	...sharedConfig,
	...blockConfig,
} );
