/**
 * External dependencies
 */
import { useCheckoutContext } from '@woocommerce/base-context/checkout-context';
import { useEffect } from '@wordpress/element';
import { getPaymentMethods } from '@woocommerce/blocks-registry';

const useActivePaymentMethod = () => {
	const {
		activePaymentMethod,
		setActivePaymentMethod,
	} = useCheckoutContext();
	// if payment method has not been set yet, let's set it.
	useEffect( () => {
		if ( ! activePaymentMethod && activePaymentMethod !== null ) {
			const paymentMethods = getPaymentMethods();
			const paymentMethodSlugs = Object.keys( paymentMethods );
			setActivePaymentMethod(
				paymentMethodSlugs.length > 0
					? paymentMethods[ paymentMethodSlugs[ 0 ] ].name
					: null
			);
		}
	}, [ activePaymentMethod, setActivePaymentMethod ] );
	return { activePaymentMethod, setActivePaymentMethod };
};

export default useActivePaymentMethod;
