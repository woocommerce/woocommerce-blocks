/**
 * External dependencies
 */
import { BlockAttributes } from '@wordpress/blocks';

export const blockAttributes: BlockAttributes = {
	isDescendentOfSingleProductTemplate: {
		type: 'boolean',
		default: false,
	},
	isDescendentOfSingleProductBlock: {
		type: 'boolean',
		default: false,
	},
	productId: {
		type: 'number',
		default: 0,
	},
};

export default blockAttributes;
