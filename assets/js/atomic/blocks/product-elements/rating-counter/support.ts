/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * Internal dependencies
 */
import { isFeaturePluginBuild } from '~/settings/blocks';

export const supports = {
	...( isFeaturePluginBuild() && {
		color: {
			text: false,
			background: false,
			link: true,
		},
		spacing: {
			margin: true,
			padding: true,
		},
		typography: {
			fontSize: true,
			__experimentalSkipSerialization: true,
		},
		__experimentalSelector: '.wc-block-components-product-rating-counter',
	} ),
};
