/**
 * External dependencies
 */
import { getSetting } from '@woocommerce/settings';
import { objectOmit } from '@woocommerce/utils';
import { type InnerBlockTemplate } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import {
	ProductCollectionAttributes,
	TProductCollectionOrder,
	TProductCollectionOrderBy,
	ProductCollectionQuery,
	ProductCollectionDisplayLayout,
} from './types';
import { ImageSizing } from '../../atomic/blocks/product-elements/image/types';
import { VARIATION_NAME as PRODUCT_TITLE_ID } from './variations/elements/product-title';

export const STOCK_STATUS_OPTIONS = getSetting< Record< string, string > >(
	'stockStatusOptions',
	[]
);

const GLOBAL_HIDE_OUT_OF_STOCK = getSetting< boolean >(
	'hideOutOfStockItems',
	false
);

export const getDefaultStockStatuses = () => {
	return GLOBAL_HIDE_OUT_OF_STOCK
		? Object.keys( objectOmit( STOCK_STATUS_OPTIONS, 'outofstock' ) )
		: Object.keys( STOCK_STATUS_OPTIONS );
};

export const DEFAULT_QUERY: ProductCollectionQuery = {
	perPage: 9,
	pages: 0,
	offset: 0,
	postType: 'product',
	order: 'asc',
	orderBy: 'title',
	author: '',
	search: '',
	exclude: [],
	sticky: '',
	inherit: null,
	taxQuery: {},
	parents: [],
	isProductCollectionBlock: true,
	woocommerceOnSale: false,
	woocommerceStockStatus: getDefaultStockStatuses(),
	woocommerceAttributes: [],
	woocommerceHandPickedProducts: [],
};

export const DEFAULT_ATTRIBUTES: Partial< ProductCollectionAttributes > = {
	query: DEFAULT_QUERY,
	tagName: 'div',
	displayLayout: {
		type: 'flex',
		columns: 3,
	},
};

export const getDefaultQuery = (
	currentQuery: ProductCollectionQuery
): ProductCollectionQuery => ( {
	...currentQuery,
	orderBy: DEFAULT_QUERY.orderBy as TProductCollectionOrderBy,
	order: DEFAULT_QUERY.order as TProductCollectionOrder,
	inherit: DEFAULT_QUERY.inherit,
} );

export const getDefaultDisplayLayout = () =>
	DEFAULT_ATTRIBUTES.displayLayout as ProductCollectionDisplayLayout;

export const getDefaultSettings = (
	currentAttributes: ProductCollectionAttributes
): Partial< ProductCollectionAttributes > => ( {
	displayLayout: getDefaultDisplayLayout(),
	query: getDefaultQuery( currentAttributes.query ),
} );

export const DEFAULT_FILTERS: Partial< ProductCollectionQuery > = {
	woocommerceOnSale: DEFAULT_QUERY.woocommerceOnSale,
	woocommerceStockStatus: getDefaultStockStatuses(),
	woocommerceAttributes: [],
	taxQuery: DEFAULT_QUERY.taxQuery,
	woocommerceHandPickedProducts: [],
};

export const INNER_BLOCKS_TEMPLATE: InnerBlockTemplate[] = [
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
				},
			],
		],
	],
	[
		'core/query-pagination',
		{
			layout: {
				type: 'flex',
				justifyContent: 'center',
			},
		},
	],
	[ 'core/query-no-results' ],
];
