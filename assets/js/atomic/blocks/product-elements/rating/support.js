/**
 * External dependencies
 */
import { isFeaturePluginBuild } from '@woocommerce/block-settings';

export const supports = {
	...( isFeaturePluginBuild() && {
		color: {
			text: true,
			background: false,
			link: false,
			__experimentalSkipSerialization: true,
		},
		typography: {
			fontSize: true,
			__experimentalSkipSerialization: true,
		},
		spacing: {
			margin: true,
			__experimentalSkipSerialization: true,
		},
		__experimentalSelector: '.wc-block-components-product-rating',
	} ),
};
