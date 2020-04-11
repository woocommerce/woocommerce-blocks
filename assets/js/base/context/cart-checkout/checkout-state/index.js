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
import { useStoreNotices } from '@woocommerce/base-hooks';

/**
 * Internal dependencies
 */
import { actions } from './actions';
import { reducer, prepareResponseData } from './reducer';
import { DEFAULT_STATE, STATUS } from './constants';
import {
	EMIT_TYPES,
	emitterSubscribers,
	emitEvent,
	emitEventWithAbort,
	reducer as emitReducer,
} from './event-emit';
import { useValidationContext } from '../validation';

/**
 * @typedef {import('@woocommerce/type-defs/checkout').CheckoutDispatchActions} CheckoutDispatchActions
 * @typedef {import('@woocommerce/type-defs/contexts').CheckoutDataContext} CheckoutDataContext
 */

/**
 * A success response is anything that has 'success' as the value for the type
 * property.
 *
 * @param {Object} response      A response object from an event observer.
 * @param {string} response.type The type of response.
 *
 * @return {boolean} True means this is a success response.
 */
const isSuccessResponse = ( response ) => {
	return !! response.type && response.type === 'success';
};

/**
 * An error response is anything that has 'error' as the value for the type
 * property.
 *
 * @param {Object} response      A response object from an event observer.
 * @param {string} response.type The type of response.
 *
 * @return {boolean} True means this is an error response.
 */
const isErrorResponse = ( response ) => {
	return !! response.type && response.type === 'error';
};

const CheckoutContext = createContext( {
	submitLabel: '',
	onSubmit: () => void null,
	isComplete: false,
	isIdle: false,
	isCalculating: false,
	isProcessing: false,
	isBeforeProcessing: false,
	isAfterProcessing: false,
	hasError: false,
	redirectUrl: '',
	orderId: 0,
	onCheckoutAfterProcessingWithSuccess: ( callback ) => void callback,
	onCheckoutAfterProcessingWithError: ( callback ) => void callback,
	onCheckoutBeforeProcessing: ( callback ) => void callback,
	dispatchActions: {
		resetCheckout: () => void null,
		setRedirectUrl: ( url ) => void url,
		setHasError: ( hasError ) => void hasError,
		setAfterProcessing: ( response ) => void response,
		incrementCalculating: () => void null,
		decrementCalculating: () => void null,
		setOrderId: ( id ) => void id,
	},
	hasOrder: false,
	isCart: false,
} );

/**
 * @return {CheckoutDataContext} Returns the checkout data context value
 */
export const useCheckoutContext = () => {
	return useContext( CheckoutContext );
};

/**
 * Checkout state provider
 * This provides provides an api interface exposing checkout state for use with
 * cart or checkout blocks.
 *
 * @param {Object}  props                     Incoming props for the provider.
 * @param {Object}  props.children            The children being wrapped.
 * @param {string}  props.redirectUrl         Initialize what the checkout will
 *                                            redirect to after successful
 *                                            submit.
 * @param {string}  props.submitLabel         What will be used for the checkout
 *                                            submit button label.
 * @param {boolean} props.isCart              If context provider is being used
 *                                            in cart context.
 */
