/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { isExperimentalBuild } from '@woocommerce/block-settings';

/**
 * Internal dependencies
 */
import { ProductGalleryBlockIcon } from './icons';
import { Edit, Save } from './edit';
import metadata from './block.json';
import './style.scss';
import './editor.scss';

if ( isExperimentalBuild() ) {
	// @ts-expect-error: `metadata` currently does not have a type definition in WordPress core
	registerBlockType( metadata, {
		icon: ProductGalleryBlockIcon,
		edit: Edit,
		save: Save,
	} );
}
