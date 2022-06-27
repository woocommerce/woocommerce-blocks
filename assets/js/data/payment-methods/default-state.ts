/**
 * External dependencies
 */
import type { EmptyObjectType } from '@woocommerce/types';
import { getSetting } from '@woocommerce/settings';
import {
	PaymentMethods,
	ExpressPaymentMethods,
} from '@woocommerce/type-defs/payments';

/**
 * Internal dependencies
 */
import { CustomerPaymentMethod } from './types';
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
	errorMessage: string;
	activePaymentMethod: string;
	activeSavedToken: string;
	registeredPaymentMethods: PaymentMethods;
	registeredExpressPaymentMethods: ExpressPaymentMethods;
	availablePaymentMethods: string[];
	availableExpressPaymentMethods: string[];
	paymentMethodData: Record< string, unknown >;
	paymentMethodsInitialized: boolean;
	expressPaymentMethodsInitialized: boolean;
	shouldSavePaymentMethod: boolean;
	isExpressPaymentMethodActive: boolean;
	customerPaymentMethods:
		| Record< string, CustomerPaymentMethod[] >
		| EmptyObjectType;
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
	customerPaymentMethods: getSetting<
		Record< string, CustomerPaymentMethod[] > | EmptyObjectType
	>( 'customerPaymentMethods', {} ),
	registeredPaymentMethods: {},
	registeredExpressPaymentMethods: {},
	availablePaymentMethods: [],
	availableExpressPaymentMethods: [],
	paymentMethodData: {},
	paymentMethodsInitialized: false,
	expressPaymentMethodsInitialized: false,
	isExpressPaymentMethodActive: false,
	shouldSavePaymentMethod: false,
	errorMessage: '',
	activePaymentMethod: '',
	activeSavedToken: '',
};
