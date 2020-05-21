/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import sharedConfig from '../shared-config';
import edit from './edit';

const blockConfig = {
	title: __( 'Product Title', 'woo-gutenberg-products-block' ),
	description: __(
		'Display the name of a product.',
		'woo-gutenberg-products-block'
	),
	icon: {
		src: 'heading',
		foreground: '#96588a',
	},
	attributes: {
		headingLevel: {
			type: 'number',
			default: 2,
		},
		productLink: {
			type: 'boolean',
			default: true,
		},
	},
	edit,
};

registerBlockType( 'woocommerce/product-title', {
	...sharedConfig,
	...blockConfig,
} );
