/**
 * External dependencies
 */
import { useEffect } from '@wordpress/element';

/**
 * Opens the modal for PaymentIntent authorizations.
 *
 * @param {import('../stripe-utils/type-defs').Stripe} stripe The stripe object.
 * @param {Object} paymentDetails The payment details from the server after
 *                                checkout processing.
 *
 * @return {Object} A response object for checkout. Note. This also makes an
 *                  ajax request to the server that will result in a
 *                  redirect.
 */
const openIntentModal = ( stripe, paymentDetails ) => {
	const checkoutResponse = { type: 'success' };
	if (
		! paymentDetails.setup_intent &&
		! paymentDetails.payment_intent_secret
	) {
		return checkoutResponse;
	}
	const isSetupIntent = !! paymentDetails.setupIntent;
	const verificationUrl = paymentDetails.verification_endpoint;
	const intentSecret = isSetupIntent
		? paymentDetails.setup_intent
		: paymentDetails.payment_intent_secret;
	return stripe[ isSetupIntent ? 'confirmCardSetup' : 'confirmCardPayment' ](
		intentSecret
	)
		.then( function( response ) {
			if ( response.error ) {
				throw response.error;
			}
			const intent =
				response[ isSetupIntent ? 'setupIntent' : 'paymentIntent' ];
			if (
				intent.status !== 'requires_capture' &&
				intent.status !== 'succeeded'
			) {
				return checkoutResponse;
			}
			checkoutResponse.redirectUrl = verificationUrl;
			return checkoutResponse;
		} )
		.catch( function() {
			// Reports back to the server and the server will redirect.
			window.fetch( verificationUrl + '&is_ajax' );
		} );
};

export const usePaymentIntents = ( stripe, subscriber ) => {
	useEffect( () => {
		const unsubscribe = subscriber( ( { processingResponse } ) => {
			const paymentDetails = processingResponse.paymentDetails || {};
			return openIntentModal( stripe, paymentDetails );
		} );
		return () => unsubscribe();
	}, [ subscriber, stripe ] );
};
