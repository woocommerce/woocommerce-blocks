/**
 * External dependencies
 */
import { isExperimentalBuild } from '@woocommerce/block-settings';
import { registerBlockType } from '@wordpress/blocks';
import { Icon, starFilled } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import sharedConfig from '../shared/config';
import { supports } from './support';

if ( isExperimentalBuild() ) {
	registerBlockType( metadata, {
		...sharedConfig,
		ancestor: [ 'woocommerce/single-product' ],
		icon: {
			src: (
				<Icon
					icon={ starFilled }
					className="wc-block-editor-components-block-icon"
				/>
			),
		},
		supports,
		edit,
	} );
}
