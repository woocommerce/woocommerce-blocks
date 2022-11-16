export const blockAttributes: Record< string, Record< string, unknown > > = {
	showProductLink: {
		type: 'boolean',
		default: true,
	},
	showSaleBadge: {
		type: 'boolean',
		default: true,
	},
	saleBadgeAlign: {
		type: 'string',
		default: 'right',
	},
	imageSizing: {
		type: 'string',
		default: 'full-size',
	},
	productId: {
		type: 'number',
		default: 0,
	},
	isDescendentOfQueryLoop: {
		type: 'boolean',
		default: false,
	},
};

export default blockAttributes;
