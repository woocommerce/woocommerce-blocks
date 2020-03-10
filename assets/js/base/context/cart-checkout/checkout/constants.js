/**
 * @type {import("@woocommerce/type-defs/checkout").CheckoutStatusConstants}
 */
export const STATUS = {
	PRISTINE: 'pristine',
	IDLE: 'idle',
	CALCULATING: 'calculating',
	PROCESSING: 'processing',
	COMPLETE: 'complete',
};

export const DEFAULT_STATE = {
	redirectUrl: '',
	status: STATUS.PRISTINE,
	// this is used by the reducer to set what status the state will
	// take after calculating is complete.
	nextStatus: STATUS.IDLE,
	hasError: false,
	calculatingCount: 0,
};

export const TYPES = {
	SET_PRISTINE: 'set_pristine',
	SET_REDIRECT_URL: 'set_redirect_url',
	SET_COMPLETE: 'set_checkout_complete',
	SET_PROCESSING: 'set_checkout_is_processing',
	SET_HAS_ERROR: 'set_checkout_has_error',
	SET_NO_ERROR: 'set_checkout_no_error',
	INCREMENT_CALCULATING: 'increment_calculating',
	DECREMENT_CALCULATING: 'decrement_calculating',
};
