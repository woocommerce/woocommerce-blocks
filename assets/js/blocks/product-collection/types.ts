/**
 * External dependencies
 */
import type { BlockEditProps } from '@wordpress/blocks';
import { type AttributeMetadata } from '@woocommerce/types';

export interface ProductCollectionAttributes {
	query: ProductCollectionQuery;
	queryId: number;
	queryContext: [
		{
			page: number;
		}
	];
	templateSlug: string;
	displayLayout: ProductCollectionDisplayLayout;
	tagName: string;
	convertedFromProducts: boolean;
	collection?: string;
}

export enum LayoutOptions {
	GRID = 'flex',
	STACK = 'list',
}

export interface ProductCollectionDisplayLayout {
	type: LayoutOptions;
	columns: number;
	shrinkColumns?: boolean;
}

export interface ProductCollectionQuery {
	exclude: string[];
	inherit: boolean | null;
	offset: number;
	order: TProductCollectionOrder;
	orderBy: TProductCollectionOrderBy;
	pages: number;
	perPage: number;
	postType: string;
	search: string;
	taxQuery: Record< string, number[] >;
	woocommerceOnSale: boolean;
	/**
	 * Filter products by their stock status.
	 *
	 * Will generate the following `meta_query`:
	 *
	 * ```
	 * array(
	 *   'key'     => '_stock_status',
	 *   'value'   => (array) $stock_statuses,
	 *   'compare' => 'IN',
	 * ),
	 * ```
	 */
	woocommerceStockStatus?: string[];
	woocommerceAttributes?: AttributeMetadata[];
	isProductCollectionBlock?: boolean;
	woocommerceHandPickedProducts?: string[];
}

export type ProductCollectionEditComponentProps =
	BlockEditProps< ProductCollectionAttributes > & {
		openPatternSelectionModal: () => void;
	};

export type TProductCollectionOrder = 'asc' | 'desc';
export type TProductCollectionOrderBy =
	| 'date'
	| 'title'
	| 'popularity'
	| 'rating';

export type DisplayLayoutControlProps = {
	displayLayout: ProductCollectionDisplayLayout;
	setAttributes: ( attrs: Partial< ProductCollectionAttributes > ) => void;
};
export type QueryControlProps = {
	query: ProductCollectionQuery;
	setQueryAttribute: ( attrs: Partial< ProductCollectionQuery > ) => void;
};
