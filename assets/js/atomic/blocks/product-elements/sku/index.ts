/**
 * External dependencies
 */
import { registerExperimentalBlockType } from '@woocommerce/block-settings';
import type { BlockConfiguration } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import sharedConfig from '../shared/config';
import attributes from './attributes';
import edit from './edit';
import {
	BLOCK_TITLE as title,
	BLOCK_ICON as icon,
	BLOCK_DESCRIPTION as description,
} from './constants';

const blockConfig: BlockConfiguration = {
	apiVersion: 2,
	title,
	description,
	icon: { src: icon },
	usesContext: [ 'query', 'queryId', 'postId' ],
	ancestor: [
		'@woocommerce/all-products',
		'@woocommerce/single-product',
		'core/post-template',
	],
	attributes,
	edit,
};

registerExperimentalBlockType( 'woocommerce/product-sku', {
	...sharedConfig,
	...blockConfig,
} );
