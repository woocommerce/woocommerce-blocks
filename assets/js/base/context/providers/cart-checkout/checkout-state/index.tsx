/**
 * External dependencies
 */

import {
	createContext,
	useContext,
	useReducer,
	useRef,
	useMemo,
	useEffect,
	useCallback,
} from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { usePrevious } from '@woocommerce/base-hooks';
import deprecated from '@wordpress/deprecated';
import { isObject, isString } from '@woocommerce/types';
import { useDispatch, useSelect } from '@wordpress/data';
import { CHECKOUT_STORE_KEY } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import { getPaymentResultFromCheckoutResponse } from './utils';
import { STATUS, DEFAULT_CHECKOUT_STATE_DATA } from './constants';
import type {
	CheckoutStateDispatchActions,
	CheckoutStateContextType,
} from './types';
import {
	EMIT_TYPES,
	useEventEmitters,
	emitEvent,
	emitEventWithAbort,
	reducer as emitReducer,
} from './event-emit';
import { useValidationContext } from '../../validation';
import { useStoreEvents } from '../../../hooks/use-store-events';
import { useCheckoutNotices } from '../../../hooks/use-checkout-notices';
import { useEmitResponse } from '../../../hooks/use-emit-response';
import { removeNoticesByStatus } from '../../../../../utils/notices';
import { CheckoutState } from '../../../../../data/checkout/types';

/**
 * @typedef {import('@woocommerce/type-defs/contexts').CheckoutDataContext} CheckoutDataContext
 */

const CheckoutContext = createContext( DEFAULT_CHECKOUT_STATE_DATA );

export const useCheckoutContext = (): CheckoutStateContextType => {
	return useContext( CheckoutContext );
};

/**
 * Checkout state provider
 * This provides an API interface exposing checkout state for use with cart or checkout blocks.
 *
 * @param {Object}  props             Incoming props for the provider.
 * @param {Object}  props.children    The children being wrapped.
 * @param {string}  props.redirectUrl Initialize what the checkout will redirect to after successful submit.
 * @param {boolean} props.isCart      If context provider is being used in cart context.
 */
