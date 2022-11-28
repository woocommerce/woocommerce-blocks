/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

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
		default: __( 'Proceed to Checkout', 'woo-gutenberg-products-block' ),
	},
};
