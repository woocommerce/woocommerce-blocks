/**
 * Internal dependencies
 */
import { defaultButtonLabel } from './block';

export default {
	checkoutPageId: {
		type: 'number',
		default: 0,
	},
	lock: {
		type: 'object',
		default: {
			move: true,
			remove: true,
		},
	},
	buttonLabel: {
		type: 'string',
		default: defaultButtonLabel,
	},
};
