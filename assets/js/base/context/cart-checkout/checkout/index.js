/**
 * Internal dependencies
 */
import { PaymentMethodDataProvider } from '../payment-methods';
import { ShippingMethodDataProvider } from '../shipping';
import { actions } from './actions';
import { reducer } from './reducer';
import { DEFAULT_STATE, STATUS } from './constants';
import {
	EMIT_TYPES,
	emitterSubscribers,
	emitEvent,
	reducer as emitReducer,
} from './event-emit';

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
} from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * @typedef {import('@woocommerce/type-defs/checkout').CheckoutDispatchActions} CheckoutDispatchActions
 * @typedef {import('@woocommerce/type-defs/contexts').CheckoutDataContext} CheckoutDataContext
 */

const CheckoutContext = createContext( {
	submitLabel: '',
	onSubmit: () => void null,
	isComplete: false,
	isIdle: false,
	isCalculating: false,
	isProcessing: false,
	hasError: false,
	redirectUrl: '',
	onCheckoutCompleteSuccess: () => void null,
	onCheckoutCompleteError: () => void null,
	onCheckoutProcessing: () => void null,
	dispatchActions: {
		resetCheckout: () => void null,
		setRedirectUrl: () => void null,
		setHasError: () => void null,
		clearError: () => void null,
		incrementCalculating: () => void null,
		decrementCalculating: () => void null,
	},
} );

/**
 * @return {CheckoutDataContext} Returns the checkout data context value
 */
export const useCheckoutContext = () => {
	return useContext( CheckoutContext );
};

// create context provider for coupons

// todo have a local state (reducer) for validation error objects (see checkout processing event).
// this will need exposed for checkout/cart steps to read from when checkout.hasError to be able
// to show what fields need addressed.

// checkout and cart provider context will be different context but implement
// the above (in terms of finalization.). For example cart context will redirect
// checkout for finalization. Checkout context handles pinging the server for
// processing checkout, validation of existing fields, and redirecting on
// success.

export const CheckoutProvider = ( {
	children,
	activePaymentMethod: initialActivePaymentMethod,
	redirectUrl,
	submitLabel = __( 'Place Order', 'woo-gutenberg-product-block' ),
} ) => {
	// note, this is done intentionally so that the default state now has
	// the redirectUrl for when checkout is reset to PRISTINE state.
	DEFAULT_STATE.redirectUrl = redirectUrl;
	const [ checkoutState, dispatch ] = useReducer( reducer, DEFAULT_STATE );
	const [ observers, subscriber ] = useReducer( emitReducer, {} );
	const currentObservers = useRef( observers );
	// set observers on ref so it's always current
	useEffect( () => {
		currentObservers.current = observers;
	}, [ observers ] );
	const onCheckoutCompleteSuccess = emitterSubscribers( subscriber )
		.onCheckoutCompleteSuccess;
	const onCheckoutCompleteError = emitterSubscribers( subscriber )
		.onCheckoutCompleteError;
	const onCheckoutProcessing = emitterSubscribers( subscriber )
		.onCheckoutProcessing;

	/**
	 * @type {CheckoutDispatchActions}
	 */
	const dispatchActions = useMemo(
		() => ( {
			resetCheckout: () => void dispatch( actions.setPristine() ),
			setRedirectUrl: ( url ) =>
				void dispatch( actions.setRedirectUrl( url ) ),
			setHasError: () => void dispatch( actions.setHasError() ),
			clearError: () => void dispatch( actions.clearError() ),
			incrementCalculating: () =>
				void dispatch( actions.incrementCalculating() ),
			decrementCalculating: () =>
				void dispatch( actions.decrementCalculating() ),
		} ),
		[]
	);

	// emit events
	useEffect( () => {
		const status = checkoutState.status;
		if ( status === STATUS.PROCESSING ) {
			const error = emitEvent(
				currentObservers.current,
				EMIT_TYPES.CHECKOUT_PROCESSING,
				{}
			);
			//@todo bail if error object detected (see flow).
			//Fire off checkoutFail event, and then reset checkout
			//status to idle (with hasError flag) - then return from this hook.
			// Finally after the event subscribers have processed, do the
			// checkout submit sending the order to the server for processing
			// and followup on errors from it.
			if ( error ) {
				dispatchActions.setHasError();
			}
			dispatch( actions.setComplete() );
		}
		if ( checkoutState.isComplete ) {
			if ( checkoutState.hasError ) {
				emitEvent(
					currentObservers.current,
					EMIT_TYPES.CHECKOUT_COMPLETE_WITH_ERROR,
					{}
				);
			} else {
				emitEvent(
					currentObservers.current,
					EMIT_TYPES.CHECKOUT_COMPLETE_WITH_SUCCESS,
					{}
				);
			}
			// all observers have done their thing so let's redirect (if no error)
			if ( ! checkoutState.hasError ) {
				window.location = checkoutState.redirectUrl;
			}
		}
	}, [ checkoutState.status, checkoutState.hasError ] );

	const onSubmit = () => {
		dispatch( actions.setProcessing() );
	};

	/**
	 * @type {CheckoutDataContext}
	 */
	const checkoutData = {
		submitLabel,
		onSubmit,
		isComplete: checkoutState.status === STATUS.COMPLETE,
		isIdle: checkoutState.status === STATUS.IDLE,
		isCalculating: checkoutState.status === STATUS.CALCULATING,
		isProcessing: checkoutState.status === STATUS.PROCESSING,
		hasError: checkoutState.hasError,
		redirectUrl: checkoutState.redirectUrl,
		onCheckoutCompleteSuccess,
		onCheckoutCompleteError,
		onCheckoutProcessing,
		dispatchActions,
	};
	return (
		<CheckoutContext.Provider value={ checkoutData }>
			<PaymentMethodDataProvider
				activePaymentMethod={ initialActivePaymentMethod }
			>
				<ShippingMethodDataProvider>
					{ children }
				</ShippingMethodDataProvider>
			</PaymentMethodDataProvider>
		</CheckoutContext.Provider>
	);
};
