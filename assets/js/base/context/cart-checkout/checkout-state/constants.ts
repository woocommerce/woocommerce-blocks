/**
 * External dependencies
 */
import { getSetting } from '@woocommerce/settings';

/**
 * Internal dependencies
 */
import type {
	CheckoutStateContextType,
	CheckoutStateContextState,
} from './types';

export enum STATUS {
	// Checkout is in it's initialized state.
	PRISTINE = 'pristine',
	// When checkout state has changed but there is no activity happening.
	IDLE = 'idle',
	// After BEFORE_PROCESSING status emitters have finished successfully. Payment processing is started on this checkout status.
	PROCESSING = 'processing',
	// After the AFTER_PROCESSING event emitters have completed. This status triggers the checkout redirect.
	COMPLETE = 'complete',
	// This is the state before checkout processing begins after the checkout button has been pressed/submitted.
	BEFORE_PROCESSING = 'before_processing',
	// After server side checkout processing is completed this status is set
	AFTER_PROCESSING = 'after_processing',
}

const checkoutData = getSetting( 'checkoutData', {
	order_id: 0,
	customer_id: 0,
} );

export const DEFAULT_STATE: CheckoutStateContextState = {
	redirectUrl: '',
	status: STATUS.PRISTINE,
	hasError: false,
	calculatingCount: 0,
	orderId: checkoutData.order_id,
	orderNotes: '',
	customerId: checkoutData.customer_id,
	shouldCreateAccount: false,
	processingResponse: null,
};

export const DEFAULT_CHECKOUT_STATE_DATA: CheckoutStateContextType = {
	dispatch: () => void {},
	isComplete: false,
	isIdle: false,
	isCalculating: false,
	isProcessing: false,
	isBeforeProcessing: false,
	isAfterProcessing: false,
	hasError: false,
	redirectUrl: '',
	orderId: 0,
	orderNotes: '',
	customerId: 0,
	onCheckoutAfterProcessingWithSuccess: () => () => () => void null,
	onCheckoutAfterProcessingWithError: () => () => () => void null,
	onCheckoutBeforeProcessing: () => () => () => void null,
	hasOrder: false,
	isCart: false,
	shouldCreateAccount: false,
};

export enum TYPES {
	SET_IDLE = 'set_idle',
	SET_PRISTINE = 'set_pristine',
	SET_REDIRECT_URL = 'set_redirect_url',
	SET_COMPLETE = 'set_checkout_complete',
	SET_BEFORE_PROCESSING = 'set_before_processing',
	SET_AFTER_PROCESSING = 'set_after_processing',
	SET_PROCESSING_RESPONSE = 'set_processing_response',
	SET_PROCESSING = 'set_checkout_is_processing',
	SET_HAS_ERROR = 'set_checkout_has_error',
	SET_NO_ERROR = 'set_checkout_no_error',
	SET_CUSTOMER_ID = 'set_checkout_customer_id',
	SET_ORDER_ID = 'set_checkout_order_id',
	SET_ORDER_NOTES = 'set_checkout_order_notes',
	INCREMENT_CALCULATING = 'increment_calculating',
	DECREMENT_CALCULATING = 'decrement_calculating',
	SET_SHOULD_CREATE_ACCOUNT = 'set_should_create_account',
}
