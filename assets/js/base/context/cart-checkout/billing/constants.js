/**
 * @typedef {import('@woocommerce/type-defs/billing').BillingData} BillingData
 * @typedef {import('@woocommerce/type-defs/contexts').BillingDataContext} BillingDataContext
 */

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
 * @type {BillingDataContext}
 */
export const DEFAULT_BILLING_CONTEXT_DATA = {
	billingData: DEFAULT_BILLING_DATA,
	setBillingData: () => null,
};
