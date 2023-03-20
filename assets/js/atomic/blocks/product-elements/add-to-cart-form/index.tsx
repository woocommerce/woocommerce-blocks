/**
 * External dependencies
 */
import { registerBlockSingleProductTemplate } from '@woocommerce/atomic-utils';
import {
	getBlockType,
	registerBlockType,
	unregisterBlockType,
} from '@wordpress/blocks';
import { subscribe, select } from '@wordpress/data';
import { Icon, button } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';

// When the post/page editor loads, register the block with the ancestor key.
subscribe( () => {
	const block = getBlockType( metadata.name );

	const store = select( 'core/edit-post' );

	if ( block === undefined && store !== undefined ) {
		registerBlockType( metadata, {
			edit,
			icon: {
				src: (
					<Icon
						icon={ button }
						className="wc-block-editor-components-block-icon"
					/>
				),
			},
			ancestor: [ 'woocommerce/single-product' ],
		} );
	}
}, 'core/edit-post' );

// When the site editor loads, register the block as a global block on the single product template, otherwise register it as block with the ancestor key.
registerBlockSingleProductTemplate( {
	registerBlockFn: () => {
		// @ts-expect-error: `registerBlockType` is a function that is typed in WordPress core.
		registerBlockType( metadata, {
			icon: {
				src: (
					<Icon
						icon={ button }
						className="wc-block-editor-components-block-icon"
					/>
				),
			},
			edit,
			save() {
				return null;
			},
		} );
	},
	unregisterBlockFn: () => {
		unregisterBlockType( metadata.name );
		registerBlockType( metadata, {
			edit,
			icon: {
				src: (
					<Icon
						icon={ button }
						className="wc-block-editor-components-block-icon"
					/>
				),
			},
			ancestor: [ 'woocommerce/single-product' ],
		} );
	},
	blockName: metadata.name,
} );
