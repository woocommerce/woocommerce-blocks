/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { Icon, more } from '@wordpress/icons';
import { isExperimentalBuild } from '@woocommerce/block-settings';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';

if ( isExperimentalBuild() ) {
	registerBlockType( metadata, {
		ancestor: [ 'woocommerce/product-collection' ],
		supports: { ...metadata.supports },
		icon: {
			src: (
				<Icon
					icon={ more }
					className="wc-block-editor-components-block-icon"
				/>
			),
		},
		edit,
		save,
	} );
}
