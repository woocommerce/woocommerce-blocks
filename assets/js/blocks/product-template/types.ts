export type Taxonomy = {
	slug: string;
	rest_base: string;
};

export type ProductTemplateQuery = {
	page: number;
	offset: number;
	order: 'asc' | 'desc';
	orderby: 'date' | 'relevance' | 'title';
	per_page: number;
	author: string | undefined;
	exclude: string[] | undefined;
	parent: number[] | undefined;
	search: string | undefined;
	sticky: boolean | undefined;
	categories: string | undefined;
};
