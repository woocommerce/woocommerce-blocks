/**
 * External dependencies
 */
import type { BlockAttributes } from '@wordpress/blocks';

const attributes: BlockAttributes = {
	className: {
		type: 'string',
		default: '',
	},
	key: {
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
	errorMessage: {
		type: 'string',
		default: 'Please enter a valid value',
	},
	required: {
		type: 'boolean',
		default: false,
	},
};
export default attributes;
