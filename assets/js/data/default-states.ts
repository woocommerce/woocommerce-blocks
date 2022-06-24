/**
 * External dependencies
 */
import type { Cart, CartMeta, EmptyObjectType } from '@woocommerce/types';
import { getSetting } from '@woocommerce/settings';
import {
	PaymentMethods,
	ExpressPaymentMethods,
} from '@woocommerce/type-defs/payments';

/**
 * Internal dependencies
 */
import { STATUS as PAYMENT_METHOD_STATUS } from '../base/context/providers/cart-checkout/payment-methods/constants';
import {
	EMPTY_CART_COUPONS,
	EMPTY_CART_ITEMS,
	EMPTY_CART_FEES,
	EMPTY_CART_ITEM_ERRORS,
	EMPTY_CART_ERRORS,
	EMPTY_SHIPPING_RATES,
	EMPTY_TAX_LINES,
	EMPTY_PAYMENT_REQUIREMENTS,
	EMPTY_EXTENSIONS,
} from './constants';
import type { ResponseError } from './types';
import { CustomerPaymentMethod } from '../base/context/providers/cart-checkout/payment-methods/types';

export interface CartState {
	cartItemsPendingQuantity: Array< string >;
	cartItemsPendingDelete: Array< string >;
	cartData: Cart;
	metaData: CartMeta;
	errors: Array< ResponseError >;
}

export const EMPTY_PENDING_QUANTITY: [] = [];
export const EMPTY_PENDING_DELETE: [] = [];

export const defaultCartState: CartState = {
	cartItemsPendingQuantity: EMPTY_PENDING_QUANTITY,
	cartItemsPendingDelete: EMPTY_PENDING_DELETE,
	cartData: {
		coupons: EMPTY_CART_COUPONS,
		shippingRates: EMPTY_SHIPPING_RATES,
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
		items: EMPTY_CART_ITEMS,
		itemsCount: 0,
		itemsWeight: 0,
		needsShipping: true,
		needsPayment: false,
		hasCalculatedShipping: true,
		fees: EMPTY_CART_FEES,
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
			tax_lines: EMPTY_TAX_LINES,
		},
		errors: EMPTY_CART_ITEM_ERRORS,
		paymentRequirements: EMPTY_PAYMENT_REQUIREMENTS,
		extensions: EMPTY_EXTENSIONS,
	},
	metaData: {
		updatingCustomerData: false,
		updatingSelectedRate: false,
		applyingCoupon: '',
		removingCoupon: '',
		isCartDataStale: false,
	},
	errors: EMPTY_CART_ERRORS,
};

export interface PaymentMethodDataState {
	paymentStatuses: typeof PAYMENT_METHOD_STATUS;
	currentStatus: {
		isPristine: boolean;
		isStarted: boolean;
		isProcessing: boolean;
		isFinished: boolean;
		hasError: boolean;
		hasFailed: boolean;
		isSuccessful: boolean;
		isDoingExpressPayment: boolean;
	};
	errorMessage: string;
	activePaymentMethod: string;
	activeSavedToken: string;
	registeredPaymentMethods: PaymentMethods;
	registeredExpressPaymentMethods: ExpressPaymentMethods;
	availablePaymentMethods: string[];
	availableExpressPaymentMethods: string[];
	paymentMethodData: Record< string, unknown >;
	paymentMethodsInitialized: boolean;
	expressPaymentMethodsInitialized: boolean;
	shouldSavePaymentMethod: boolean;
	isExpressPaymentMethodActive: boolean;
	customerPaymentMethods:
		| Record< string, CustomerPaymentMethod[] >
		| EmptyObjectType;
}
export const defaultPaymentMethodDataState: PaymentMethodDataState = {
	paymentStatuses: PAYMENT_METHOD_STATUS,
	currentStatus: {
		isPristine: true,
		isStarted: false,
		isProcessing: false,
		isFinished: false,
		hasError: false,
		hasFailed: false,
		isSuccessful: false,
		isDoingExpressPayment: false,
	},
	customerPaymentMethods: getSetting<
		Record< string, CustomerPaymentMethod[] > | EmptyObjectType
	>( 'customerPaymentMethods', {} ),
	registeredPaymentMethods: {},
	registeredExpressPaymentMethods: {},
	availablePaymentMethods: [],
	availableExpressPaymentMethods: [],
	paymentMethodData: {},
	paymentMethodsInitialized: false,
	expressPaymentMethodsInitialized: false,
	isExpressPaymentMethodActive: false,
	shouldSavePaymentMethod: false,
	errorMessage: '',
	activePaymentMethod: '',
	activeSavedToken: '',
};
