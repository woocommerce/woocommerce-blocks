/**
 * @type {import('@woocommerce/type-defs/contexts').ShippingErrorTypes}
 */
export const ERROR_TYPES = {
	NONE: 'none',
	INVALID_ADDRESS: 'invalid_address',
	UNKNOWN: 'unknown_error',
};

/**
 * @type {import('@woocommerce/type-defs/cart').CartShippingAddress}
 */
export const DEFAULT_SHIPPING_ADDRESS = {
	first_name: '',
	last_name: '',
	company: '',
	address_1: '',
	address_2: '',
	city: '',
	state: '',
	postcode: '',
	country: '',
};

/**
 * @type {import('@woocommerce/type-defs/contexts').ShippingMethodDataContext}
 */
export const DEFAULT_SHIPPING_CONTEXT_DATA = {
	shippingErrorStatus: ERROR_TYPES.NONE,
	dispatchErrorStatus: () => null,
	shippingErrorTypes: ERROR_TYPES,
	shippingRates: [],
	setShippingRates: () => null,
	shippingRatesLoading: false,
	selectedRates: [],
	setSelectedRates: () => null,
	shippingAddress: DEFAULT_SHIPPING_ADDRESS,
	setShippingAddress: () => null,
	onShippingRateSuccess: () => null,
	onShippingRateFail: () => null,
	needsShipping: false,
};
