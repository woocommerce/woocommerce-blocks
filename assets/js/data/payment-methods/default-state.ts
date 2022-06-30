/**
 * External dependencies
 */
import type { EmptyObjectType } from '@woocommerce/types';
import { getSetting } from '@woocommerce/settings';

/**
 * Internal dependencies
 */
import { SavedPaymentMethod } from './types';
import { STATUS as PAYMENT_METHOD_STATUS } from '../../base/context/providers/cart-checkout/payment-methods/constants';

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
	activePaymentMethod: string;
	activeSavedToken: string;
	// Avilable payment methods are payment methods which have been validaed and can make payment
	availablePaymentMethods: string[];
	availableExpressPaymentMethods: string[];
	savedPaymentMethods:
		| Record< string, SavedPaymentMethod[] >
		| EmptyObjectType;
	paymentMethodData: Record< string, unknown >;
	paymentMethodsInitialized: boolean;
	expressPaymentMethodsInitialized: boolean;
	shouldSavePaymentMethod: boolean;
	isExpressPaymentMethodActive: boolean;
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
	activePaymentMethod: '',
	activeSavedToken: '',
	availablePaymentMethods: [],
	availableExpressPaymentMethods: [],
	savedPaymentMethods: getSetting<
		Record< string, SavedPaymentMethod[] > | EmptyObjectType
	>( 'customerPaymentMethods', {} ),
	paymentMethodData: {},
	paymentMethodsInitialized: false,
	expressPaymentMethodsInitialized: false,
	shouldSavePaymentMethod: false,
	isExpressPaymentMethodActive: false,
};
