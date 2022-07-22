/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
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
	title: __( 'Taxes', 'woo-gutenberg-products-block' ),
	description: __(
		'Shows the cart taxes row.',
		'woo-gutenberg-products-block'
	),
	// description: _x(
	// 	'Shows the cart taxes row.',
	// 	'block description',
	// 	'woo-gutenberg-products-block'
	// ),
	edit: Edit,
	save: Save,
} );
