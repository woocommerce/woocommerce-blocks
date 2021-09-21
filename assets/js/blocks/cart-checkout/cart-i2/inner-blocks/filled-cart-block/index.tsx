/**
 * External dependencies
 */
import { Icon, cart } from '@woocommerce/icons';
import { registerFeaturePluginBlockType } from '@woocommerce/block-settings';

/**
 * Internal dependencies
 */
import { Edit, Save } from './edit';
import metadata from './block.json';

registerFeaturePluginBlockType( metadata, {
	icon: {
		src: <Icon srcElement={ cart } />,
		foreground: '#874FB9',
	},
	edit: Edit,
	save: Save,
} );
