/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './style.scss';
import metadata from './block.json';

registerBlockType( metadata, {
	edit: () => <div>Simple price filter</div>,
	save: () => null,
} );
