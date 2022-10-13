interface SetWindowUrlParams {
	url: string;
}

export const setWindowUrl = ( { url }: SetWindowUrlParams ) => {
	global.window = Object.create( window );
	Object.defineProperty( window, 'location', {
		value: {
			href: url,
		},
		writable: true,
	} );
};

export const stubProductsAttributesTerms = () => [
	{
		id: 25,
		name: 'Large',
		slug: 'large',
		description: '',
		parent: 0,
		count: 1,
	},
	{
		id: 26,
		name: 'Medium',
		slug: 'medium',
		description: '',
		parent: 0,
		count: 1,
	},
	{
		id: 27,
		name: 'Small',
		slug: 'small',
		description: '',
		parent: 0,
		count: 1,
	},
];

export const stubCollectionData = () => ( {
	price_range: null,
	attribute_counts: [
		{
			term: 25,
			count: 1,
		},
		{
			term: 26,
			count: 1,
		},
		{
			term: 27,
			count: 1,
		},
	],
	rating_counts: null,
	stock_status_counts: null,
} );
