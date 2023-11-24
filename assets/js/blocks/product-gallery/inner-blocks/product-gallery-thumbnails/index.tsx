/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { isExperimentalBuild } from '~/settings/blocks';
import icon from './icon';
import { Edit } from './edit';
import metadata from './block.json';

if ( isExperimentalBuild() ) {
	// @ts-expect-error: `metadata` currently does not have a type definition in WordPress core
	registerBlockType( metadata, {
		icon,
		edit: Edit,
		save() {
			return null;
		},
	} );
}
