/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon, barcode } from '@woocommerce/icons';
import { registerExperimentalBlockType } from '@woocommerce/block-settings';

/**
 * Internal dependencies
 */
import sharedConfig from '../shared-config';
import edit from './edit';

const blockConfig = {
	title: __( 'Product SKU', 'woo-gutenberg-products-block' ),
	description: __(
		'Display the SKU of a product.',
		'woo-gutenberg-products-block'
	),
	icon: {
		src: <Icon srcElement={ barcode } />,
		foreground: '#96588a',
	},
	edit,
};

registerExperimentalBlockType( 'woocommerce/product-sku', {
	...sharedConfig,
	...blockConfig,
} );
