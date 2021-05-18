/**
 * External dependencies
 */
import { useShallowEqual } from '@woocommerce/base-hooks';

/**
 * Internal dependencies
 */
import { usePaymentMethodDataContext } from '../../providers/cart-checkout/payment-methods';

const usePaymentMethodState = ( express = false ) => {
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
	const currentPaymentMethodsInitialized = useShallowEqual(
		paymentMethodsInitialized
	);
	const currentExpressPaymentMethodsInitialized = useShallowEqual(
		expressPaymentMethodsInitialized
	);

	return {
		paymentMethods: express
			? currentExpressPaymentMethods
			: currentPaymentMethods,
		isInitialized: express
			? currentExpressPaymentMethodsInitialized
			: currentPaymentMethodsInitialized,
	};
};

export const usePaymentMethods = () => usePaymentMethodState();
export const useExpressPaymentMethods = () => usePaymentMethodState( true );
