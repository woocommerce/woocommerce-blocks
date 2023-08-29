/**
 * External dependencies
 */
import { isFeaturePluginBuild } from '@woocommerce/block-settings';

export const supports = {
	html: false,
	align: [ 'left', 'right', 'center' ],
	spacing: {
		margin: true,
		__experimentalSkipSerialization: true,
	},
	__experimentalSelector: '.wc-block-components-product-sale-badge',
	...( isFeaturePluginBuild() && {
		color: {
			gradients: true,
			background: true,
			link: false,
			__experimentalSkipSerialization: true,
		},
		typography: {
			fontSize: true,
			lineHeight: true,
			__experimentalFontFamily: true,
			__experimentalFontWeight: true,
			__experimentalFontStyle: true,
			__experimentalSkipSerialization: true,
			__experimentalLetterSpacing: true,
			__experimentalTextTransform: true,
			__experimentalTextDecoration: true,
		},
		__experimentalBorder: {
			color: true,
			radius: true,
			width: true,
			__experimentalSkipSerialization: true,
		},
	} ),
};
