/**
 * External dependencies
 */
import { box as icon } from '@wordpress/icons';
import { registerBlockType, unregisterBlockType } from '@wordpress/blocks';
import { registerBlockSingleProductTemplate } from '@woocommerce/atomic-utils';
import { subscribe, select } from '@wordpress/data';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import metadata from './block.json';

// @TODO: Register the block

registerBlockType( metadata, {
	icon,
	edit,
	save,
	ancestor: [ 'woocommerce/single-product' ],
} );

// registerBlockSingleProductTemplate( {
// 	registerBlockFn: () => {
// 		// @ts-expect-error: `registerBlockType` is a function that is typed in WordPress core.
// 		registerBlockType( metadata, {
// 			icon,
// 			edit,
// 			save,
// 		} );
// 	},
// 	unregisterBlockFn: () => {
// 		unregisterBlockType( metadata.name );
// 	},
// 	blockName: metadata.name,
// } );
