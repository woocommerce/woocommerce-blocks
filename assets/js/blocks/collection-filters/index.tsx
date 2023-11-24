/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { Icon, more } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { isExperimentalBuild } from '~/settings/blocks';
import metadata from './block.json';
import edit from './edit';
import save from './save';

if ( isExperimentalBuild() ) {
	registerBlockType( metadata, {
		icon: {
			src: (
				<Icon
					icon={ more }
					className="wc-block-editor-components-block-icon"
				/>
			),
		},
		edit,
		save,
	} );
}
