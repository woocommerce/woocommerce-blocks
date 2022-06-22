/**
 * External dependencies
 */
import {
	PaymentMethods,
	ExpressPaymentMethods,
} from '@woocommerce/type-defs/payments';
import type {
	EmptyObjectType,
	ObjectType,
} from '@woocommerce/type-defs/objects';
/**
 * Internal dependencies
 */
import type { emitterCallback } from '../../base/context/event-emit';

export interface CustomerPaymentMethodConfiguration {
	gateway: string;
	brand: string;
	last4: string;
}
export interface CustomerPaymentMethod {
	method: CustomerPaymentMethodConfiguration;
	expires: string;
	is_default: boolean;
	tokenId: number;
	actions: ObjectType;
}
export type CustomerPaymentMethods =
	| Record< string, CustomerPaymentMethod[] >
	| EmptyObjectType;

export interface PaymentMethodDispatchers {
	setRegisteredPaymentMethods: ( paymentMethods: PaymentMethods ) => void;
	setRegisteredExpressPaymentMethods: (
		paymentMethods: ExpressPaymentMethods
	) => void;
	setActivePaymentMethod: (
		paymentMethod: string,
		paymentMethodData?: ObjectType | EmptyObjectType
	) => void;
}

export interface PaymentStatusDispatchers {
	pristine: () => void;
	started: () => void;
	processing: () => void;
	error: ( error: string ) => void;
	failed: (
		error?: string,
		paymentMethodData?: ObjectType | EmptyObjectType,
		billingData?: ObjectType | EmptyObjectType
	) => void;
	success: (
		paymentMethodData?: ObjectType | EmptyObjectType,
		billingData?: ObjectType | EmptyObjectType,
		shippingData?: ObjectType | EmptyObjectType
	) => void;
}

export type PaymentMethodCurrentStatusType = {
	// If true then the payment method state in checkout is pristine.
	isPristine: boolean;
	// If true then the payment method has been initialized and has started.
	isStarted: boolean;
	// If true then the payment method is processing payment.
	isProcessing: boolean;
	// If true then the payment method is in a finished state (which may mean it's status is either error, failed, or success).
	isFinished: boolean;
	// If true then the payment method is in an error state.
	hasError: boolean;
	// If true then the payment method has failed (usually indicates a problem with the payment method used, not logic error).
	hasFailed: boolean;
	// If true then the payment method has completed it's processing successfully.
	isSuccessful: boolean;
	// If true, an express payment is in progress.
	isDoingExpressPayment: boolean;
};

export type PaymentMethodDataContextType = {
	// Returns the customer payment for the customer if it exists.
	customerPaymentMethods: CustomerPaymentMethods;
	// Event registration callback for registering observers for the payment processing event.
	onPaymentProcessing: ReturnType< typeof emitterCallback >;
	// A function used by express payment methods to indicate an error for checkout to handle. It receives an error message string. Does not change payment status.
	setExpressPaymentError: ( error: string ) => void;
};

export type PaymentMethodsDispatcherType = (
	paymentMethods: PaymentMethods
) => undefined;
