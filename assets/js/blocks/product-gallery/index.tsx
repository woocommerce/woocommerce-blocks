/**
 * External dependencies
 */
import { isExperimentalBuild } from '@woocommerce/block-settings';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { Edit } from './edit';
import { Save } from './save';
import metadata from './block.json';
import icon from './icon';
import './style.scss';
import './inner-blocks/product-gallery-large-image-next-previous';
import './inner-blocks/product-gallery-pager';
import './inner-blocks/product-gallery-thumbnails';

export const ProductGalleryBlockSettings = {
	icon,
	edit: Edit,
	save: Save,
}

if ( isExperimentalBuild() ) {
	// @ts-expect-error: `metadata` currently does not have a type definition in WordPress core.
	registerBlockType( metadata, ProductGalleryBlockSettings );
}
