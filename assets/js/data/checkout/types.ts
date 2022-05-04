/**
 * External dependencies
 */
import { PaymentResultDataType } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import { STATUS } from './constants';

export enum ACTION {
	SET_IDLE = 'SET_IDLE',
	SET_PRISTINE = 'SET_PRISTINE',
	SET_REDIRECT_URL = 'SET_REDIRECT_URL',
	SET_COMPLETE = 'SET_CHECKOUT_COMPLETE',
	SET_BEFORE_PROCESSING = 'SET_BEFORE_PROCESSING',
	SET_AFTER_PROCESSING = 'SET_AFTER_PROCESSING',
	SET_PROCESSING_RESPONSE = 'SET_PROCESSING_RESPONSE',
	SET_PROCESSING = 'SET_CHECKOUT_IS_PROCESSING',
	SET_HAS_ERROR = 'SET_CHECKOUT_HAS_ERROR',
	SET_NO_ERROR = 'SET_CHECKOUT_NO_ERROR',
	SET_CUSTOMER_ID = 'SET_CHECKOUT_CUSTOMER_ID',
	SET_ORDER_ID = 'SET_CHECKOUT_ORDER_ID',
	SET_ORDER_NOTES = 'SET_CHECKOUT_ORDER_NOTES',
	INCREMENT_CALCULATING = 'INCREMENT_CALCULATING',
	DECREMENT_CALCULATING = 'DECREMENT_CALCULATING',
	SET_SHIPPING_ADDRESS_AS_BILLING_ADDRESS = 'SET_SHIPPING_ADDRESS_AS_BILLING_ADDRESS',
	SET_SHOULD_CREATE_ACCOUNT = 'SET_SHOULD_CREATE_ACCOUNT',
	SET_EXTENSION_DATA = 'SET_EXTENSION_DATA',
}

export interface ActionType {
	type: ACTION;
	data?:
		| Record< string, unknown >
		| Record< string, never >
		| PaymentResultDataType;
	redirectUrl?: string;
	isCart?: boolean;
	hasError?: boolean;
	customerId?: number;
	orderId?: number;
	shouldCreateAccount?: boolean;
	orderNotes?: string;
	extensionData?: Record< string, Record< string, unknown > >;
}

export type CheckoutState = {
	// Status of the checkout
	status: STATUS;
	// When true, means the provider is providing data for the cart.
	isCart: boolean;
	// If any of the totals, taxes, shipping, etc need to be calculated, the count will be increased here
	calculatingCount: number;
	// The result of the payment processing
	processingResponse: PaymentResultDataType | null;
	// True when the checkout is in an error state. Whatever caused the error (validation/payment method) will likely have triggered a notice.
	hasError: boolean;
	// This is the url that checkout will redirect to when it's ready.
	redirectUrl: string;
	// This is the ID for the draft order if one exists.
	orderId: number;
	// Order notes introduced by the user in the checkout form.
	orderNotes: string;
	// This is the ID of the customer the draft order belongs to.
	customerId: number;
	// Should the billing form be hidden and inherit the shipping address?
	useShippingAsBilling: boolean;
	// Should a user account be created?
	shouldCreateAccount: boolean;
	// Custom checkout data passed to the store API on processing.
	extensionData: Record< string, Record< string, unknown > >;
};
