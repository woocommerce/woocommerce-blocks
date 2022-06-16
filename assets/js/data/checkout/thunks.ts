/**
 * External dependencies
 */
import type { CheckoutResponse } from '@woocommerce/types';
import { dispatch as wpDataDispatch } from '@wordpress/data';

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
import type {
	emitValidateEventType,
	emitAfterProcessingEventsType,
} from './types';
import type { DispatchFromMap, SelectFromMap } from '../mapped-types';
import * as actions from './actions';
import * as selectors from './selectors';

const { createErrorNotice } = wpDataDispatch( 'core/notices' );

/**
 * Based on the result of the payment, update the redirect url,
 * set the payment processing response in the checkout data store
 * and change the status to AFTER_PROCESSING
 */
export const processCheckoutResponse = ( response: CheckoutResponse ) => {
	return ( {
		dispatch,
	}: {
		dispatch: DispatchFromMap< typeof actions >;
	} ) => {
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
	setValidationErrors, // TODO: Fix this type after we move to validation store
} ) => {
	return ( {
		dispatch,
	}: {
		dispatch: DispatchFromMap< typeof actions >;
	} ) => {
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
	notices,
} ) => {
	return ( {
		select,
		dispatch,
	}: {
		select: SelectFromMap< typeof selectors >;
		dispatch: DispatchFromMap< typeof actions >;
	} ) => {
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
					dispatch,
				} );
			} );
		}
	};
};
