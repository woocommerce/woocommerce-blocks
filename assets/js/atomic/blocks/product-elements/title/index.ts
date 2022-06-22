/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import type { BlockConfiguration } from '@wordpress/blocks';
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
import { Save } from './save';
import { hasSpacingStyleSupport } from '../../../../utils/global-style';

const blockConfig: BlockConfiguration = {
	...sharedConfig,
	apiVersion: 2,
	title,
	description,
	icon: { src: icon },
	attributes,
	edit,
	save: Save,
	supports: {
		...sharedConfig.supports,
		...( isFeaturePluginBuild() && {
			typography: {
				fontSize: true,
				lineHeight: true,
				__experimentalFontWeight: true,
				__experimentalTextTransform: true,
				__experimentalFontFamily: true,
			},
			color: {
				text: true,
				background: true,
				link: false,
				gradients: true,
				__experimentalSkipSerialization: true,
			},
			...( hasSpacingStyleSupport() && {
				spacing: {
					margin: true,
					__experimentalSkipSerialization: true,
				},
			} ),
			__experimentalSelector: '.wc-block-components-product-title',
		} ),
	},
};

registerBlockType( 'woocommerce/product-title', blockConfig );
