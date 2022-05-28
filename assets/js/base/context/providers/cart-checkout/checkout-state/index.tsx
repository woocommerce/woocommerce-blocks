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
import { usePrevious } from '@woocommerce/base-hooks';
import deprecated from '@wordpress/deprecated';
import { useDispatch, useSelect } from '@wordpress/data';
import { CHECKOUT_STORE_KEY } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import { STATUS, DEFAULT_CHECKOUT_STATE_DATA } from './constants';
import type { CheckoutStateContextType } from './types';
import { useEventEmitters, reducer as emitReducer } from './event-emit';
import { useValidationContext } from '../../validation';
import { useStoreEvents } from '../../../hooks/use-store-events';
import { useCheckoutNotices } from '../../../hooks/use-checkout-notices';
import { useEmitResponse } from '../../../hooks/use-emit-response';
import { CheckoutState } from '../../../../../data/checkout/default-state';

const CheckoutContext = createContext( DEFAULT_CHECKOUT_STATE_DATA );

export const useCheckoutContext = (): CheckoutStateContextType => {
	return useContext( CheckoutContext );
};

/**
 * Checkout state provider
 * This provides an API interface exposing checkout state for use with cart or checkout blocks.
 *
 * @param {Object} props             Incoming props for the provider.
 * @param {Object} props.children    The children being wrapped.
 * @param {string} props.redirectUrl Initialize what the checkout will redirect to after successful submit.
 */
export const CheckoutStateProvider = ( {
	children,
	redirectUrl,
}: {
	children: React.ReactChildren;
	redirectUrl: string;
} ): JSX.Element => {
	const checkoutActions = useDispatch( CHECKOUT_STORE_KEY );
	const checkoutState: CheckoutState = useSelect( ( select ) =>
		select( CHECKOUT_STORE_KEY ).getCheckoutState()
	);

	if ( redirectUrl && redirectUrl !== checkoutState.redirectUrl ) {
		checkoutActions.setRedirectUrl( redirectUrl );
	}

	const { setValidationErrors } = useValidationContext();
	const { createErrorNotice } = useDispatch( 'core/notices' );

	const { dispatchCheckoutEvent } = useStoreEvents();
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

	// Emit CHECKOUT_VALIDATE event and set the error state based on the response of
	// the registered callbacks
	useEffect( () => {
		checkoutActions.emitValidateEvent(
			currentObservers.current,
			createErrorNotice,
			setValidationErrors
		);
	}, [
		checkoutState.status,
		setValidationErrors,
		createErrorNotice,
		checkoutActions,
	] );

	const previousStatus = usePrevious( checkoutState.status );
	const previousHasError = usePrevious( checkoutState.hasError );

	// Emit CHECKOUT_AFTER_PROCESSING_WITH_SUCCESS and CHECKOUT_AFTER_PROCESSING_WITH_ERROR events
	// and set checkout errors according to the callback responses
	useEffect( () => {
		if (
			checkoutState.status === previousStatus &&
			checkoutState.hasError === previousHasError
		) {
			return;
		}

		if ( checkoutState.status === STATUS.AFTER_PROCESSING ) {
			checkoutActions.emitAfterProcessingEvents( {
				observers: currentObservers.current,
				createErrorNotice,
				notices: {
					checkoutNotices,
					paymentNotices,
					expressPaymentNotices,
				},
			} );
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
		createErrorNotice,
		isErrorResponse,
		isFailResponse,
		isSuccessResponse,
		shouldRetry,
		checkoutNotices,
		expressPaymentNotices,
		paymentNotices,
		checkoutActions,
	] );

	const onSubmit = useCallback( () => {
		dispatchCheckoutEvent( 'submit' );
		checkoutActions.setBeforeProcessing();
	}, [ dispatchCheckoutEvent, checkoutActions ] );

	const checkoutData: CheckoutStateContextType = {
		onSubmit,
		onCheckoutBeforeProcessing,
		onCheckoutValidationBeforeProcessing,
		onCheckoutAfterProcessingWithSuccess,
		onCheckoutAfterProcessingWithError,
	};
	return (
		<CheckoutContext.Provider value={ checkoutData }>
			{ children }
		</CheckoutContext.Provider>
	);
};
