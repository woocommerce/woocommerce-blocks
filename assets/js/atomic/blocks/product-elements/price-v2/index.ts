/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import { supports } from './supports';
import metadata from './block.json';
import { BLOCK_ICON as icon } from './constants';
import './inner-blocks';

const blockConfig = {
	...metadata,
	icon: { src: icon },
	supports: { ...supports, ...metadata.supports },
	edit,
	save,
};

registerBlockType( metadata.name, blockConfig );
