export interface Attributes {
	queryId: number;
	query: ProductsCollectionQuery;
}

export interface ProductsCollectionQuery {
	author: string;
	exclude: string[];
	inherit: boolean;
	offset: number;
	order: 'asc' | 'desc';
	orderBy: 'date' | 'relevance' | 'title';
	pages: number;
	parents: number[];
	perPage: number;
	postType: string;
	search: string;
	sticky: string;
	taxQuery: string;
}

export interface ProductsCollectionContext {
	query: ProductsCollectionQuery;
	queryId: number;
	queryContext: [
		{
			page: number;
		}
	];
	templateSlug: string;
	displayLayout: {
		type: string;
		columns: number;
	};
}
