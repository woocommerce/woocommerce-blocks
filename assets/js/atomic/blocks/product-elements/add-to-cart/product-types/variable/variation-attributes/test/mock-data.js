export const rawAttributeData = [
	{
		id: 1,
		name: 'Color',
		taxonomy: 'pa_color',
		has_variations: true,
		terms: [
			{
				id: 22,
				name: 'Blue',
				slug: 'blue',
			},
			{
				id: 23,
				name: 'Green',
				slug: 'green',
			},
			{
				id: 24,
				name: 'Red',
				slug: 'red',
			},
		],
	},
	{
		id: 0,
		name: 'Logo',
		taxonomy: null,
		has_variations: true,
		terms: [
			{
				id: 0,
				name: 'Yes',
				slug: 'Yes',
			},
			{
				id: 0,
				name: 'No',
				slug: 'No',
			},
		],
	},
	{
		id: 0,
		name: 'Non-variable attribute',
		taxonomy: null,
		has_variations: false,
		terms: [
			{
				id: 0,
				name: 'Test',
				slug: 'Test',
			},
			{
				id: 0,
				name: 'Test 2',
				slug: 'Test 2',
			},
		],
	},
];

export const rawVariations = [
	{
		id: 35,
		attributes: [
			{
				name: 'Color',
				value: 'blue',
			},
			{
				name: 'Logo',
				value: 'Yes',
			},
		],
	},
	{
		id: 28,
		attributes: [
			{
				name: 'Color',
				value: 'red',
			},
			{
				name: 'Logo',
				value: 'No',
			},
		],
	},
	{
		id: 29,
		attributes: [
			{
				name: 'Color',
				value: 'green',
			},
			{
				name: 'Logo',
				value: 'No',
			},
		],
	},
	{
		id: 30,
		attributes: [
			{
				name: 'Color',
				value: 'blue',
			},
			{
				name: 'Logo',
				value: 'No',
			},
		],
	},
];
