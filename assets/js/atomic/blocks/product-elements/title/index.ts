/**
 * External dependencies
 */
import { registerBlockType, BlockConfiguration } from '@wordpress/blocks';

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
	...sharedConfig,
	apiVersion: 2,
	title,
	description,
	icon: {
		src: icon,
		foreground: '#7f54b3',
	},
	attributes,
	edit,
	supports: {
		color: {
			background: false,
		},
		fontSize: true,
	},
};

registerBlockType( 'woocommerce/product-title', blockConfig );
