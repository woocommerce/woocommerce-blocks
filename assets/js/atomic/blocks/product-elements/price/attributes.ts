/**
 * External dependencies
 */

interface BlockAttributes {
	productId: {
		type: string;
		default: number;
	};
	isDescendentOfQueryLoop: {
		type: string;
		default: boolean;
	};
	textAlign?: {
		type: string;
	};
}

export const blockAttributes: BlockAttributes = {
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
	},
};

export default blockAttributes;
