/**
 * External dependencies
 */
import { BlockConfiguration, registerBlockType } from '@wordpress/blocks';
import { isExperimentalBuild } from '@woocommerce/block-settings';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';
import icon from './icon';

const blockConfig: BlockConfiguration = {
	...metadata,
	icon,
	edit,
	save,
};

if ( isExperimentalBuild() ) {
	registerBlockType( metadata.name, blockConfig );
}
