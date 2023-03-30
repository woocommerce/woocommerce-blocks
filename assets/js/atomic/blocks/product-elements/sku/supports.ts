/**
 * External dependencies
 */
import { isFeaturePluginBuild } from '@woocommerce/block-settings';
import { __experimentalGetSpacingClassesAndStyles } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import sharedConfig from '../shared/config';

export const supports = {
	...sharedConfig.supports,
	...( isFeaturePluginBuild() && {
		color: {
			text: true,
			background: true,
		},
		typography: {
			fontSize: true,
			lineHeight: true,
			__experimentalFontWeight: true,
			__experimentalFontFamily: true,
			__experimentalFontStyle: true,
			__experimentalTextTransform: true,
			__experimentalTextDecoration: true,
			__experimentalLetterSpacing: true,
		},
		__experimentalSelector: '.wc-block-components-product-sku',
	} ),
	...( typeof __experimentalGetSpacingClassesAndStyles === 'function' && {
		spacing: {
			margin: true,
			padding: true,
		},
	} ),
};
