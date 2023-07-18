/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * External dependencies
 */
import { isFeaturePluginBuild } from '@woocommerce/block-settings';

export const supports = {
	color: {
		text: true,
		background: true,
	},
	spacing: {
		margin: true,
		padding: true,
	},
	...( isFeaturePluginBuild() && {
		typography: {
			fontSize: true,
			__experimentalFontWeight: true,
			__experimentalSkipSerialization: true,
		},
	} ),
};
