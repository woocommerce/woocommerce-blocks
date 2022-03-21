/**
 * External dependencies
 */
import { getSetting } from '@woocommerce/settings';

export default {
	lock: {
		type: 'object',
		default: {
			move: true,
			remove: true,
		},
	},
};
