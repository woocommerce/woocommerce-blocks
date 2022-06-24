/**
 * Internal dependencies
 */
import { useEmitResponse } from '../../base/context/hooks/use-emit-response';
import { emitEventWithAbort } from '../../base/context/event-emit';
import { EMIT_TYPES } from '../../base/context/providers/cart-checkout/payment-methods/event-emit';
import type { emitProcessingEventType } from './types';
import { CART_STORE_KEY } from '../cart';

const { isErrorResponse, isFailResponse, isSuccessResponse, noticeContexts } =
	useEmitResponse(); // eslint-disable-line react-hooks/rules-of-hooks

// TODO: `useEmitResponse` is not a react hook, it just exposes some functions as
// properties of an object. Refactor this to not be a hook, we could simply import
// those functions where needed

/**
 * Emit the payment_processing event
 */
export const emitProcessingEvent: emitProcessingEventType = (
	currentObserver,
	setValidationErrors
) => {
	// TODO: Fix this type after we move to validation store
	return ( { dispatch, registry } ) => {
		const { createErrorNotice, removeNotice } =
			registry.dispatch( 'core/notices' );
		removeNotice( 'wc-payment-error', noticeContexts.PAYMENTS );
		emitEventWithAbort(
			// TODO Move all this block into a function in thunks & Create buttons to trigger this event (see Alex's PR)
			currentObserver,
			EMIT_TYPES.PAYMENT_PROCESSING,
			{}
		).then( ( observerResponses ) => {
			let successResponse, errorResponse;
			observerResponses.forEach( ( response ) => {
				if ( isSuccessResponse( response ) ) {
					// the last observer response always "wins" for success.
					successResponse = response;
				}
				if (
					isErrorResponse( response ) ||
					isFailResponse( response )
				) {
					errorResponse = response;
				}
			} );

			const { setBillingAddress, setShippingAddress } =
				registry.dispatch( CART_STORE_KEY );

			if ( successResponse && ! errorResponse ) {
				const { paymentMethodData, billingData, shippingData } =
					successResponse?.meta || {};

				if ( billingData ) {
					setBillingAddress( billingData );
				}
				if (
					typeof shippingData !== undefined &&
					shippingData?.address
				) {
					setShippingAddress(
						shippingData.address as Record< string, unknown >
					);
				}
				dispatch.setPaymentMethodData( paymentMethodData );
				dispatch.setPaymentStatus( {
					isSuccessful: true,
				} );
			} else if ( errorResponse && isFailResponse( errorResponse ) ) {
				if ( errorResponse.message && errorResponse.message.length ) {
					createErrorNotice( errorResponse.message, {
						id: 'wc-payment-error',
						isDismissible: false,
						context:
							errorResponse?.messageContext ||
							noticeContexts.PAYMENTS,
					} );
				}

				const { paymentMethodData, billingData } =
					errorResponse?.meta || {};

				if ( billingData ) {
					setBillingAddress( billingData );
				}
				dispatch.setPaymentStatus(
					{ hasFailed: true },
					errorResponse?.message || '',
					paymentMethodData
				);
			} else if ( errorResponse ) {
				if ( errorResponse.message && errorResponse.message.length ) {
					createErrorNotice( errorResponse.message, {
						id: 'wc-payment-error',
						isDismissible: false,
						context:
							errorResponse?.messageContext ||
							noticeContexts.PAYMENTS,
					} );
				}

				dispatch.setPaymentStatus(
					{ hasError: true },
					errorResponse.message
				);
				setValidationErrors( errorResponse?.validationErrors );
			} else {
				// otherwise there are no payment methods doing anything so
				// just consider success
				dispatch.setPaymentStatus( {
					isSuccessful: true,
				} );
			}
		} );
	};
};
