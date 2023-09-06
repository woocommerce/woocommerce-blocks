/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { Edit as edit, Save as save } from './edit';
import sharedConfig from '../../../shared/config';
import { supports } from '../../supports';
import metadata from './block.json';

const { ancestor, ...configuration } = sharedConfig;

const blockConfig = {
	...configuration,
	...metadata,
	supports: {
		...supports,
		...metadata.supports,
	},
	edit,
	save,
};

registerBlockType( metadata.name, blockConfig );

export const BLOCK_NAME = metadata.name;
