/**
 * External dependencies
 */
import { registerBlockType, BlockConfiguration } from '@wordpress/blocks';
import { isFeaturePluginBuild } from '@woocommerce/block-settings';

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
	icon: { src: icon },
	attributes,
	edit,
	supports: {
		typography: {
			fontSize: true,
			lineHeight: true,
			...( isFeaturePluginBuild() &
				{
					__experimentalFontWeight: true,
					__experimentalTextTransform: true,
					__experimentalFontFamily: true,
				} ),
		},
		color: {
			text: false,
			background: true,
			gradients: true,
		},
		spacing: {
			margin: true,
		},
	},
};

registerBlockType( 'woocommerce/product-title', blockConfig );
