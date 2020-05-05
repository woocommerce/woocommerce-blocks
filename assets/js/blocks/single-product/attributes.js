/**
 * Internal dependencies
 */
import { DEFAULT_PRODUCT_LAYOUT } from './constants';

export const defaults = {
	layoutConfig: DEFAULT_PRODUCT_LAYOUT,
	isPreview: false,
};
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