export const CheckoutStateProvider = ( {
	children,
	redirectUrl,
	isCart = false,
}: {
	children: React.ReactChildren;
	redirectUrl: string;
	isCart: boolean;
} ): JSX.Element => {
	const actions = useDispatch( CHECKOUT_STORE_KEY );
	actions.setRedirectUrl( redirectUrl );
	const checkoutState: CheckoutState = useSelect( ( select ) =>
		select( CHECKOUT_STORE_KEY ).getCheckoutState()
	);
	const { setValidationErrors } = useValidationContext();
	const { createErrorNotice } = useDispatch( 'core/notices' );

	const { dispatchCheckoutEvent } = useStoreEvents();
	const isCalculating = checkoutState.calculatingCount > 0;
	const {
		isSuccessResponse,
		isErrorResponse,
		isFailResponse,
		shouldRetry,
	} = useEmitResponse();
	const {
		checkoutNotices,
		paymentNotices,
		expressPaymentNotices,
	} = useCheckoutNotices();

	const [ observers, observerDispatch ] = useReducer( emitReducer, {} );
	const currentObservers = useRef( observers );
	const {
		onCheckoutAfterProcessingWithSuccess,
		onCheckoutAfterProcessingWithError,
		onCheckoutValidationBeforeProcessing,
	} = useEventEmitters( observerDispatch );

	// set observers on ref so it's always current.
	useEffect( () => {
		currentObservers.current = observers;
	}, [ observers ] );

	/**
	 * @deprecated use onCheckoutValidationBeforeProcessing instead
	 *
	 * To prevent the deprecation message being shown at render time
	 * we need an extra function between useMemo and event emitters
	 * so that the deprecated message gets shown only at invocation time.
	 * (useMemo calls the passed function at render time)
	 * See: https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/4039/commits/a502d1be8828848270993264c64220731b0ae181
	 */
	const onCheckoutBeforeProcessing = useMemo( () => {
		return function (
			...args: Parameters< typeof onCheckoutValidationBeforeProcessing >
		) {
			deprecated( 'onCheckoutBeforeProcessing', {
				alternative: 'onCheckoutValidationBeforeProcessing',
				plugin: 'WooCommerce Blocks',
			} );
			return onCheckoutValidationBeforeProcessing( ...args );
		};
	}, [ onCheckoutValidationBeforeProcessing ] );

	const dispatchActions = useMemo(
		(): CheckoutStateDispatchActions => ( {
			resetCheckout: () => void actions.setPristine(),
			setRedirectUrl: ( url ) => void actions.setRedirectUrl( url ),
			setHasError: ( hasError ) => void actions.setHasError( hasError ),
			incrementCalculating: () => void actions.incrementCalculating(),
			decrementCalculating: () => void actions.decrementCalculating(),
			setCustomerId: ( id ) => void actions.setCustomerId( id ),
			setOrderId: ( orderId ) => void actions.setOrderId( orderId ),
			setOrderNotes: ( orderNotes ) =>
				void actions.setOrderNotes( orderNotes ),
			setExtensionData: ( extensionData ) =>
				void actions.setExtensionData( extensionData ),
			setAfterProcessing: ( response ) => {
				const paymentResult = getPaymentResultFromCheckoutResponse(
					response
				);
				actions.setRedirectUrl( paymentResult?.redirectUrl || '' );
				actions.setProcessingResponse( paymentResult );
				actions.setAfterProcessing();
			},
		} ),
		[ actions ]
	);

	// emit events.
	useEffect( () => {
		const status = checkoutState.status;
		if ( status === STATUS.BEFORE_PROCESSING ) {
			removeNoticesByStatus( 'error' );
			emitEvent(
				currentObservers.current,
				EMIT_TYPES.CHECKOUT_VALIDATION_BEFORE_PROCESSING,
				{}
			).then( ( response ) => {
				if ( response !== true ) {
					if ( Array.isArray( response ) ) {
						response.forEach(
							( { errorMessage, validationErrors } ) => {
								createErrorNotice( errorMessage );
								setValidationErrors( validationErrors );
							}
						);
					}
					actions.setIdle();
					actions.setHasError();
				} else {
					actions.setProcessing();
				}
			} );
		}
	}, [
		checkoutState.status,
		setValidationErrors,
		createErrorNotice,
		actions,
	] );

	const previousStatus = usePrevious( checkoutState.status );
	const previousHasError = usePrevious( checkoutState.hasError );

	useEffect( () => {
		if (
			checkoutState.status === previousStatus &&
			checkoutState.hasError === previousHasError
		) {
			return;
		}

		const handleErrorResponse = ( observerResponses: unknown[] ) => {
			let errorResponse = null;
			observerResponses.forEach( ( response ) => {
				if (
					isErrorResponse( response ) ||
					isFailResponse( response )
				) {
					if ( response.message && isString( response.message ) ) {
						const errorOptions =
							response.messageContext &&
							isString( response.messageContent )
								? // The `as string` is OK here because of the type guard above.
								  { context: response.messageContext as string }
								: undefined;
						errorResponse = response;
						createErrorNotice( response.message, errorOptions );
					}
				}
			} );
			return errorResponse;
		};

		if ( checkoutState.status === STATUS.AFTER_PROCESSING ) {
			const data = {
				redirectUrl: checkoutState.redirectUrl,
				orderId: checkoutState.orderId,
				customerId: checkoutState.customerId,
				orderNotes: checkoutState.orderNotes,
				processingResponse: checkoutState.processingResponse,
			};
			if ( checkoutState.hasError ) {
				// allow payment methods or other things to customize the error
				// with a fallback if nothing customizes it.
				emitEventWithAbort(
					currentObservers.current,
					EMIT_TYPES.CHECKOUT_AFTER_PROCESSING_WITH_ERROR,
					data
				).then( ( observerResponses ) => {
					const errorResponse = handleErrorResponse(
						observerResponses
					);
					if ( errorResponse !== null ) {
						// irrecoverable error so set complete
						if ( ! shouldRetry( errorResponse ) ) {
							actions.setComplete( errorResponse );
						} else {
							actions.setIdle();
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
							} );
						}

						actions.setIdle();
					}
				} );
			} else {
				emitEventWithAbort(
					currentObservers.current,
					EMIT_TYPES.CHECKOUT_AFTER_PROCESSING_WITH_SUCCESS,
					data
				).then( ( observerResponses: unknown[] ) => {
					let successResponse = null as null | Record<
						string,
						unknown
					>;
					let errorResponse = null as null | Record<
						string,
						unknown
					>;

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
						actions.setComplete( successResponse );
					} else if ( isObject( errorResponse ) ) {
						if (
							errorResponse.message &&
							isString( errorResponse.message )
						) {
							const errorOptions =
								errorResponse.messageContext &&
								isString( errorResponse.messageContext )
									? { context: errorResponse.messageContext }
									: undefined;
							createErrorNotice(
								errorResponse.message,
								errorOptions
							);
						}
						if ( ! shouldRetry( errorResponse ) ) {
							actions.setComplete( errorResponse );
						} else {
							// this will set an error which will end up
							// triggering the onCheckoutAfterProcessingWithError emitter.
							// and then setting checkout to IDLE state.
							actions.setHasError( true );
						}
					} else {
						// nothing hooked in had any response type so let's just consider successful.
						actions.setComplete();
					}
				} );
			}
		}
	}, [
		checkoutState.status,
		checkoutState.hasError,
		checkoutState.redirectUrl,
		checkoutState.orderId,
		checkoutState.customerId,
		checkoutState.orderNotes,
		checkoutState.processingResponse,
		previousStatus,
		previousHasError,
		dispatchActions,
		createErrorNotice,
		isErrorResponse,
		isFailResponse,
		isSuccessResponse,
		shouldRetry,
		checkoutNotices,
		expressPaymentNotices,
		paymentNotices,
		actions,
	] );

	const onSubmit = useCallback( () => {
		dispatchCheckoutEvent( 'submit' );
		actions.setBeforeProcessing();
	}, [ dispatchCheckoutEvent, actions ] );

	const checkoutData: CheckoutStateContextType = {
		onSubmit,
		isComplete: checkoutState.status === STATUS.COMPLETE,
		isIdle: checkoutState.status === STATUS.IDLE,
		isCalculating,
		isProcessing: checkoutState.status === STATUS.PROCESSING,
		isBeforeProcessing: checkoutState.status === STATUS.BEFORE_PROCESSING,
		isAfterProcessing: checkoutState.status === STATUS.AFTER_PROCESSING,
		hasError: checkoutState.hasError,
		redirectUrl: checkoutState.redirectUrl,
		onCheckoutBeforeProcessing,
		onCheckoutValidationBeforeProcessing,
		onCheckoutAfterProcessingWithSuccess,
		onCheckoutAfterProcessingWithError,
		dispatchActions,
		isCart,
		orderId: checkoutState.orderId,
		hasOrder: !! checkoutState.orderId,
		customerId: checkoutState.customerId,
		orderNotes: checkoutState.orderNotes,
		useShippingAsBilling: checkoutState.useShippingAsBilling,
		setUseShippingAsBilling: ( value ) =>
			actions.setUseShippingAsBilling( value ),
		shouldCreateAccount: checkoutState.shouldCreateAccount,
		setShouldCreateAccount: ( value ) =>
			actions.setShouldCreateAccount( value ),
		extensionData: checkoutState.extensionData,
	};
	return (
		<CheckoutContext.Provider value={ checkoutData }>
			{ children }
		</CheckoutContext.Provider>
	);
};
