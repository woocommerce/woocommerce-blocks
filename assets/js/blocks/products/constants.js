/**
 * External dependencies
 */
import { getBlockMapKeys } from '@woocommerce/atomic-utils';

/**
 * The default layout built from the default template.
 */
export const DEFAULT_INNER_BLOCKS = [
	[ 'woocommerce/product-image' ],
	[ 'woocommerce/product-title' ],
	[ 'woocommerce/product-price' ],
	[ 'woocommerce/product-rating' ],
	[ 'woocommerce/product-button' ],
];

export const ALLOWED_INNER_BLOCKS = [
	...getBlockMapKeys( 'woocommerce/all-products' ),
];
