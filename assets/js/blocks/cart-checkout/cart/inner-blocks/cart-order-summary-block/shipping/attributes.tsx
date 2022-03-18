/**
 * External dependencies
 */
import { getSetting } from '@woocommerce/settings';

export default {
	isShippingCalculatorEnabled: {
		type: 'boolean',
		default: getSetting( 'isShippingCalculatorEnabled', true ),
	},
	lock: {
		type: 'object',
		default: {
			remove: true,
			move: false,
		},
	},
};
