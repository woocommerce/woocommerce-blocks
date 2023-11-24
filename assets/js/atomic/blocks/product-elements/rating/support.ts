/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * External dependencies
 */
import { __experimentalGetSpacingClassesAndStyles } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { isFeaturePluginBuild } from '~/settings/blocks';

export const supports = {
	...( isFeaturePluginBuild() && {
		color: {
			text: true,
			background: false,
			link: false,
			__experimentalSkipSerialization: true,
		},
		spacing: {
			margin: true,
			padding: true,
		},
		typography: {
			fontSize: true,
			__experimentalSkipSerialization: true,
		},
		__experimentalSelector: '.wc-block-components-product-rating',
	} ),
	...( ! isFeaturePluginBuild() &&
		typeof __experimentalGetSpacingClassesAndStyles === 'function' && {
			spacing: {
				margin: true,
			},
		} ),
};
