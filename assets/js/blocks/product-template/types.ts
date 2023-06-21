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

// WooCommerce does not export the types of Products returned from API
type ItemImage = {
	id: number;
	date_created: string;
	date_created_gmt: string;
	date_modified: string;
	date_modified_gmt: string;
	src: string;
	name: string;
	alt: string;
};

export type ProductItem = {
	id: number;
	name: string;
	slug: string;
	permalink: string;
	attributes: Array< {
		id: number;
		name: string;
		position: number;
		visible: boolean;
		variation: boolean;
		options: string[];
	} >;
	average_rating: string;
	backordered: boolean;
	backorders: string;
	backorders_allowed: boolean;
	button_text: string;
	catalog_visibility: string;
	categories: Array< {
		id: number;
		name: string;
		slug: string;
	} >;
	cross_sell_ids: number[];
	date_created: string;
	date_created_gmt: string;
	date_modified: string;
	date_modified_gmt: string;
	date_on_sale_from: null | string;
	date_on_sale_from_gmt: null | string;
	date_on_sale_to: null | string;
	date_on_sale_to_gmt: null | string;
	default_attributes: Array< {
		id: number;
		name: string;
		option: string;
	} >;
	description: string;
	dimensions: { length: string; width: string; height: string };
	download_expiry: number;
	download_limit: number;
	downloadable: boolean;
	downloads: Array< {
		id: number;
		name: string;
		file: string;
	} >;
	external_url: string;
	featured: boolean;
	grouped_products: Array< number >;
	has_options: boolean;
	images: Array< ItemImage >;
	low_stock_amount: null | number;
	manage_stock: boolean;
	menu_order: number;
	meta_data: Array< {
		id: number;
		key: string;
		value: string;
	} >;
	on_sale: boolean;
	parent_id: number;
	price: string;
	price_html: string;
	purchasable: boolean;
	purchase_note: string;
	rating_count: number;
	regular_price: string;
	related_ids: number[];
	reviews_allowed: boolean;
	sale_price: string;
	shipping_class: string;
	shipping_class_id: number;
	shipping_required: boolean;
	shipping_taxable: boolean;
	short_description: string;
	sku: string;
	sold_individually: boolean;
	status: string;
	stock_quantity: number;
	stock_status: string;
	tags: Array< {
		id: number;
		name: string;
		slug: string;
	} >;
	tax_class: string;
	tax_status: string;
	total_sales: number;
	type: string;
	upsell_ids: number[];
	variations: Array< {
		id: number;
		date_created: string;
		date_created_gmt: string;
		date_modified: string;
		date_modified_gmt: string;
		attributes: Array< {
			id: number;
			name: string;
			option: string;
		} >;
		image: string;
		price: string;
		regular_price: string;
		sale_price: string;
		sku: string;
		stock_quantity: number;
		tax_class: string;
		tax_status: string;
		total_sales: number;
		weight: string;
	} >;
	virtual: boolean;
	weight: string;
	last_order_date: string;
};
