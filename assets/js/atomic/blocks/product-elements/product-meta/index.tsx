/**
 * External dependencies
 */
import { box as icon } from '@wordpress/icons';
import {
	getBlockType,
	registerBlockType,
	unregisterBlockType,
} from '@wordpress/blocks';
import { registerBlockSingleProductTemplate } from '@woocommerce/atomic-utils';
import { subscribe, select } from '@wordpress/data';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';

// When the post/page editor loads, register the block with the ancestor key.
subscribe( () => {
	const block = getBlockType( metadata.name );

	const store = select( 'core/edit-post' );

	if ( block === undefined && store !== undefined ) {
		// @ts-expect-error: `registerBlockType` is a function that is typed in WordPress core.
		registerBlockType( metadata, {
			edit,
			icon,
			ancestor: [ 'woocommerce/single-product' ],
		} );
	}
}, 'core/edit-post' );

// When the site editor loads, register the block as a global block on the single product template, otherwise register it as block with the ancestor key.
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
		// @ts-expect-error: `registerBlockType` is a function that is typed in WordPress core.
		registerBlockType( metadata, {
			edit,
			icon,
			ancestor: [ 'woocommerce/single-product' ],
		} );
	},
	blockName: metadata.name,
} );
