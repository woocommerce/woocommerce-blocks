/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { isExperimentalBuild } from '@woocommerce/block-settings';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import icon from './icon';

if ( isExperimentalBuild() ) {
	// @ts-expect-error: `registerBlockType` is a function that is typed in WordPress core.
	registerBlockType( metadata, {
		icon,
	} );
}
