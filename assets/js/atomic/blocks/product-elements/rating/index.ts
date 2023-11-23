/**
 * External dependencies
 */
import type { BlockConfiguration } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { registerBlockSingleProductTemplate } from '~/atomic/utils';
import sharedConfig from '../shared/config';
import edit from './edit';
import { BLOCK_ICON as icon } from './constants';
import metadata from './block.json';
import { supports } from './support';

const blockConfig: BlockConfiguration = {
	...sharedConfig,
	ancestor: [
		'woocommerce/all-products',
		'woocommerce/single-product',
		'core/post-template',
		'woocommerce/product-template',
	],
	icon: { src: icon },
	supports,
	edit,
};

registerBlockSingleProductTemplate( {
	blockName: 'woocommerce/product-rating',
	blockMetadata: metadata,
	blockSettings: blockConfig,
	isAvailableOnPostEditor: true,
} );
