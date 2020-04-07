/**
 * Internal dependencies
 */
import { PAYMENT_METHOD_NAME } from './constants';
import { PaymentRequestExpress } from './payment-request-express';
import { applePayImage } from './apple-pay-preview';
import { loadStripe } from '../stripe-utils';

const ApplePayPreview = () => <img src={ applePayImage } alt="" />;

const stripePromise = loadStripe();

const PaymentRequestPaymentMethod = {
	id: PAYMENT_METHOD_NAME,
	content: <PaymentRequestExpress stripe={ stripePromise } />,
	edit: <ApplePayPreview />,
	canMakePayment: stripePromise.then( ( stripe ) => {
		if ( stripe === null ) {
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
			country: 'CA',
			currency: 'cad',
		} );
		return paymentRequest.canMakePayment().then( ( result ) => {
			if ( result ) {
				return true;
			}
			return false;
		} );
	} ),
};

export default PaymentRequestPaymentMethod;
