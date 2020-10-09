/**
 * External dependencies
 */
import { useEffect, useState } from '@wordpress/element';

/**
 * @typedef {import('@woocommerce/type-defs/registered-payment-method-props').EmitResponseProps} EmitResponseProps
 * @typedef {import('../stripe-utils/type-defs').Stripe} Stripe
 */

/**
 * Opens the modal for PaymentIntent authorizations.
 *
 * @param {Object}           params                Params object.
 * @param {Stripe}           params.stripe         The stripe object.
 * @param {Object}           params.paymentDetails The payment details from the
 *                                                 server after checkout processing.
 * @param {string}           params.errorContext   Context where errors will be added.
 * @param {string}           params.errorType      Type of error responses.
 * @param {string}           params.successType    Type of success responses.
 */
const openIntentModal = ( {
	stripe,
	paymentDetails,
	errorContext,
	errorType,
	successType,
} ) => {
	const checkoutResponse = { type: successType };
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
		.then( function ( response ) {
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
		.catch( function ( error ) {
			checkoutResponse.type = errorType;
			checkoutResponse.message = error.message;
			checkoutResponse.retry = true;
			checkoutResponse.messageContext = errorContext;
			// Reports back to the server.
			window.fetch( verificationUrl + '&is_ajax' );
			return checkoutResponse;
		} );
};

export const usePaymentIntents = (
	stripe,
	onCheckoutAfterProcessingWithSuccess,
	onCheckoutAfterProcessingWithError,
	setSourceId,
	emitResponse
) => {
	const [ error, setError ] = useState( null );
	useEffect( () => {
		const unsubscribe = onCheckoutAfterProcessingWithSuccess(
			async ( { processingResponse } ) => {
				const paymentDetails = processingResponse.paymentDetails || {};
				const response = await openIntentModal( {
					stripe,
					paymentDetails,
					errorContext: emitResponse.noticeContexts.PAYMENTS,
					errorType: emitResponse.responseTypes.ERROR,
					successType: emitResponse.responseTypes.SUCCESS,
				} );
				if (
					response.type === emitResponse.responseTypes.ERROR &&
					response.retry
				) {
					setError( {
						type: response.type,
						message: response.message,
						retry: response.retry,
						messageContext: response.messageContext,
					} );
					setSourceId( '0' );
					return { type: response.type, retry: response.retry };
				}

				setError( null );
				return response;
			}
		);
		return () => unsubscribe();
	}, [
		onCheckoutAfterProcessingWithSuccess,
		emitResponse.noticeContexts.PAYMENTS,
		emitResponse.responseTypes.ERROR,
		emitResponse.responseTypes.SUCCESS,
		setError,
		setSourceId,
		stripe,
	] );

	useEffect( () => {
		const unsubscribe = onCheckoutAfterProcessingWithError( () => {
			if ( error ) {
				return error;
			}
			return true;
		} );
		return () => unsubscribe();
	}, [ error, onCheckoutAfterProcessingWithError ] );
};
