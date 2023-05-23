/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import edit from './edit';
import sharedConfig from '../../../shared/config';
import metadata from './block.json';

const { ancestor, ...configuration } = sharedConfig;

const blockConfig = {
	...configuration,
	...metadata,
	edit,
	supports: {
		...configuration.supports,
		context: '',
	},
};

registerBlockType( metadata.name, blockConfig );

export const BLOCK_NAME = metadata.name;
