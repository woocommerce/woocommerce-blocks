/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { isExperimentalBuild } from '~/settings/blocks';
import { Edit } from './edit';
import metadata from './block.json';
import { Save } from './save';
import { Icon } from './icons';

if ( isExperimentalBuild() ) {
	// @ts-expect-error: `metadata` currently does not have a type definition in WordPress core
	registerBlockType( metadata, {
		icon: Icon,
		edit: Edit,
		save: Save,
	} );
}
