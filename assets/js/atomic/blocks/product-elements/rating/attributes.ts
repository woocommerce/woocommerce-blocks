export const blockAttributes: Record< string, Record< string, unknown > > = {
	productId: {
		type: 'number',
		default: 0,
	},
	isDescendentOfQueryLoop: {
		type: 'boolean',
		default: false,
	},
	textAlign: {
		type: 'string',
		default: '',
	},
};

export default blockAttributes;
