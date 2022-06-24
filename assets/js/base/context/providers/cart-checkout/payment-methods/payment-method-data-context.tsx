/**
 * External dependencies
 */
import {
	createContext,
	useContext,
	useReducer,
	useCallback,
	useRef,
	useEffect,
	useMemo,
} from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import {
	CHECKOUT_STORE_KEY,
	PAYMENT_METHOD_DATA_STORE_KEY,
} from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import type {
	CustomerPaymentMethods,
	PaymentMethodDataContextType,
} from './types';
import {
	DEFAULT_PAYMENT_DATA_CONTEXT_STATE,
	DEFAULT_PAYMENT_METHOD_DATA,
} from './constants';
import reducer from './reducer';
import { usePaymentMethods } from './use-payment-method-registration';
import { usePaymentMethodDataDispatchers } from './use-payment-method-dispatchers';
import { useEditorContext } from '../../editor-context';
import {
	EMIT_TYPES,
	useEventEmitters,
	emitEventWithAbort,
	reducer as emitReducer,
} from './event-emit';
import { useValidationContext } from '../../validation';
import { useEmitResponse } from '../../../hooks/use-emit-response';
import { getCustomerPaymentMethods } from './utils';

const PaymentMethodDataContext = createContext( DEFAULT_PAYMENT_METHOD_DATA );

export const usePaymentMethodDataContext = (): PaymentMethodDataContextType => {
	return useContext( PaymentMethodDataContext );
};

/**
 * PaymentMethodDataProvider is automatically included in the CheckoutDataProvider.
 *
 * This provides the api interface (via the context hook) for payment method status and data.
 *
 * @param {Object} props          Incoming props for provider
 * @param {Object} props.children The wrapped components in this provider.
 */
