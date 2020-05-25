const Coupons = () => [
	{
		code: 'coupon',
		discount_type: 'fixed_cart',
		amount: '5',
	},
	{
		code: 'oldcoupon',
		discount_type: 'fixed_cart',
		amount: '5',
		date_expires: '2020-01-01',
	},
	{
		code: 'below100',
		discount_type: 'percent',
		amount: '20',
		maximum_amount: '100.00',
	},
	{
		code: 'above50',
		discount_type: 'percent',
		amount: '20',
		minimum_amount: '50.00',
	},
	{
		code: 'a12s',
		discount_type: 'percent',
		amount: '100',
		individual_use: true,
		email_restrictions: '*@automattic.com%2C *@a8c.com',
	},
	{
		code: 'freeshipping',
		discount_type: 'percent',
		amount: '0',
		free_shipping: true,
	},
];

const Reviews = ( id ) => [
	{
		product_id: id,
		review: 'Looks fine',
		reviewer: 'John Doe',
		reviewer_email: 'john.doe@example.com',
		rating: 4,
	},
	{
		product_id: id,
		review: 'I love this album',
		reviewer: 'John Doe',
		reviewer_email: 'john.doe@example.com',
		rating: 5,
	},
	{
		product_id: id,
		review: 'a fine review',
		reviewer: "John Doe' niece",
		reviewer_email: 'john.doe@example.com',
		rating: 5,
	},
];

const Products = () => [
	{
		name: 'Woo Single #1',
		type: 'simple',
		regular_price: '21.99',
		virtual: true,
		downloadable: true,
		downloads: [
			{
				name: 'Woo Single',
				file:
					'http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/cd_4_angle.jpg',
			},
		],
		images: [
			{
				src:
					'http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/cd_4_angle.jpg',
			},
		],
	},
];

const Settings = () => [
	{
		id: 'woocommerce_store_address',
		value: '60 29th Street #343',
	},
	{
		id: 'woocommerce_store_city',
		value: 'San Francisco',
	},
	{
		id: 'woocommerce_store_country',
		value: 'US:CA',
	},
	{
		id: 'woocommerce_store_postcode',
		value: '94110',
	},
	{
		id: 'woocommerce_allowed_countries',
		value: 'specific',
	},
	{
		id: 'woocommerce_specific_allowed_countries',
		value: [ 'DZ', 'CA', 'NZ', 'ES', 'GB', 'US' ],
	},
	{
		id: 'woocommerce_ship_to_countries',
		value: 'specific',
	},
	{
		id: 'woocommerce_specific_ship_to_countries',
		value: [ 'DZ', 'CA', 'NZ', 'ES', 'GB', 'US' ],
	},
	{
		id: 'woocommerce_enable_coupons',
		value: 'yes',
	},
	{
		id: 'woocommerce_calc_taxes',
		value: 'yes',
	},
	{
		id: 'woocommerce_currency',
		value: 'USD',
	},
];

const Shipping = () => [
	{
		name: 'UK',
		locations: [
			{
				code: 'UK',
			},
		],
		methods: [
			{
				method_id: 'flat_rate',
				settings: {
					title: 'Normal Shipping',
					cost: '20.00',
				},
			},
			{
				method_id: 'free_shipping',
				settings: {
					title: 'Free Shipping',
					cost: '00.00',
					requires: 'coupon',
				},
			},
		],
	},
];

const Taxes = () => [
	{
		country: 'US',
		rate: '5.0000',
		name: 'State Tax',
		shipping: false,
		priority: 1,
	},
	{
		country: 'US',
		rate: '10.000',
		name: 'Sale Tax',
		shipping: false,
		priority: 2,
	},
	{
		country: 'UK',
		rate: '20.000',
		name: 'VAT',
		shipping: false,
	},
];

module.exports = {
	Coupons,
	Reviews,
	Products,
	Settings,
	Shipping,
	Taxes,
};
