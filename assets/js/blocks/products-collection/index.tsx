/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import icon from './icon';
import './variations';

registerBlockType( metadata, {
	icon,
	attributes: {
		...metadata.attributes,
	},
	edit,
	save() {
		return null;
	},
} );
