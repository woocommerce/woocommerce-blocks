/**
 * External dependencies
 */
import { isFeaturePluginBuild } from '@woocommerce/block-settings';

export const supports = {
	...( isFeaturePluginBuild() && {
		color: {
			text: true,
			background: true,
			link: false,
			__experimentalSkipSerialization: true,
		},
		__experimentalBorder: {
			radius: true,
			__experimentalSkipSerialization: true,
		},
		__experimentalSelector: '.wc-block-components-product-button__button',
	} ),
};
