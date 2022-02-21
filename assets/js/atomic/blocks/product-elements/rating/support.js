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
		},
		typography: {
			fontSize: true,
			__experimentalSkipSerialization: true,
		},
		spacing: {
			__experimentalSkipSerialization: true,
			margin: true,
		},
		__experimentalSelector: '.wc-block-components-product-rating',
	} ),
};
