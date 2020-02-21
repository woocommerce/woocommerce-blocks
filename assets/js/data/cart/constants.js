/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

export const STORE_KEY = 'wc/store/cart';
export const MISSING_ROUTE_ERROR = {
	code: 'missing_route',
	message: __( 'Unable to apply coupon.', 'woo-gutenberg-products-block' ),
	data: {
		status: 500,
	},
};
export const CART_API_ERROR = {
	code: 'cart_api_error',
	message: __(
		'Unable to get cart data from the API.',
		'woo-gutenberg-products-block'
	),
	data: {
		status: 500,
	},
};
