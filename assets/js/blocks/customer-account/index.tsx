/**
 * External dependencies
 */
import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';
import { Icon } from '@wordpress/icons';
import { customerAccount } from '@woocommerce/icons';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';

registerBlockType( metadata, {
	icon: {
		src: (
			<Icon
				icon={ customerAccount }
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

registerBlockVariation( 'woocommerce/customer-account', {
	name: 'woocommerce/customer-account',
	title: __( 'Customer account', 'woo-gutenberg-products-block' ),
	isDefault: true,
	attributes: {
		...metadata.attributes,
		iconClass: 'account-icon',
	},
} );
