/**
 * External dependencies
 */
import { Icon, column } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { Edit, Save } from './edit';
import attributes from './attributes';

registerBlockType( 'woocommerce/checkout-custom-field-block', {
	title: __( 'Checkout Field', 'woo-gutenberg-products-block' ),
	description: __( 'Custom checkout field', 'woo-gutenberg-products-block' ),
	keywords: [
		__( 'WooCommerce', 'woo-gutenberg-products-block' ),
		__( 'Checkout', 'woo-gutenberg-products-block' ),
		__( 'Field', 'woo-gutenberg-products-block' ),
		__( 'Custom', 'woo-gutenberg-products-block' ),
	],
	icon: {
		src: (
			<Icon
				icon={ column }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	attributes,
	edit: Edit,
	save: Save,
} );
