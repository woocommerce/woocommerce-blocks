/**
 * External dependencies
 */
import { registerBlockSingleProductTemplate } from '@woocommerce/atomic-utils';
import { isExperimentalBuild } from '@woocommerce/block-settings';
import { BlockConfiguration } from '@wordpress/blocks';
import { Icon, starFilled } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import sharedConfig from '../shared/config';
import { supports } from './support';

if ( isExperimentalBuild() ) {
	const blockConfig: BlockConfiguration = {
		...sharedConfig,
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
	};

	registerBlockSingleProductTemplate( {
		blockName: 'woocommerce/product-rating-counter',
		blockMetadata: metadata,
		blockSettings: blockConfig,
		isAvailableOnPostEditor: true,
	} );
}
