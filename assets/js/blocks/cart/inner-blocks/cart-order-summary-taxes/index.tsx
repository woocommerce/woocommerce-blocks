/**
 * External dependencies
 */
import { totals } from '@woocommerce/icons';
import { Icon } from '@wordpress/icons';
import { registerFeaturePluginBlockType } from '@woocommerce/block-settings';

/**
 * Internal dependencies
 */
import { Edit, Save } from './edit';
import attributes from './attributes';
import metadata from './block.json';

registerFeaturePluginBlockType( 'woocommerce/cart-order-summary-taxes-block', {
	// When a block is registered server side, we should add the block metadata in the settings.
	...metadata,
	icon: {
		src: (
			<Icon
				icon={ totals }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	attributes: {
		...metadata.attributes,
		...attributes,
	},
	edit: Edit,
	save: Save,
} );
