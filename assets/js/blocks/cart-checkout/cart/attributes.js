/**
 * External dependencies
 */
import {
	IS_SHIPPING_CALCULATOR_ENABLED,
	IS_SHIPPING_COST_HIDDEN,
	HAS_DARK_EDITOR_STYLE_SUPPORT,
} from '@woocommerce/block-settings';

const blockAttributes = {
	isPreview: {
		type: 'boolean',
		default: false,
		save: false,
	},
	isShippingCalculatorEnabled: {
		type: 'boolean',
		default: IS_SHIPPING_CALCULATOR_ENABLED,
	},
	// This setting is no longer being shown due to conflicts with the global setting. Here for backwards compat
	// and possible future re-introduction.
	isShippingCostHidden: {
		type: 'boolean',
		default: IS_SHIPPING_COST_HIDDEN,
	},
	checkoutPageId: {
		type: 'number',
		default: 0,
	},
	hasDarkControls: {
		type: 'boolean',
		default: HAS_DARK_EDITOR_STYLE_SUPPORT,
	},
};

export default blockAttributes;
