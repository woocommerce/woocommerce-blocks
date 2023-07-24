/**
 * External dependencies
 */
import { registerBlockSingleProductTemplate } from '@woocommerce/atomic-utils';
import { isExperimentalBuild } from '@woocommerce/block-settings';

/**
 * Internal dependencies
 */
import { Edit, Save } from './edit';
import metadata from './block.json';
import icon from './icon';
import './inner-blocks/product-gallery-large-image';
import './inner-blocks/product-gallery-large-image-next-previous';

if ( isExperimentalBuild() ) {
	registerBlockSingleProductTemplate( {
		blockName: metadata.name,
		blockMetadata: metadata,
		blockSettings: {
			icon,
			edit: Edit,
			save: Save,
		},
		isAvailableOnPostEditor: true,
	} );
}
