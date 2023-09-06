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
import { supports } from '../../supports';
import './style.scss';

const { ancestor, ...configuration } = sharedConfig;

const blockConfig = {
	...configuration,
	...metadata,
	edit,
	supports: {
		...metadata.supports,
		...configuration.supports,
		...supports,
		context: '',
	},
};

registerBlockType( metadata.name, blockConfig );

export const BLOCK_NAME = metadata.name;
