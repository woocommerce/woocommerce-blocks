/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { getSetting } from '@woocommerce/settings';
import { Icon } from '@wordpress/icons';
import { filledCart, removeCart } from '@woocommerce/icons';

export const blockName = 'woocommerce/cart';
export const blockAttributes = {
	isPreview: {
		type: 'boolean',
		default: false,
		save: false,
	},
	currentView: {
		type: 'string',
		default: 'woocommerce/filled-cart-block',
		save: false,
	},
	views: {
		type: 'object',
		default: [
			{
				view: 'woocommerce/filled-cart-block',
				label: __( 'Filled Cart', 'woo-gutenberg-products-block' ),
				icon: <Icon icon={ filledCart } />,
			},
			{
				view: 'woocommerce/empty-cart-block',
				label: __( 'Empty Cart', 'woo-gutenberg-products-block' ),
				icon: <Icon icon={ removeCart } />,
			},
		],
		save: false,
	},
	hasDarkControls: {
		type: 'boolean',
		default: getSetting( 'hasDarkEditorStyleSupport', false ),
	},
	// Deprecated - here for v1 migration support
	isShippingCalculatorEnabled: {
		type: 'boolean',
		default: getSetting( 'isShippingCalculatorEnabled', true ),
	},
	checkoutPageId: {
		type: 'number',
		default: 0,
	},
	showRateAfterTaxName: {
		type: 'boolean',
		default: true,
	},
	align: {
		type: 'string',
	},
};
