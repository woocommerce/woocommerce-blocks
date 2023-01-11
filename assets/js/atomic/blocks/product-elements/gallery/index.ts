/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */

import { ProductGallery as edit } from './edit';
import metadata from './block.json';

registerBlockType( metadata, {
	edit,
} );
