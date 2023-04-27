/**
 * External dependencies
 */
import type { BlockAttributes } from '@wordpress/blocks';

const attributes: BlockAttributes = {
	name: {
		type: 'string',
		default: 'default_name',
	},
	label: {
		type: 'string',
		default: 'Default label',
	},
	size: {
		type: 'string',
		default: '',
	},
	type: {
		type: 'string',
		default: 'text',
	},
	required: {
		type: 'boolean',
		default: false,
	},
};
export default attributes;
