/**
 * External dependencies
 */
import { isString, isObject } from '@woocommerce/types';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { useEmitResponse } from '../../base/context/hooks/use-emit-response';

const {
	isErrorResponse,
	isFailResponse,
	isSuccessResponse,
	shouldRetry,
} = useEmitResponse(); // eslint-disable-line react-hooks/rules-of-hooks

// TODO: `useEmitResponse` is not a react hook, it just exposes some functions as
// properties of an object. Refactor this to not be a hook, we could simply import
// those functions where needed

export const handleErrorResponse = ( {
	observerResponses,
	createErrorNotice,
} ) => {
	let errorResponse = null;
	observerResponses.forEach( ( response ) => {
		if ( isErrorResponse( response ) || isFailResponse( response ) ) {
			if ( response.message && isString( response.message ) ) {
				const errorOptions =
					response.messageContext &&
					isString( response.messageContext )
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

export const processCheckoutAfterProcessingWithErrorObservers = ( {
	observerResponses,
	createErrorNotice,
	notices,
	dispatch,
	data,
} ) => {
	console.log( 'processing observers for CheckoutAfterProcessingWithError' );
	const errorResponse = handleErrorResponse( {
		observerResponses,
		createErrorNotice,
	} );

	if ( errorResponse !== null ) {
		// irrecoverable error so set complete
		if ( ! shouldRetry( errorResponse ) ) {
			dispatch.setComplete( errorResponse );
		} else {
			dispatch.setIdle();
		}
	} else {
		const hasErrorNotices =
			notices.checkoutNotices.some(
				( notice: { status: string } ) => notice.status === 'error'
			) ||
			notices.expressPaymentNotices.some(
				( notice: { status: string } ) => notice.status === 'error'
			) ||
			notices.paymentNotices.some(
				( notice: { status: string } ) => notice.status === 'error'
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
};

export const processCheckoutAfterProcessingWithSuccessObservers = ( {
	observerResponses,
	createErrorNotice,
	dispatch,
} ) => {
	console.log(
		'processing observers for CheckoutAfterProcessingWithSuccess'
	);
	let successResponse = null as null | Record< string, unknown >;
	let errorResponse = null as null | Record< string, unknown >;

	observerResponses.forEach( ( response ) => {
		if ( isSuccessResponse( response ) ) {
			// the last observer response always "wins" for success.
			successResponse = response;
		}

		if ( isErrorResponse( response ) || isFailResponse( response ) ) {
			errorResponse = response;
		}
	} );

	if ( successResponse && ! errorResponse ) {
		dispatch.setComplete( successResponse );
	} else if ( isObject( errorResponse ) ) {
		if ( errorResponse.message && isString( errorResponse.message ) ) {
			const errorOptions =
				errorResponse.messageContext &&
				isString( errorResponse.messageContext )
					? {
							context: errorResponse.messageContext,
					  }
					: undefined;
			createErrorNotice( errorResponse.message, errorOptions );
		}
		if ( ! shouldRetry( errorResponse ) ) {
			dispatch.setComplete( errorResponse );
		} else {
			// this will set an error which will end up
			// triggering the onCheckoutAfterProcessingWithError emitter.
			// and then setting checkout to IDLE state.
			console.log( 'setHasError()' );
			dispatch.setHasError( true );
		}
	} else {
		// nothing hooked in had any response type so let's just consider successful.
		console.log( 'set Complete()' );
		dispatch.setComplete();
	}
};
