/**
 * External dependencies
 */
import { Icon, starEmpty } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';
import { isFeaturePluginBuild } from '@woocommerce/block-settings';
import { __experimentalGetSpacingClassesAndStyles } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';

const featurePluginSupport = {
	...metadata.supports,
	...( isFeaturePluginBuild() && {
		color: {
			text: true,
			background: false,
			link: true,
			__experimentalSkipSerialization: true,
		},
		__experimentalBorder: {
			radius: true,
			__experimentalSkipSerialization: true,
		},
		...( typeof __experimentalGetSpacingClassesAndStyles === 'function' && {
			spacing: {
				margin: true,
				padding: true,
				__experimentalSkipSerialization: true,
			},
		} ),
		typography: {
			fontSize: true,
			lineHeight: true,
			__experimentalFontWeight: true,
			__experimentalFontFamily: true,
			__experimentalFontStyle: true,
			__experimentalTextTransform: true,
			__experimentalTextDecoration: true,
			__experimentalLetterSpacing: true,
			__experimentalDefaultControls: {
				fontSize: true,
			},
		},
		__experimentalSelector: '.wc-block-components-product-rating',
	} ),
	...( typeof __experimentalGetSpacingClassesAndStyles === 'function' &&
		! isFeaturePluginBuild() && {
			spacing: {
				margin: true,
			},
		} ),
};
// @ts-expect-error: `metadata` currently does not have a type definition in WordPress core
registerBlockType( metadata, {
	icon: {
		src: (
			<Icon
				icon={ starEmpty }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	attributes: {
		...metadata.attributes,
	},
	supports: {
		...featurePluginSupport,
	},
	edit,
	save() {
		return null;
	},
} );
