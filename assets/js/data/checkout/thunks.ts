/**
 * External dependencies
 */
import { CheckoutResponse } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import { removeNoticesByStatus } from '../../utils/notices';
import {
	getPaymentResultFromCheckoutResponse,
	runCheckoutAfterProcessingWithErrorObservers,
	runCheckoutAfterProcessingWithSuccessObservers,
} from './utils';
import {
	EVENTS,
	emitEvent,
	emitEventWithAbort,
} from '../../base/context/providers/cart-checkout/checkout-events/event-emit';
import type { CheckoutActions } from './actions';
import { emitValidateEventType, emitAfterProcessingEventsType } from './types';

/**
 * Based on the result of the payment, update the redirect url,
 * set the payment processing response in the checkout data store
 * and change the status to AFTER_PROCESSING
 */
export const processCheckoutResponse = ( response: CheckoutResponse ) => {
	return async ( { dispatch }: { dispatch: CheckoutActions } ) => {
		const paymentResult = getPaymentResultFromCheckoutResponse( response );
		dispatch.setRedirectUrl( paymentResult?.redirectUrl || '' );
		dispatch.setProcessingResponse( paymentResult );
		dispatch.setAfterProcessing();
	};
};

/**
 * Emit the VALIDATION_BEFORE_PROCESSING event and process all
 * registered observers
 */
export const emitValidateEvent: emitValidateEventType = ( {
	observers,
	createErrorNotice,
	setValidationErrors, // TODO: Fix this type after we move to validation store
} ) => {
	return ( { dispatch } ) => {
		removeNoticesByStatus( 'error' );
		emitEvent( observers, EVENTS.VALIDATION_BEFORE_PROCESSING, {} ).then(
			( response ) => {
				if ( response !== true ) {
					if ( Array.isArray( response ) ) {
						response.forEach(
							( { errorMessage, validationErrors } ) => {
								createErrorNotice( errorMessage, {
									context: 'wc/checkout',
								} );
								setValidationErrors( validationErrors );
							}
						);
					}
					dispatch.setIdle();
					dispatch.setHasError();
				} else {
					dispatch.setProcessing();
				}
			}
		);
	};
};

/**
 * Emit the AFTER_PROCESSING_WITH_ERROR if the checkout contains an error,
 * or the AFTER_PROCESSING_WITH_SUCCESS if not. Set checkout errors according
 * to the observer responses
 */
export const emitAfterProcessingEvents: emitAfterProcessingEventsType = ( {
	observers,
	createErrorNotice,
	notices,
} ) => {
	return ( { select, dispatch } ) => {
		const state = select.getCheckoutState();
		const data = {
			redirectUrl: state.redirectUrl,
			orderId: state.orderId,
			customerId: state.customerId,
			orderNotes: state.orderNotes,
			processingResponse: state.processingResponse,
		};
		if ( state.hasError ) {
			// allow payment methods or other things to customize the error
			// with a fallback if nothing customizes it.
			emitEventWithAbort(
				observers,
				EVENTS.AFTER_PROCESSING_WITH_ERROR,
				data
			).then( ( observerResponses ) => {
				runCheckoutAfterProcessingWithErrorObservers( {
					observerResponses,
					createErrorNotice,
					notices,
					dispatch,
					data,
				} );
			} );
		} else {
			emitEventWithAbort(
				observers,
				EVENTS.AFTER_PROCESSING_WITH_SUCCESS,
				data
			).then( ( observerResponses: unknown[] ) => {
				runCheckoutAfterProcessingWithSuccessObservers( {
					observerResponses,
					createErrorNotice,
					dispatch,
				} );
			} );
		}
	};
};
