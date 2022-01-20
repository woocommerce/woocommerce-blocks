/**
 * External dependencies
 */
import { getSetting } from '@woocommerce/settings';

export const blockName = 'woocommerce/checkout';
export const blockAttributes = {
	hasDarkControls: {
		type: 'boolean',
		default: getSetting( 'hasDarkEditorStyleSupport', false ),
	},
	showRateAfterTaxName: {
		type: 'boolean',
		default: getSetting( 'displayCartPricesIncludingTax', false ),
	},
};
