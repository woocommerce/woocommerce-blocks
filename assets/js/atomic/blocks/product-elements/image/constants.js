/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { image, Icon } from '@woocommerce/icons';

export const BLOCK_TITLE = __(
	'Product Image',
	'woo-gutenberg-products-block'
);
export const BLOCK_ICON = <Icon srcElement={ image } />;
export const BLOCK_DESCRIPTION = __(
	'Display the main product image',
	'woo-gutenberg-products-block'
);
