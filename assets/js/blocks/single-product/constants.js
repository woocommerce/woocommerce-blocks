/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon, reader } from '@woocommerce/icons';

export const BLOCK_NAME = 'woocommerce/single-product';
export const BLOCK_TITLE = __(
	'Single Product',
	'woo-gutenberg-products-block'
);
export const BLOCK_ICON = <Icon srcElement={ reader } />;
export const BLOCK_DESCRIPTION = __(
	'Display a single product.',
	'woo-gutenberg-products-block'
);

export const DEFAULT_PRODUCT_LAYOUT = [
	[
		'core/columns',
		{},
		[
			[
				'core/column',
				{},
				[ [ 'woocommerce/product-image', { showSaleBadge: false } ] ],
			],
			[
				'core/column',
				{},
				[
					[ 'woocommerce/product-sale-badge' ],
					[ 'woocommerce/product-title' ],
					[ 'woocommerce/product-rating' ],
					[ 'woocommerce/product-price' ],
					[ 'woocommerce/product-summary' ],
					[ 'woocommerce/product-button' ],
				],
			],
		],
	],
];
