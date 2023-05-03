export interface Attributes {
	queryId: number;
	query: {
		perPage: null | number;
		pages: number;
		offset: number;
		postType: string;
		order: string;
		orderBy: string;
		author: string;
		search: string;
		sticky: string;
		inherit: boolean;
		taxQuery: null | object;
	};
}
