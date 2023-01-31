/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import type { BlockConfiguration } from '@wordpress/blocks';
import { isFeaturePluginBuild } from '@woocommerce/block-settings';
import { Icon, queryPagination } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';

const blockConfig: BlockConfiguration = {
	...metadata,
	supports: {
		...( isFeaturePluginBuild() && {
			typography: {
				fontSize: true,
				lineHeight: true,
				__experimentalFontFamily: true,
				__experimentalFontStyle: true,
				__experimentalFontWeight: true,
				__experimentalTextTransform: true,
				__experimentalDefaultControls: {
					fontSize: true,
				},
			},
		} ),
	},
};

registerBlockType( blockConfig, {
	icon: {
		src: (
			<Icon
				icon={ queryPagination }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	attributes: {
		...metadata.attributes,
	},
	edit,
	save() {
		return null;
	},
} );
