/**
 * External dependencies
 */
import { isExperimentalBuild } from '@woocommerce/block-settings';
import { registerBlockType } from '@wordpress/blocks';
import { Icon, starEmpty } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';

if ( isExperimentalBuild() ) {
	registerBlockType( metadata, {
		icon: {
			src: (
				<Icon
					icon={ starEmpty }
					className="wc-block-editor-components-block-icon"
				/>
			),
		},
		attributes: {
			...metadata.attributes,
		},
		edit,
	} );
}
