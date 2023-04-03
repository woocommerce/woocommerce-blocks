/**
 * External dependencies
 */
import type { BlockAttributes } from '@wordpress/blocks';

const attributes: BlockAttributes = {
	name: {
		type: 'string',
		default: 'the_custom_field_name',
	},
	label: {
		type: 'string',
		default: 'The custom field',
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
