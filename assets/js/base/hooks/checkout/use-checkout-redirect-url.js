/**
 * External dependencies
 */
import {
	useCheckoutContext,
	setRedirectUrl,
} from '@woocommerce/base-context/cart-checkout/checkout-state';

/**
 * Returns redirect url interface from checkout context.
 */
export const useCheckoutRedirectUrl = () => {
	const { redirectUrl, dispatch } = useCheckoutContext();
	const setCheckoutRedirectUrl = ( url ) => {
		setRedirectUrl( dispatch, url );
	};
	return {
		redirectUrl,
		setRedirectUrl: setCheckoutRedirectUrl,
	};
};
