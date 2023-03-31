/**
 * External dependencies
 */
import type { BlockAttributes } from '@wordpress/blocks';

const attributes: BlockAttributes = {
	className: {
		type: 'string',
		default: '',
	},
	lock: {
		type: 'object',
		default: {
			move: true,
			remove: true,
		},
	},
};
export default attributes;
