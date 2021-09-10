/**
 * External dependencies
 */
import { useShallowEqual } from '@woocommerce/base-hooks';
import {
	PaymentMethods,
	ExpressPaymentMethods,
} from '@woocommerce/type-defs/payments';
/**
 * Internal dependencies
 */
import { usePaymentMethodDataContext } from '../../providers/cart-checkout/payment-methods';

export type EmptyObjectType = Record< string, never >;
interface UsePaymentMethodStateReturnType {
	paymentMethods: PaymentMethods | EmptyObjectType;
	isInitialized: boolean;
}
interface UseExpressPaymentMethodStateReturnType {
	paymentMethods: ExpressPaymentMethods | EmptyObjectType;
	isInitialized: boolean;
}

const usePaymentMethodState = (
	express = false
): UsePaymentMethodStateReturnType => {
	const {
		paymentMethods,
		expressPaymentMethods,
		paymentMethodsInitialized,
		expressPaymentMethodsInitialized,
	} = usePaymentMethodDataContext();

	const currentPaymentMethods = useShallowEqual( paymentMethods );
	const currentExpressPaymentMethods = useShallowEqual(
		expressPaymentMethods
	);

	return {
		paymentMethods: express
			? currentExpressPaymentMethods
			: currentPaymentMethods,
		isInitialized: express
			? expressPaymentMethodsInitialized
			: paymentMethodsInitialized,
	};
};

export const usePaymentMethods = (): UsePaymentMethodStateReturnType =>
	usePaymentMethodState();
export const useExpressPaymentMethods = (): UseExpressPaymentMethodStateReturnType =>
	usePaymentMethodState( true );
