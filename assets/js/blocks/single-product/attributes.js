/**
 * Internal dependencies
 */
import { DEFAULT_PRODUCT_LAYOUT } from './constants';

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
		default: DEFAULT_PRODUCT_LAYOUT,
	},
};

export default blockAttributes;
