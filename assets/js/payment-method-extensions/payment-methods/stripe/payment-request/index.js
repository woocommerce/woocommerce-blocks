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
const cartData = getSetting( 'cartData', null );

const PaymentRequestPaymentMethod = {
	id: PAYMENT_METHOD_NAME,
	content: <PaymentRequestExpress stripe={ componentStripePromise } />,
	edit: <ApplePayPreview />,
	canMakePayment: canPayStripePromise.then( ( stripe ) => {
		if ( stripe === null || cartData === null ) {
			return false;
		}
		// do a test payment request to check if payment request payment can be
		// done.
		// @todo, initial country and currency needs to server.
		const paymentRequest = stripe.paymentRequest( {
			total: {
				label: 'Test total',
				amount: 1000,
			},
			// eslint-disable-next-line camelcase
			country: cartData?.shipping_address?.country,
			// eslint-disable-next-line camelcase
			currency: cartData?.totals?.currency_code?.toLowerCase(),
		} );
		return paymentRequest.canMakePayment().then( ( result ) => !! result );
	} ),
};

export default PaymentRequestPaymentMethod;
