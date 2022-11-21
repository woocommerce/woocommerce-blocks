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
import {
	CHECKOUT_STORE_KEY,
	PAYMENT_STORE_KEY,
	VALIDATION_STORE_KEY,
} from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import { useEventEmitters, reducer as emitReducer } from './event-emit';
import type { emitterCallback } from '../../../event-emit';
import { STATUS } from '../../../../../data/checkout/constants';
import { useStoreEvents } from '../../../hooks/use-store-events';
import { useCheckoutNotices } from '../../../hooks/use-checkout-notices';
import { CheckoutState } from '../../../../../data/checkout/default-state';
import {
	getExpressPaymentMethods,
	getPaymentMethods,
} from '../../../../../blocks-registry/payment-methods/registry';
import { useEditorContext } from '../../editor-context';

type CheckoutEventsContextType = {
	// Submits the checkout and begins processing.
	onSubmit: () => void;
	// Used to register a callback that will fire after checkout has been processed and there are no errors.
	onCheckoutAfterProcessingWithSuccess: ReturnType< typeof emitterCallback >;
	// Used to register a callback that will fire when the checkout has been processed and has an error.
	onCheckoutAfterProcessingWithError: ReturnType< typeof emitterCallback >;
	// Deprecated in favour of onCheckoutValidationBeforeProcessing.
	onCheckoutBeforeProcessing: ReturnType< typeof emitterCallback >;
	// Used to register a callback that will fire when the checkout has been submitted before being sent off to the server.
	onCheckoutValidationBeforeProcessing: ReturnType< typeof emitterCallback >;
};

const CheckoutEventsContext = createContext< CheckoutEventsContextType >( {
	onSubmit: () => void null,
	onCheckoutAfterProcessingWithSuccess: () => () => void null,
	onCheckoutAfterProcessingWithError: () => () => void null,
	onCheckoutBeforeProcessing: () => () => void null, // deprecated for onCheckoutValidationBeforeProcessing
	onCheckoutValidationBeforeProcessing: () => () => void null,
} );

export const useCheckoutEventsContext = () => {
	return useContext( CheckoutEventsContext );
};

/**
 * Checkout Events provider
 * Emit Checkout events and provide access to Checkout event handlers
 *
 * @param {Object} props             Incoming props for the provider.
 * @param {Object} props.children    The children being wrapped.
 * @param {string} props.redirectUrl Initialize what the checkout will redirect to after successful submit.
 */
export const CheckoutEventsProvider = ( {
	children,
	redirectUrl,
}: {
	children: React.ReactChildren;
	redirectUrl: string;
} ): JSX.Element => {
	const paymentMethods = getPaymentMethods();
	const expressPaymentMethods = getExpressPaymentMethods();
	const { isEditor } = useEditorContext();

	const { __internalUpdateAvailablePaymentMethods } =
		useDispatch( PAYMENT_STORE_KEY );

	// Update the payment method store when paymentMethods or expressPaymentMethods changes.
	// Ensure this happens in the editor even if paymentMethods is empty. This won't happen instantly when the objects
	// are updated, but on the next re-render.
	useEffect( () => {
		if (
			! isEditor &&
			Object.keys( paymentMethods ).length === 0 &&
			Object.keys( expressPaymentMethods ).length === 0
		) {
			return;
		}
		__internalUpdateAvailablePaymentMethods();
	}, [
		isEditor,
		paymentMethods,
		expressPaymentMethods,
		__internalUpdateAvailablePaymentMethods,
	] );

	const checkoutActions = useDispatch( CHECKOUT_STORE_KEY );
	const checkoutState: CheckoutState = useSelect( ( select ) =>
		select( CHECKOUT_STORE_KEY ).getCheckoutState()
	);

	if ( redirectUrl && redirectUrl !== checkoutState.redirectUrl ) {
		checkoutActions.__internalSetRedirectUrl( redirectUrl );
	}

	const { setValidationErrors } = useDispatch( VALIDATION_STORE_KEY );
	const { createErrorNotice } = useDispatch( 'core/notices' );

	const { dispatchCheckoutEvent } = useStoreEvents();
	const { checkoutNotices, paymentNotices, expressPaymentNotices } =
		useCheckoutNotices();

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
		if ( checkoutState.status === STATUS.BEFORE_PROCESSING ) {
			checkoutActions.__internalEmitValidateEvent( {
				observers: currentObservers.current,
				setValidationErrors,
			} );
		}
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
			checkoutActions.__internalEmitAfterProcessingEvents( {
				observers: currentObservers.current,
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
		previousStatus,
		previousHasError,
		createErrorNotice,
		checkoutNotices,
		expressPaymentNotices,
		paymentNotices,
		checkoutActions,
	] );

	const onSubmit = useCallback( () => {
		dispatchCheckoutEvent( 'submit' );
		checkoutActions.__internalSetBeforeProcessing();
	}, [ dispatchCheckoutEvent, checkoutActions ] );

	const checkoutEventHandlers = {
		onSubmit,
		onCheckoutBeforeProcessing,
		onCheckoutValidationBeforeProcessing,
		onCheckoutAfterProcessingWithSuccess,
		onCheckoutAfterProcessingWithError,
	};
	return (
		<CheckoutEventsContext.Provider value={ checkoutEventHandlers }>
			{ children }
		</CheckoutEventsContext.Provider>
	);
};
