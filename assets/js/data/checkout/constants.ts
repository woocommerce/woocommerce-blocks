/**
 * External dependencies
 */
import { getSetting, EnteredAddress } from '@woocommerce/settings';

export const STORE_KEY = 'wc/store/checkout';

export enum STATUS {
	// Checkout is in it's initialized state.
	PRISTINE = 'pristine',
	// When checkout state has changed but there is no activity happening.
	IDLE = 'idle',
	// After the AFTER_PROCESSING event emitters have completed. This status triggers the checkout redirect.
	COMPLETE = 'complete',
	// This is the state before checkout processing begins after the checkout button has been pressed/submitted.
	BEFORE_PROCESSING = 'before_processing',
	// After BEFORE_PROCESSING status emitters have finished successfully. Payment processing is started on this checkout status.
	PROCESSING = 'processing',
	// After server side checkout processing is completed this status is set
	AFTER_PROCESSING = 'after_processing',
}

// These events are emitted when the Checkout status is BEFORE_PROCESSING and AFTER_PROCESSING
// to enable third parties to hook into the checkout process
export const EVENTS = {
	VALIDATION_BEFORE_PROCESSING: 'validation_before_processing',
	AFTER_PROCESSING_WITH_SUCCESS: 'after_processing_with_success',
	AFTER_PROCESSING_WITH_ERROR: 'after_processing_with_error',
};

const preloadedCheckoutData = getSetting( 'checkoutData', {} ) as Record<
	string,
	unknown
>;

export const checkoutData = {
	order_id: 0,
	customer_id: 0,
	billing_address: {} as EnteredAddress,
	shipping_address: {} as EnteredAddress,
	...( preloadedCheckoutData || {} ),
};
