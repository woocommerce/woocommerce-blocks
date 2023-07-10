/**
 * External dependencies
 */
import { getSetting } from '@woocommerce/settings';
import { objectOmit } from '@woocommerce/utils';

/**
 * Internal dependencies
 */
import {
	ProductCollectionAttributes,
	TProductCollectionOrder,
	TProductCollectionOrderBy,
	ProductCollectionQuery,
	ProductCollectionDisplayLayout,
	DisplayLayoutObject,
	QueryObject,
} from './types';

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
): QueryObject => ( {
	query: {
		...currentQuery,
		orderBy: DEFAULT_QUERY.orderBy as TProductCollectionOrderBy,
		order: DEFAULT_QUERY.order as TProductCollectionOrder,
		inherit: DEFAULT_QUERY.inherit,
	},
} );

export const getDefaultDisplayLayout = (): DisplayLayoutObject => ( {
	displayLayout:
		DEFAULT_ATTRIBUTES.displayLayout as ProductCollectionDisplayLayout,
} );

export const getDefaultSettings = (
	currentAttributes: ProductCollectionAttributes
): Partial< ProductCollectionAttributes > => ( {
	...getDefaultDisplayLayout(),
	...getDefaultQuery( currentAttributes.query ),
} );

export const DEFAULT_FILTERS: Partial< ProductCollectionQuery > = {
	woocommerceOnSale: DEFAULT_QUERY.woocommerceOnSale,
	woocommerceStockStatus: getDefaultStockStatuses(),
	woocommerceAttributes: [],
	taxQuery: DEFAULT_QUERY.taxQuery,
	woocommerceHandPickedProducts: [],
};
