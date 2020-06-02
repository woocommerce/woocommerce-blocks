/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { Icon, tag } from '@woocommerce/icons';

/**
 * Internal dependencies
 */
import sharedConfig from '../shared-config';
import edit from './edit';

const blockConfig = {
	title: __( 'On-Sale Badge', 'woo-gutenberg-products-block' ),
	description: __(
		'Displays an on-sale badge if the product is on-sale.',
		'woo-gutenberg-products-block'
	),
	icon: {
		src: <Icon srcElement={ tag } />,
		foreground: '#96588a',
	},
	supports: {
		html: false,
	},
	edit,
};

registerBlockType( 'woocommerce/product-sale-badge', {
	...sharedConfig,
	...blockConfig,
} );