export const PaymentMethodDataProvider = ( {
	children,
}: {
	children: React.ReactNode;
} ): JSX.Element => {
	const {
		isProcessing: checkoutIsProcessing,
		isIdle: checkoutIsIdle,
		isCalculating: checkoutIsCalculating,
		hasError: checkoutHasError,
	} = useSelect( ( select ) => {
		const store = select( CHECKOUT_STORE_KEY );
		return {
			isProcessing: store.isProcessing(),
			isIdle: store.isIdle(),
			hasError: store.hasError(),
			isCalculating: store.isCalculating(),
		};
	} );
	const { currentStatus, registeredPaymentMethods } = useSelect(
		( select ) => {
			const store = select( PAYMENT_METHOD_DATA_STORE_KEY );

			return {
				currentStatus: store.getCurrentStatus(),
				registeredExpressPaymentMethods:
					store.getRegisteredExpressPaymentMethods(),
				registeredPaymentMethods: store.getRegisteredPaymentMethods(),
				errorMessage: store.getErrorMessage(),
			};
		}
	);
	const { isEditor, getPreviewData } = useEditorContext();
	const { setValidationErrors } = useValidationContext();
	const { createErrorNotice, removeNotice } = useDispatch( 'core/notices' );
	const {
		isSuccessResponse,
		isErrorResponse,
		isFailResponse,
		noticeContexts,
	} = useEmitResponse();
	const [ observers, observerDispatch ] = useReducer( emitReducer, {} );
	const { onPaymentProcessing } = useEventEmitters( observerDispatch );
	const currentObservers = useRef( observers );

	// ensure observers are always current.
	useEffect( () => {
		currentObservers.current = observers;
	}, [ observers ] );

	const [ dispatch ] = useReducer(
		reducer,
		DEFAULT_PAYMENT_DATA_CONTEXT_STATE
	);

	const { setPaymentStatus: setDataStorePaymentStatus } = useDispatch(
		PAYMENT_METHOD_DATA_STORE_KEY
	);

	const { dispatchActions, setPaymentStatus } =
		usePaymentMethodDataDispatchers( dispatch );

	const paymentMethodsInitialized = usePaymentMethods(
		dispatchActions.setRegisteredPaymentMethods
	);

	// const expressPaymentMethodsInitialized = useExpressPaymentMethods(
	// 	dispatchActions.setRegisteredExpressPaymentMethods
	// ); //TODO initialize setRegisteredExpressPaymentMethods

	const customerPaymentMethods = useMemo( (): CustomerPaymentMethods => {
		if ( isEditor ) {
			return getPreviewData(
				'previewSavedPaymentMethods'
			) as CustomerPaymentMethods;
		}
		return paymentMethodsInitialized
			? getCustomerPaymentMethods( registeredPaymentMethods )
			: {};
	}, [
		isEditor,
		getPreviewData,
		paymentMethodsInitialized,
		registeredPaymentMethods,
	] );

	const setExpressPaymentError = useCallback(
		( message ) => {
			if ( message ) {
				createErrorNotice( message, {
					id: 'wc-express-payment-error',
					context: noticeContexts.EXPRESS_PAYMENTS,
				} );
			} else {
				removeNotice(
					'wc-express-payment-error',
					noticeContexts.EXPRESS_PAYMENTS
				);
			}
		},
		[ createErrorNotice, noticeContexts.EXPRESS_PAYMENTS, removeNotice ]
	);

	// /**
	//  * Active Gateway Selection
	//  *
	//  * Updates the active (selected) payment method when it is empty, or invalid. This uses the first saved payment
	//  * method found (if applicable), or the first standard gateway.
	//  */
	// useEffect( () => {
	// 	const paymentMethodKeys = Object.keys( paymentData.paymentMethods );
	//
	// 	if ( ! paymentMethodsInitialized || ! paymentMethodKeys.length ) {
	// 		return;
	// 	}
	//
	// 	const allPaymentMethodKeys = [
	// 		...paymentMethodKeys,
	// 		...Object.keys( paymentData.expressPaymentMethods ),
	// 	];
	//
	// 	// Return if current method is valid.
	// 	if (
	// 		paymentData.activePaymentMethod &&
	// 		allPaymentMethodKeys.includes( paymentData.activePaymentMethod )
	// 	) {
	// 		return;
	// 	}
	//
	// 	setPaymentStatus().pristine();
	//
	// 	const customerPaymentMethod =
	// 		Object.keys( customerPaymentMethods ).flatMap(
	// 			( type ) => customerPaymentMethods[ type ]
	// 		)[ 0 ] || undefined;
	//
	// 	if ( customerPaymentMethod ) {
	// 		const token = customerPaymentMethod.tokenId.toString();
	// 		const paymentMethodSlug = customerPaymentMethod.method.gateway;
	// 		const savedTokenKey = `wc-${ paymentMethodSlug }-payment-token`;
	//
	// 		dispatchActions.setActivePaymentMethod( paymentMethodSlug, {
	// 			token,
	// 			payment_method: paymentMethodSlug,
	// 			[ savedTokenKey ]: token,
	// 			isSavedToken: true,
	// 		} );
	// 		return;
	// 	}
	//
	// 	dispatchActions.setActivePaymentMethod(
	// 		Object.keys( paymentData.paymentMethods )[ 0 ]
	// 	);
	// }, [
	// 	paymentMethodsInitialized,
	// 	paymentData.paymentMethods,
	// 	paymentData.expressPaymentMethods,
	// 	dispatchActions,
	// 	setPaymentStatus,
	// 	paymentData.activePaymentMethod,
	// 	customerPaymentMethods,
	// ] );

	// flip payment to processing if checkout processing is complete, there are no errors, and payment status is started.
	useEffect( () => {
		if (
			checkoutIsProcessing &&
			! checkoutHasError &&
			! checkoutIsCalculating &&
			! currentStatus.isFinished
		) {
			setPaymentStatus().processing();
			setDataStorePaymentStatus( STATUS.PROCESSING );
		}
	}, [
		checkoutIsProcessing,
		checkoutHasError,
		checkoutIsCalculating,
		currentStatus.isFinished,
		setPaymentStatus,
		setDataStorePaymentStatus,
	] );

	// When checkout is returned to idle, set payment status to pristine but only if payment status is already not finished.
	useEffect( () => {
		if ( checkoutIsIdle && ! currentStatus.isSuccessful ) {
			setPaymentStatus().pristine();
			setDataStorePaymentStatus( STATUS.PRISTINE );
		}
	}, [
		checkoutIsIdle,
		currentStatus.isSuccessful,
		setPaymentStatus,
		setDataStorePaymentStatus,
	] );

	// if checkout has an error sync payment status back to pristine.
	useEffect( () => {
		if ( checkoutHasError && currentStatus.isSuccessful ) {
			setPaymentStatus().pristine();
			setDataStorePaymentStatus( STATUS.PRISTINE );
		}
	}, [
		checkoutHasError,
		currentStatus.isSuccessful,
		setPaymentStatus,
		setDataStorePaymentStatus,
	] );

	useEffect( () => {
		// Note: the nature of this event emitter is that it will bail on any
		// observer that returns a response that !== true. However, this still
		// allows for other observers that return true for continuing through
		// to the next observer (or bailing if there's a problem).
		if ( currentStatus.isProcessing ) {
			removeNotice( 'wc-payment-error', noticeContexts.PAYMENTS );
			emitEventWithAbort(
				currentObservers.current,
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
				if ( successResponse && ! errorResponse ) {
					setPaymentStatus().success(
						successResponse?.meta?.paymentMethodData,
						successResponse?.meta?.billingAddress,
						successResponse?.meta?.shippingData
					);
					setDataStorePaymentStatus( STATUS.SUCCESS );
				} else if ( errorResponse && isFailResponse( errorResponse ) ) {
					if (
						errorResponse.message &&
						errorResponse.message.length
					) {
						createErrorNotice( errorResponse.message, {
							id: 'wc-payment-error',
							isDismissible: false,
							context:
								errorResponse?.messageContext ||
								noticeContexts.PAYMENTS,
						} );
					}
					setPaymentStatus().failed(
						errorResponse?.message,
						errorResponse?.meta?.paymentMethodData,
						errorResponse?.meta?.billingAddress
					);
				} else if ( errorResponse ) {
					if (
						errorResponse.message &&
						errorResponse.message.length
					) {
						createErrorNotice( errorResponse.message, {
							id: 'wc-payment-error',
							isDismissible: false,
							context:
								errorResponse?.messageContext ||
								noticeContexts.PAYMENTS,
						} );
					}
					setPaymentStatus().error( errorResponse.message );
					setValidationErrors( errorResponse?.validationErrors );
				} else {
					// otherwise there are no payment methods doing anything so
					// just consider success
					// setPaymentStatus().success();
					setDataStorePaymentStatus( {
						isSuccessful: true,
					} );
				}
			} );
		}
	}, [
		currentStatus.isProcessing,
		setValidationErrors,
		setPaymentStatus,
		removeNotice,
		noticeContexts.PAYMENTS,
		isSuccessResponse,
		isFailResponse,
		isErrorResponse,
		createErrorNotice,
		setDataStorePaymentStatus,
	] );

	const paymentContextData: PaymentMethodDataContextType = {
		// setPaymentStatus,
		// currentStatus,
		// paymentStatuses: STATUS,
		// paymentMethodData,
		// errorMessage,
		// activePaymentMethod,
		// activeSavedToken,
		// setActivePaymentMethod: dispatchActions.setActivePaymentMethod,
		onPaymentProcessing,
		customerPaymentMethods,
		// paymentMethods: registeredPaymentMethods,
		// expressPaymentMethods: registeredExpressPaymentMethods,
		// paymentMethodsInitialized,
		// expressPaymentMethodsInitialized,
		setExpressPaymentError,
		// isExpressPaymentMethodActive,
		// shouldSavePayment: shouldSavePaymentMethod,
		// setShouldSavePayment: setShouldSavePaymentMethod,
	};

	return (
		<PaymentMethodDataContext.Provider value={ paymentContextData }>
			{ children }
		</PaymentMethodDataContext.Provider>
	);
};
