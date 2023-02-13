/**
 * External dependencies
 */
import { gallery as icon } from '@wordpress/icons';
import { registerBlockType, unregisterBlockType } from '@wordpress/blocks';
import { registerBlockSingleProductTemplate } from '@woocommerce/atomic-utils';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';

registerBlockSingleProductTemplate( {
	registerBlockFn: () => {
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
