/**
 * External dependencies
 */
import { Icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { productMeta } from '~/icons';
import { registerBlockSingleProductTemplate } from '~/atomic/utils';
import edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockSingleProductTemplate( {
	blockName: metadata.name,
	// @ts-expect-error: `metadata` currently does not have a type definition in WordPress core
	blockMetadata: metadata,
	blockSettings: {
		edit,
		save,
		icon: {
			src: (
				<Icon
					icon={ productMeta }
					className="wc-block-editor-components-block-icon"
				/>
			),
		},
		ancestor: [ 'woocommerce/single-product' ],
	},
	isAvailableOnPostEditor: true,
} );
