/**
 * Data and actions exposed to third parties
 */

/**
 * External dependencies
 */
import { select, dispatch } from '@wordpress/data';
import {
	CHECKOUT_STORE_KEY,
	PAYMENT_METHOD_DATA_STORE_KEY,
} from '@woocommerce/block-data';

// We create one object per namespace here.

const {
	getCustomerId,
	getOrderNotes,
	hasError,
	hasOrder,
	isComplete,
	isIdle,
	isBeforeProcessing,
	isAfterProcessing,
	isProcessing,
	isCalculating,
} = select( CHECKOUT_STORE_KEY );

const { setOrderNotes, setOrderId } = dispatch( CHECKOUT_STORE_KEY );

const {
	isExpressPaymentMethodActive,
	getActiveSavedToken,
	getActivePaymentMethod,
	getSavedPaymentMethods,
	getShouldSavePaymentMethod,
	getCurrentStatus,
	paymentMethodsInitialized,
	expressPaymentMethodsInitialized,
} = select( PAYMENT_METHOD_DATA_STORE_KEY );

// Checkout selectors & actions.
export const checkout = {
	getCustomerId,
	getOrderNotes,
	hasError,
	hasOrder,
	isComplete,
	isIdle,
	isBeforeProcessing,
	isAfterProcessing,
	isProcessing,
	isCalculating,
	setOrderNotes,
	setOrderId,
};

// Payment selectors & actions.
export const payment = {
	isExpressPaymentMethodActive,
	getActiveSavedToken,
	getActivePaymentMethod,
	getSavedPaymentMethods,
	getShouldSavePaymentMethod,
	getCurrentStatus,
	paymentMethodsInitialized,
	expressPaymentMethodsInitialized,
};
