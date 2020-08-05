/**
 * External dependencies
 */
import {
	IS_SHIPPING_CALCULATOR_ENABLED,
	IS_SHIPPING_COST_HIDDEN,
	HAS_DARK_STYLES,
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
	isShippingCostHidden: {
		type: 'boolean',
		default: IS_SHIPPING_COST_HIDDEN,
	},
	checkoutPageId: {
		type: 'number',
		default: 0,
	},
	darkInputs: {
		type: 'boolean',
		default: HAS_DARK_STYLES,
	},
};

export default blockAttributes;
