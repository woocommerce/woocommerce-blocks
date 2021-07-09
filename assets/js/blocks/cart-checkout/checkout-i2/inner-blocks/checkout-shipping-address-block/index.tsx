/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerFeaturePluginBlockType } from '@woocommerce/block-settings';

/**
 * Internal dependencies
 */
import { Edit, Save } from './edit';
import attributes from './attributes';

registerFeaturePluginBlockType( 'woocommerce/checkout-shipping-address-block', {
	title: __( 'Shipping Address', 'woo-gutenberg-products-block' ),
	category: 'woocommerce',
	description: __(
		'Checkout shipping address step.',
		'woo-gutenberg-products-block'
	),
	supports: {
		align: false,
		html: false,
		multiple: false,
		reusable: false,
		inserter: false,
		lock: {
			remove: true,
			move: true,
		},
	},
	parent: [ 'woocommerce/checkout-fields-block' ],
	attributes,
	apiVersion: 2,
	edit: Edit,
	save: Save,
	usesContext: [
		'woocommerce/showCompanyField',
		'woocommerce/requireCompanyField',
		'woocommerce/showApartmentField',
		'woocommerce/showPhoneField',
		'woocommerce/requirePhoneField',
	],
} );
