/**
 * External dependencies
 */
import { gallery as icon } from '@wordpress/icons';
import { registerBlockType, unregisterBlockType } from '@wordpress/blocks';
import { registerBlockSingleProductTemplate } from '@woocommerce/atomic-utils';
import { isExperimentalBuild } from '@woocommerce/block-settings';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';

if ( isExperimentalBuild() ) {
	registerBlockSingleProductTemplate( {
		registerBlockFn: () => {
			// @ts-expect-error: `registerBlockType` is a function that is typed in WordPress core.
			registerBlockType( metadata, {
				icon,
				edit,
			} );
		},
		unregisterBlockFn: () => {
			unregisterBlockType( metadata.name );
		},
		blockName: metadata.name,
	} );
}
