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
						'woocommerce/product-title',
						{ headingLevel: 2, renderOnServerSide: true },
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
						'woocommerce/product-summary',
						{ renderOnServerSide: true },
					],
					[
						'woocommerce/product-stock-indicator',
						{ renderOnServerSide: true },
					],
					[
						'woocommerce/product-add-to-cart',
						{ showFormElements: true, renderOnServerSide: true },
					],
					[ 'woocommerce/product-sku', { renderOnServerSide: true } ],
					[
						'woocommerce/product-category-list',
						{ renderOnServerSide: true },
					],
					[
						'woocommerce/product-tag-list',
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
