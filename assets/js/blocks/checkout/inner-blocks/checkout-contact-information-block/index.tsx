/**
 * External dependencies
 */
import { Icon, atSymbol } from '@wordpress/icons';
import { registerFeaturePluginBlockType } from '@woocommerce/block-settings';

/**
 * Internal dependencies
 */
import { Edit, Save } from './edit';
import attributes from './attributes';
import metadata from './block.json';

registerFeaturePluginBlockType( metadata, {
	icon: {
		src: (
			<Icon
				icon={ atSymbol }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	attributes,
	edit: Edit,
	save: Save,
} );
