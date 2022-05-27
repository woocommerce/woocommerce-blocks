/**
 * External dependencies
 */
import { isObject, isString, CheckoutResponse } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import { removeNoticesByStatus } from '../../utils/notices';
import { STATUS } from './constants';
import {
	EMIT_TYPES,
	emitEvent,
	emitEventWithAbort,
} from '../../base/context/providers/cart-checkout/checkout-state/event-emit';

export const processCheckoutResponse = ( response: CheckoutResponse ) => {
	return async ( { dispatch } ) => {
		const paymentResult = getPaymentResultFromCheckoutResponse( response );
		dispatch.setRedirectUrl( paymentResult?.redirectUrl || '' );
		dispatch.setProcessingResponse( paymentResult );
		dispatch.setAfterProcessing();
	};
};

export const emitValidateEvent = (
	observers,
	createErrorNotice,
	setValidationErrors
) => {
	return ( { select, dispatch } ) => {
		const { status } = select.getCheckoutState();
		if ( status === STATUS.BEFORE_PROCESSING ) {
			removeNoticesByStatus( 'error' );
			// checkoutActions.setValidation();
			// Emit the `CHECKOUT_VALIDATION_BEFORE_PROCESSING` event and execute all callbacks
			// associated with that event in priority order. If the callbacks return errors, display them
			// and set the correct status on the checkout data store

			emitEvent(
				observers,
				EMIT_TYPES.CHECKOUT_VALIDATION_BEFORE_PROCESSING,
				{}
			).then( ( response ) => {
				console.log( 'response from event emitter', response );
				if ( response !== true ) {
					if ( Array.isArray( response ) ) {
						response.forEach(
							( { errorMessage, validationErrors } ) => {
								console.log(
									'creating error notice with error message',
									errorMessage
								);
								createErrorNotice( errorMessage, {
									context: 'wc/checkout',
								} );
								setValidationErrors( validationErrors );
							}
						);
					}
					console.log(
						'set validation errors, reseting the checkout'
					);
					dispatch.setIdle();
					dispatch.setHasError();
				} else {
					console.log( 'All good!' );
					dispatch.setProcessing();
				}
			} );
		}
	};
};

const handleErrorResponse = (
	observerResponses: unknown[],
	createErrorNotice
) => {
	let errorResponse = null;
	observerResponses.forEach( ( response ) => {
		if ( isErrorResponse( response ) || isFailResponse( response ) ) {
			if ( response.message && isString( response.message ) ) {
				const errorOptions =
					response.messageContext &&
					isString( response.messageContent )
						? // The `as string` is OK here because of the type guard above.
						  {
								context: response.messageContext as string,
						  }
						: undefined;
				errorResponse = response;
				createErrorNotice( response.message, errorOptions );
			}
		}
	} );
	return errorResponse;
};

// Emit CHECKOUT_AFTER_PROCESSING_WITH_SUCCESS and CHECKOUT_AFTER_PROCESSING_WITH_ERROR events
// and set checkout errors according to the callback responses
export const emitAfterProcessingEvents = ( {
	observers,
	createErrorNotice,
	isSuccessResponse,
	isErrorResponse,
	isFailResponse,
	shouldRetry,
	checkoutNotices,
	paymentNotices,
	expressPaymentNotices,
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
				EMIT_TYPES.CHECKOUT_AFTER_PROCESSING_WITH_ERROR,
				data
			).then( ( observerResponses ) => {
				console.log(
					'Processed all observers for CHECKOUT_AFTER_PROCESSING_WITH_ERROR',
					observerResponses
				);
				const errorResponse = handleErrorResponse(
					observerResponses,
					createErrorNotice
				);
				if ( errorResponse !== null ) {
					// irrecoverable error so set complete
					if ( ! shouldRetry( errorResponse ) ) {
						dispatch.setComplete( errorResponse );
					} else {
						dispatch.setIdle();
					}
				} else {
					const hasErrorNotices =
						checkoutNotices.some(
							( notice: { status: string } ) =>
								notice.status === 'error'
						) ||
						expressPaymentNotices.some(
							( notice: { status: string } ) =>
								notice.status === 'error'
						) ||
						paymentNotices.some(
							( notice: { status: string } ) =>
								notice.status === 'error'
						);
					if ( ! hasErrorNotices ) {
						// no error handling in place by anything so let's fall
						// back to default
						const message =
							data.processingResponse?.message ||
							__(
								'Something went wrong. Please contact us to get assistance.',
								'woo-gutenberg-products-block'
							);
						createErrorNotice( message, {
							id: 'checkout',
							context: 'wc/checkout',
						} );
					}

					dispatch.setIdle();
				}
			} );
		} else {
			emitEventWithAbort(
				observers,
				EMIT_TYPES.CHECKOUT_AFTER_PROCESSING_WITH_SUCCESS,
				data
			).then( ( observerResponses: unknown[] ) => {
				console.log(
					'Processed all observers for CHECKOUT_AFTER_PROCESSING_WITH_SUCCESS',
					observerResponses
				);
				let successResponse = null as null | Record< string, unknown >;
				let errorResponse = null as null | Record< string, unknown >;

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

				if ( successResponse && ! errorResponse ) {
					console.log(
						'complete because we have a successful response'
					);
					// dispatch.setComplete( successResponse );
				} else if ( isObject( errorResponse ) ) {
					if (
						errorResponse.message &&
						isString( errorResponse.message )
					) {
						const errorOptions =
							errorResponse.messageContext &&
							isString( errorResponse.messageContext )
								? {
										context: errorResponse.messageContext,
								  }
								: undefined;
						createErrorNotice(
							errorResponse.message,
							errorOptions
						);
					}
					if ( ! shouldRetry( errorResponse ) ) {
						console.log( "Complete because we shouldn't retry" );
						// dispatch.setComplete( errorResponse );
					} else {
						// this will set an error which will end up
						// triggering the onCheckoutAfterProcessingWithError emitter.
						// and then setting checkout to IDLE state.
						dispatch.setHasError( true );
					}
				} else {
					// nothing hooked in had any response type so let's just consider successful.
					console.log( 'Complete because no observers' );
					// dispatch.setComplete();
				}
			} );
		}
	};
};
