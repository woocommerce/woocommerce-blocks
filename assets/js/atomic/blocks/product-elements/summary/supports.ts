/**
 * Internal dependencies
 */
import { isFeaturePluginBuild } from '~/settings/blocks';

export const supports = {
	...( isFeaturePluginBuild() && {
		color: {
			background: false,
		},
		typography: {
			fontSize: true,
		},
		__experimentalSelector: '.wc-block-components-product-summary',
	} ),
};
