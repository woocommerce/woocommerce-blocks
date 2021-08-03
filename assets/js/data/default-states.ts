/**
 * External dependencies
 */
import type { Cart, CartMeta } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import { EMPTY_ARRAY, EMPTY_OBJECT } from './constants';
import type { ResponseError } from './types';

export interface CartState {
	cartItemsPendingQuantity: Array< string >;
	cartItemsPendingDelete: Array< string >;
	cartData: Cart;
	metaData: CartMeta;
	errors: Array< ResponseError >;
}

export const defaultCartState: CartState = {
	cartItemsPendingQuantity: EMPTY_ARRAY,
	cartItemsPendingDelete: EMPTY_ARRAY,
	cartData: {
		coupons: EMPTY_ARRAY,
		shippingRates: EMPTY_ARRAY,
		shippingAddress: {
			first_name: '',
			last_name: '',
			company: '',
			address_1: '',
			address_2: '',
			city: '',
			state: '',
			postcode: '',
			country: '',
			phone: '',
		},
		billingAddress: {
			first_name: '',
			last_name: '',
			company: '',
			address_1: '',
			address_2: '',
			city: '',
			state: '',
			postcode: '',
			country: '',
			phone: '',
			email: '',
		},
		items: EMPTY_ARRAY,
		itemsCount: 0,
		itemsWeight: 0,
		needsShipping: true,
		needsPayment: false,
		hasCalculatedShipping: true,
		fees: EMPTY_ARRAY,
		totals: {
			currency_code: '',
			currency_symbol: '',
			currency_minor_unit: 2,
			currency_decimal_separator: '.',
			currency_thousand_separator: ',',
			currency_prefix: '',
			currency_suffix: '',
			total_items: '0',
			total_items_tax: '0',
			total_fees: '0',
			total_fees_tax: '0',
			total_discount: '0',
			total_discount_tax: '0',
			total_shipping: '0',
			total_shipping_tax: '0',
			total_price: '0',
			total_tax: '0',
			tax_lines: EMPTY_ARRAY,
		},
		errors: EMPTY_ARRAY,
		paymentRequirements: EMPTY_ARRAY,
		extensions: EMPTY_OBJECT,
	},
	metaData: {
		updatingCustomerData: false,
		updatingSelectedRate: false,
		applyingCoupon: '',
		removingCoupon: '',
		isCartDataStale: false,
	},
	errors: EMPTY_ARRAY,
};
