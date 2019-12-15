/**
 * External dependencies
 */
import useCheckoutContext from '@woocommerce/base-context/checkout-context';

export const useCheckoutEvents = () => {
	const {
		checkoutComplete,
		setCheckoutComplete,
		checkoutHasError,
		setCheckoutHasError,
		isCalculating,
		setIsCalculating,
	} = useCheckoutContext();
	const setHasError = () => {
		setCheckoutHasError( true );
	};
	const cancelCheckoutError = () => {
		setCheckoutHasError( false );
	};
	const setComplete = () => {
		cancelCheckoutError();
		setCheckoutComplete( true );
	};
	const setCalculating = () => {
		setIsCalculating( true );
	};
	const cancelCalculating = () => {
		setIsCalculating( false );
	};
	return {
		setCheckoutComplete: setComplete,
		setCheckoutHasError: setHasError,
		cancelCheckoutError,
		setIsCalculating: setCalculating,
		cancelCalculating,
		isCalculating,
		checkoutComplete,
		checkoutHasError,
	};
};
