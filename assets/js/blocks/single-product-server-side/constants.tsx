/**
 * External dependencies
 */
import { Icon, mediaAndText } from '@wordpress/icons';
import { getBlockMap } from '@woocommerce/atomic-utils';
import type { InnerBlockTemplate } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import { VARIATION_NAME as PRODUCT_TITLE_VARIATION_NAME } from '../product-query/variations/elements/product-title';
import { VARIATION_NAME as PRODUCT_SUMMARY_VARIATION_NAME } from '../product-query/variations/elements/product-summary';

export const BLOCK_ICON = (
	<Icon
		icon={ mediaAndText }
		className="wc-block-editor-components-block-icon"
	/>
);

export const DEFAULT_INNER_BLOCKS: InnerBlockTemplate[] = [
	[
		'core/columns',
		{},
		[
			[
				'core/column',
				{},
				[
					[
						'woocommerce/product-image',
						{ showSaleBadge: false, renderOnServerSide: true },
					],
				],
			],
			[
				'core/column',
				{},
				[
					[
						'woocommerce/product-sale-badge',
						{ renderOnServerSide: true },
					],
					[
						'core/post-title',
						{
							headingLevel: 2,
							renderOnServerSide: true,
							__woocommerceNamespace:
								PRODUCT_TITLE_VARIATION_NAME,
						},
					],
					[
						'woocommerce/product-rating',
						{ renderOnServerSide: true },
					],
					[
						'woocommerce/product-price',
						{ renderOnServerSide: true },
					],
					[
						'core/post-excerpt',
						{
							renderOnServerSide: true,
							__woocommerceNamespace:
								PRODUCT_SUMMARY_VARIATION_NAME,
						},
					],
					[
						'woocommerce/product-stock-indicator',
						{ renderOnServerSide: true },
					],
					[
						'woocommerce/add-to-cart-form',
						{
							showFormElements: true,
						},
					],
					[
						'woocommerce/product-meta',
						{ renderOnServerSide: true },
					],
				],
			],
		],
	],
];

export const ALLOWED_INNER_BLOCKS = [
	'core/columns',
	'core/column',
	...Object.keys( getBlockMap( metadata.name ) ),
];
