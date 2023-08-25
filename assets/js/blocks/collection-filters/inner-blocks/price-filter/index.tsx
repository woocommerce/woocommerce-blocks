/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './style.scss';
import metadata from './block.json';
import Edit from './edit';
import Save from './save';

registerBlockType( metadata, {
	edit: Edit,
	save: Save,
} );
