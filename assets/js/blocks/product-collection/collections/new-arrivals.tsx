/**
 * External dependencies
 */
import { InnerBlockTemplate } from '@wordpress/blocks';
import { Icon } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { ImageSizing } from '../../../atomic/blocks/product-elements/image/types';
import { VARIATION_NAME as PRODUCT_TITLE_ID } from '../variations/elements/product-title';
import { DEFAULT_ATTRIBUTES } from '../constants';

const collection = {
	name: 'woocommerce-blocks/product-collection/new-arrivals',
	title: 'New Arrivals',
	icon: <Icon icon={ 'star-filled' } />,
	description: 'Display a grid of your newest products.',
};

const attributes = {
	...DEFAULT_ATTRIBUTES,
	displayLayout: {
		type: 'flex',
		columns: 5,
	},
	query: {
		...DEFAULT_ATTRIBUTES.query,
		inherit: false,
		orderBy: 'date',
		order: 'desc',
		perPage: 10,
		pages: 1,
	},
	collection: 'woocommerce-blocks/product-collection/new-arrivals',
};

const innerBlocks: InnerBlockTemplate[] = [
	[
		'woocommerce/product-template',
		{},
		[
			[
				'woocommerce/product-image',
				{
					imageSizing: ImageSizing.THUMBNAIL,
				},
			],
			[
				'core/post-title',
				{
					textAlign: 'center',
					level: 3,
					fontSize: 'medium',
					style: {
						spacing: {
							margin: {
								bottom: '0.75rem',
								top: '0',
							},
						},
					},
					isLink: true,
					__woocommerceNamespace: PRODUCT_TITLE_ID,
				},
			],
			[
				'woocommerce/product-price',
				{
					textAlign: 'center',
					fontSize: 'small',
				},
			],
			[
				'woocommerce/product-button',
				{
					textAlign: 'center',
					fontSize: 'small',
					width: 75,
				},
			],
		],
	],
];

export default {
	...collection,
	attributes,
	innerBlocks,
};
