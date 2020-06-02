/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { Icon, notes } from '@woocommerce/icons';

/**
 * Internal dependencies
 */
import sharedConfig from '../shared-config';
import edit from './edit';

const blockConfig = {
	title: __( 'Product Summary', 'woo-gutenberg-products-block' ),
	description: __(
		'Display a short description about a product.',
		'woo-gutenberg-products-block'
	),
	icon: {
		src: <Icon srcElement={ notes } />,
		foreground: '#96588a',
	},
	edit,
};

registerBlockType( 'woocommerce/product-summary', {
	...sharedConfig,
	...blockConfig,
} );
