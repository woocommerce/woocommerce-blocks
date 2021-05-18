/**
 * External dependencies
 */
import { useEffect, useRef } from '@wordpress/element';
import isShallowEqual from '@wordpress/is-shallow-equal';

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

	const currentState = useRef( {
		paymentMethods,
		isInitialized: paymentMethodsInitialized,
	} );

	const currentExpressState = useRef( {
		paymentMethods: expressPaymentMethods,
		isInitialized: expressPaymentMethodsInitialized,
	} );

	useEffect( () => {
		if (
			paymentMethodsInitialized !== currentState.current.isInitialized ||
			! isShallowEqual(
				paymentMethods,
				currentState.current.paymentMethods
			)
		) {
			currentState.current = {
				paymentMethods,
				isInitialized: paymentMethodsInitialized,
			};
		}
	}, [ paymentMethods, paymentMethodsInitialized ] );

	useEffect( () => {
		if (
			expressPaymentMethodsInitialized !==
				currentExpressState.current.isInitialized ||
			! isShallowEqual(
				expressPaymentMethods,
				currentExpressState.current.paymentMethods
			)
		) {
			currentExpressState.current = {
				paymentMethods: expressPaymentMethods,
				isInitialized: expressPaymentMethodsInitialized,
			};
		}
	}, [ expressPaymentMethods, expressPaymentMethodsInitialized ] );

	return express ? currentExpressState.current : currentState.current;
};

export const usePaymentMethods = () => usePaymentMethodState();
export const useExpressPaymentMethods = () => usePaymentMethodState( true );
