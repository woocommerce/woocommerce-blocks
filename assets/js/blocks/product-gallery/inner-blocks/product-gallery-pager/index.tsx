/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { isExperimentalBuild } from '~/settings/blocks';
import { ProductGalleryPagerBlockIcon } from './icons';
import { Edit } from './edit';
import metadata from './block.json';
import './editor.scss';

if ( isExperimentalBuild() ) {
	// @ts-expect-error: `metadata` currently does not have a type definition in WordPress core
	registerBlockType( metadata, {
		icon: ProductGalleryPagerBlockIcon,
		edit: Edit,
		save() {
			return null;
		},
	} );
}
