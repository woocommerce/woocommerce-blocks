/**
 * External dependencies
 */
import { getSetting } from '@woocommerce/settings';

/**
 * Internal dependencies
 */
import { PAYMENT_METHOD_NAME } from './constants';
import { PaymentRequestExpress } from './payment-request-express';
import { applePayImage } from './apple-pay-preview';
import { loadStripe } from '../stripe-utils';

const ApplePayPreview = () => <img src={ applePayImage } alt="" />;

const canPayStripePromise = loadStripe();
const componentStripePromise = loadStripe();

let apiInitialized = false,
	canPay = false;

// Initialise stripe API client and determine if payment method can be used
// in current environment (e.g. geo + shopper has payment settings configured).
function paymentRequestAvailable( currencyCode ) {
	// If we've already initialised, return the cached results.
	if ( apiInitialized ) {
		return canPay;
	}

	return canPayStripePromise.then( ( stripe ) => {
		if ( stripe === null ) {
			return false;
		}
		// Do a test payment to confirm if payment method is available.
		const paymentRequest = stripe.paymentRequest( {
			total: {
				label: 'Test total',
				amount: 1000,
			},
			country: getSetting( 'baseLocation', {} )?.country,
			currency: currencyCode,
		} );
		return paymentRequest.canMakePayment().then( ( result ) => {
			canPay = !! result;
			apiInitialized = true;
			return canPay;
		} );
	} );
}

const PaymentRequestPaymentMethod = {
	name: PAYMENT_METHOD_NAME,
	content: <PaymentRequestExpress stripe={ componentStripePromise } />,
	edit: <ApplePayPreview />,
	canMakePayment: ( cartData ) =>
		paymentRequestAvailable(
			// eslint-disable-next-line camelcase
			cartData?.cartTotals?.currency_code?.toLowerCase()
		),
	paymentMethodId: 'stripe',
};

export default PaymentRequestPaymentMethod;
