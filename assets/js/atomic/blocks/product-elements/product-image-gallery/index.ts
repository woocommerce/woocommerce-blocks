/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata, {
	icon: 'tickets',
	edit,
	save,
} );
