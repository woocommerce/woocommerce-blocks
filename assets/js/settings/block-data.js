/**
 * Wrapper for the wc_product_block_data global, which sets defaults if data is missing.
 */
const data = wc_product_block_data || { /* eslint-disable-line */
	min_columns: 1,
	max_columns: 6,
	default_columns: 3,
	min_rows: 1,
	max_rows: 6,
	default_rows: 1,
	thumbnail_size: 300,
	placeholderImgSrc: '',
	min_height: 500,
	default_height: 500,
	isLargeCatalog: false,
	limitTags: false,
	hasTags: true,
	productCategories: [],
	homeUrl: '',
	productCount: 1,
};

export default data;
