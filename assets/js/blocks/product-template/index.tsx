/**
 * External dependencies
 */
import { BlockConfiguration, registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';
import icon from './icon';

const blockConfig: BlockConfiguration = {
	...metadata,
	icon,
	edit,
	save,
};

registerBlockType( metadata.name, blockConfig );
