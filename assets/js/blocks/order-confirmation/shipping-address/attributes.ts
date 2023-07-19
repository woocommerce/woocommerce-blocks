/**
 * External dependencies
 */
import type { BlockAttributes } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { DEFAULT_TITLE } from './constants';

const attributes: BlockAttributes = {
	title: {
		type: 'string',
		default: DEFAULT_TITLE,
	},
};

export default attributes;
