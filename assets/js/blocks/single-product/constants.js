/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon, reader } from '@woocommerce/icons';

export const BLOCK_TITLE = __(
	'Single Product',
	'woo-gutenberg-products-block'
);
export const BLOCK_ICON = <Icon srcElement={ reader } />;
export const BLOCK_DESCRIPTION = __(
	'Display a single product.',
	'woo-gutenberg-products-block'
);
/**
 * The default layout built from the default template.
 */
export const DEFAULT_PRODUCT_LAYOUT = [
	[ 'woocommerce/product-title' ],
	[ 'woocommerce/product-price' ],
];
