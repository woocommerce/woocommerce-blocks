/**
 * Internal dependencies
 */
export const blockAttributes = {
	isPreview: {
		type: 'boolean',
		default: false,
		save: false,
	},
	/**
	 * The product ID to display.
	 */
	productId: {
		type: 'number',
	},
	/**
	 * Layout config.
	 */
	layoutConfig: {
		type: 'array',
	},
};

export default blockAttributes;
