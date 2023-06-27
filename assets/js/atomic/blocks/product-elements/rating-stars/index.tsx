/**
 * External dependencies
 */
import { BlockConfiguration } from '@wordpress/blocks';
import { registerBlockSingleProductTemplate } from '@woocommerce/atomic-utils';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import sharedConfig from '../shared/config';
import { supports } from './support';
import { BLOCK_ICON } from './constants';

const blockConfig: BlockConfiguration = {
	...sharedConfig,
	ancestor: [
		'woocommerce/all-products',
		'woocommerce/single-product',
		'core/post-template',
		'woocommerce/product-template',
	],
	icon: { src: BLOCK_ICON },
	supports,
	edit,
};

registerBlockSingleProductTemplate( {
	blockName: 'woocommerce/product-rating-stars',
	blockMetadata: metadata,
	blockSettings: blockConfig,
} );