export const CheckoutStateProvider = ( {
	children,
	redirectUrl,
	isCart = false,
	submitLabel = __( 'Place Order', 'woo-gutenberg-product-block' ),
} ) => {
	// note, this is done intentionally so that the default state now has
	// the redirectUrl for when checkout is reset to PRISTINE state.
	DEFAULT_STATE.redirectUrl = redirectUrl;
	const [ checkoutState, dispatch ] = useReducer( reducer, DEFAULT_STATE );
	const [ observers, subscriber ] = useReducer( emitReducer, {} );
	const currentObservers = useRef( observers );
	const { setValidationErrors } = useValidationContext();
	const { addErrorNotice, removeNotices } = useStoreNotices();
	const isCalculating = checkoutState.calculatingCount > 0;

	// set observers on ref so it's always current.
	useEffect( () => {
		currentObservers.current = observers;
	}, [ observers ] );
	const onCheckoutAfterProcessingWithSuccess = useMemo(
		() =>
			emitterSubscribers( subscriber )
				.onCheckoutAfterProcessingWithSuccess,
		[ subscriber ]
	);
	const onCheckoutAfterProcessingWithError = useMemo(
		() =>
			emitterSubscribers( subscriber ).onCheckoutAfterProcessingWithError,
		[ subscriber ]
	);
	const onCheckoutBeforeProcessing = useMemo(
		() => emitterSubscribers( subscriber ).onCheckoutBeforeProcessing,
		[ subscriber ]
	);

	/**
	 * @type {CheckoutDispatchActions}
	 */
	const dispatchActions = useMemo(
		() => ( {
			resetCheckout: () => void dispatch( actions.setPristine() ),
			setRedirectUrl: ( url ) =>
				void dispatch( actions.setRedirectUrl( url ) ),
			setHasError: ( hasError ) =>
				void dispatch( actions.setHasError( hasError ) ),
			incrementCalculating: () =>
				void dispatch( actions.incrementCalculating() ),
			decrementCalculating: () =>
				void dispatch( actions.decrementCalculating() ),
			setOrderId: ( orderId ) =>
				void dispatch( actions.setOrderId( orderId ) ),
			setAfterProcessing: ( response ) => {
				if ( response.payment_result ) {
					if (
						// eslint-disable-next-line camelcase
						response.payment_result?.redirect_url
					) {
						dispatch(
							actions.setRedirectUrl(
								response.payment_result.redirect_url
							)
						);
					}
					dispatch(
						actions.setProcessingResponse(
							prepareResponseData( response.payment_result )
						)
					);
				}
				void dispatch( actions.setAfterProcessing() );
			},
		} ),
		[]
	);

	// emit events.
	useEffect( () => {
		const { status } = checkoutState;
		if ( status === STATUS.BEFORE_PROCESSING ) {
			removeNotices( 'error' );
			emitEvent(
				currentObservers.current,
				EMIT_TYPES.CHECKOUT_BEFORE_PROCESSING,
				{}
			).then( ( response ) => {
				if ( response !== true ) {
					if ( Array.isArray( response ) ) {
						response.forEach(
							( { errorMessage, validationErrors } ) => {
								addErrorNotice( errorMessage );
								setValidationErrors( validationErrors );
							}
						);
					}
					dispatch( actions.setAfterProcessing() );
				} else {
					dispatch( actions.setProcessing() );
				}
			} );
		}
	}, [ checkoutState.status, setValidationErrors ] );

	useEffect( () => {
		if ( checkoutState.status === STATUS.AFTER_PROCESSING ) {
			const data = {
				redirectUrl: checkoutState.redirectUrl,
				orderId: checkoutState.orderId,
				customerId: checkoutState.customerId,
				customerNote: checkoutState.customerNote,
				processingResponse: checkoutState.processingResponse,
			};
			if ( checkoutState.hasError ) {
				// these observers can't abort, this event is just provided
				// in case extensions need to reset or update something internal
				// in their state on a server checkout processing error.
				emitEvent(
					currentObservers.current,
					EMIT_TYPES.CHECKOUT_AFTER_PROCESSING_WITH_ERROR,
					data
				);
				dispatch( actions.setIdle() );
			} else {
				emitEventWithAbort(
					currentObservers.current,
					EMIT_TYPES.CHECKOUT_AFTER_PROCESSING_WITH_SUCCESS,
					data
				).then( ( response ) => {
					if ( isSuccessResponse( response ) ) {
						dispatch( actions.setComplete( response ) );
					}
					if ( isErrorResponse( response ) ) {
						if ( response.message ) {
							addErrorNotice( response.message );
						}
						if ( ! response.retry ) {
							dispatch( actions.setComplete( response ) );
						} else {
							// this will set an error which will end up
							// triggering the onCheckoutAfterProcessingWithErrors emitter.
							// and then setting checkout to IDLE state.
							dispatch( actions.setHasError( true ) );
						}
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
		checkoutState.customerNote,
		checkoutState.processingResponse,
		dispatchActions,
	] );

	const onSubmit = () => {
		dispatch( actions.setBeforeProcessing() );
	};

	/**
	 * @type {CheckoutDataContext}
	 */
	const checkoutData = {
		submitLabel,
		onSubmit,
		isComplete: checkoutState.status === STATUS.COMPLETE,
		isIdle: checkoutState.status === STATUS.IDLE,
		isCalculating,
		isProcessing: checkoutState.status === STATUS.PROCESSING,
		isBeforeProcessing: checkoutState.status === STATUS.BEFORE_PROCESSING,
		hasError: checkoutState.hasError,
		redirectUrl: checkoutState.redirectUrl,
		onCheckoutAfterProcessingWithSuccess,
		onCheckoutAfterProcessingWithError,
		onCheckoutBeforeProcessing,
		dispatchActions,
		isCart,
		orderId: checkoutState.orderId,
		hasOrder: !! checkoutState.orderId,
		customerId: checkoutState.customerId,
	};
	return (
		<CheckoutContext.Provider value={ checkoutData }>
			{ children }
		</CheckoutContext.Provider>
	);
};
