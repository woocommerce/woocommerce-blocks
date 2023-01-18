/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';

/**
 * Internal dependencies
 */
import { ProductImageGalleryEdit } from './edit';

registerBlockType( metadata, {
	icon: 'tickets',
	edit: ProductImageGalleryEdit,
} );
