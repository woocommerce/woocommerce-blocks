# Sample Product Collection attributes object with field descriptions

## Current query attributes

| Field                         | Type                                                  | Default  | Description                                                                                                                                  |
| ----------------------------- | ----------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| perPage                       | Number                                                | 9        | Number of products per page                                                                                                                  |
| pages                         | Number                                                | 0        | Total number of pages Product Collection should allow to browse                                                                              |
| offset                        | Number                                                | 0        | Offset of products when starting pagination                                                                                                  |
| postType                      | 'product' or 'post'                                   | 'product'| The type of posts to fetch. It's 'product' by default and it's very unlikely to change that                                                  |
| isProductCollectionBlock      | Boolean                                               | true     | Specifies that the query is from Product Collection block. There's no case in which it should be changed                                     |
| inherit                       | Boolean                                               | true     | Define it the query should inherit from template query or not. If yes, all the other filters are ignored                                     |
| order                         | 'asc' or 'desc'                                       | asc'     | Determines if the order is ascending or descending                                                                                           |
| orderBy                       | 'title' or 'date' or 'popularity' or 'rating'         | title'   | Allows to choose the ordering from presets                                                                                                   |
| author                        | String                                                | -        | To be removed. Filter products by the author of the product (post)                                                                           |
| search                        | String                                                | -        | Filter the products by keyword                                                                                                              |
| exclude                       | ProductID[]                                           | []       | Specified products won't be displayed as results even if they match other filters. There's no UI representation of this filter at the moment |
| woocommerceHandPickedProducts | ProductID[]                                           | []       | Array of products. The whole filtering will be applied only to this set of products                                                          |
| woocommerceOnSale             | Boolean                                               | false    | If true, display only products on sale                                                                                                       |
| woocommerceStockStatus        | StockStatus[]                                         | []       | Display products from specific stock statuses                                                                                                |
| woocommerceAttributes         | [ { termId: TermID, taxonomy: Taxonomy } ]            | []       | Display products with specific attributes                                                                                                    |
| taxQuery                      | { product_cat: CategoriesId[], product_tag: TagID[] } | {}       | Filter products from specific categories and/or tags                                                                                         |
| parents                       | Array                                                 | []       | ???                                                                                                                                          |
| sticky                        | '' ir 'only' or String                                | ''       | ???                                                                                                                                          |

## Example attributes shape

```javascript
const exampleAttributes = {
	queryId: 0,
	tagName: 'div',
	displayLayout: { type: 'flex', columns: 2 },
	query: {
		perPage: 9,
		pages: 0,
		offset: 0,
		postType: 'product',
		order: 'asc',
		orderBy: 'title',
		author: '',
		search: 'hoodie',
		exclude: [],
		sticky: '',
		inherit: false,
		taxQuery: { product_cat:[5], product_tag: [39] },
		parents: [],
		isProductCollectionBlock: true,
		woocommerceOnSale: false,
		woocommerceStockStatus: [ 'instock', 'outofstock', 'onbackorder' ],
		woocommerceAttributes: [
			{ termId: 47, taxonomy: 'pa_color' },
			{ termId: 11, taxonomy: 'pa_color' },
			{ termId: 18, taxonomy: 'pa_color' },
			{ termId: 12, taxonomy: 'pa_color' },
			{ termId: 13, taxonomy: 'pa_color' },
			{ termId: 19, taxonomy: 'pa_color' },
		],
		woocommerceHandPickedProducts: [ '1240', '1239' ],
	},
};
```
