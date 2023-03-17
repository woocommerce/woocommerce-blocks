/**
 * External dependencies
 */
import { registerBlockSingleProductTemplate } from '@woocommerce/atomic-utils';
import { registerBlockType, unregisterBlockType } from '@wordpress/blocks';
import { Icon, button } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';

let currentTemplateId: string | undefined;

// subscribe( () => {
// 	const previousTemplateId = currentTemplateId;
// 	const store = select( 'core/edit-site' );
// 	currentTemplateId = store?.getEditedPostId() as string | undefined;

// 	if ( previousTemplateId === currentTemplateId ) {
// 		return;
// 	}

// 	const parsedTemplate = currentTemplateId?.split( '//' )[ 1 ];

// 	if ( parsedTemplate === null || parsedTemplate === undefined ) {
// 		return;
// 	}

// 	const block = getBlockType( blockName );

// 	if ( block === undefined && parsedTemplate.includes( 'single-product' ) ) {
// 		registerBlockFn();
// 	}

// 	if ( block !== undefined ) {
// 		unregisterBlockFn();
// 	}
// }, 'core/edit-site' );

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
