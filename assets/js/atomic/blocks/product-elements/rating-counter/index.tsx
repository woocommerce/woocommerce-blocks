/**
 * External dependencies
 */
import { registerBlockSingleProductTemplate } from '@woocommerce/atomic-utils';
import { isExperimentalBuild } from '@woocommerce/block-settings';
import { BlockConfiguration } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import sharedConfig from '../shared/config';
import { supports } from './support';
import { BLOCK_ICON as icon } from './constants';

if ( isExperimentalBuild() ) {
	const blockConfig: BlockConfiguration = {
		...sharedConfig,
		icon: { src: icon },
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
