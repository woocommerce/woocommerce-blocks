/**
 * @typedef {import('@woocommerce/type-defs/billing').BillingData} BillingData
 * @typedef {import('@woocommerce/type-defs/contexts').BillingDataContext} BillingDataContext
 */

/**
 * External dependencies
 */
import { getSetting } from '@woocommerce/settings';

const defaultCheckoutData = {
	billing_address: {},
};

// Checkout data may be null in editor/admin.
const checkoutData =
	getSetting( 'checkoutData', defaultCheckoutData ) || defaultCheckoutData;

/**
 * @type {BillingData}
 */
export const DEFAULT_BILLING_DATA = {
	first_name: '',
	last_name: '',
	company: '',
	address_1: '',
	address_2: '',
	city: '',
	state: '',
	postcode: '',
	country: '',
	email: '',
	phone: '',
};

/**
 * @type {BillingData}
 */
export const DEFAULT_STATE = {
	...DEFAULT_BILLING_DATA,
	...checkoutData.billing_address,
};

/**
 * @type {BillingDataContext}
 */
export const DEFAULT_BILLING_CONTEXT_DATA = {
	billingData: DEFAULT_BILLING_DATA,
	setBillingData: () => null,
};
