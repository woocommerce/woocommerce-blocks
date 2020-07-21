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
import { useStoreNotices, useEmitResponse } from '@woocommerce/base-hooks';

/**
 * Internal dependencies
 */
import { actions } from './actions';
import { reducer } from './reducer';
import { DEFAULT_STATE, STATUS } from './constants';
import {
	EMIT_TYPES,
	emitterSubscribers,
	emitEvent,
	emitEventWithAbort,
	reducer as emitReducer,
} from './event-emit';
import { useValidationContext } from '../../shared/validation';

const AddToCartFormStateContext = createContext( {
	showFormElements: false,
	productId: 0,
	product: {},
	quantity: 0,
	minQuantity: 1,
	maxQuantity: 99,
	isIdle: false,
	isProcessing: false,
	hasError: false,
	onSubmit: () => void null,
	onAddToCartAfterProcessingWithSuccess: ( callback ) => void callback,
	onAddToCartAfterProcessingWithError: ( callback ) => void callback,
	onAddToCartBeforeProcessing: ( callback ) => void callback,
	dispatchActions: {
		resetForm: () => void null,
		setQuantity: ( quantity ) => void quantity,
		setHasError: ( hasError ) => void hasError,
		setAfterProcessing: ( response ) => void response,
		setFormData: ( data ) => void data,
	},
} );

export const useAddToCartFormContext = () => {
	return useContext( AddToCartFormStateContext );
};

/**
 * Add to cart form state provider.
 *
 * This provides provides an api interface exposing add to cart form state.
 *
 * @param {Object}  props                    Incoming props for the provider.
 * @param {Object}  props.children           The children being wrapped.
 * @param {Object} [props.product]           The product for which the form belongs to.
 * @param {boolean} [props.showFormElements] Should form elements be shown.
 */
export const AddToCartFormStateContextProvider = ( {
	children,
	product,
	showFormElements,
} ) => {
	const [ addToCartFormState, dispatch ] = useReducer(
		reducer,
		DEFAULT_STATE
	);
	const [ observers, subscriber ] = useReducer( emitReducer, {} );
	const currentObservers = useRef( observers );
	const { addErrorNotice, removeNotices } = useStoreNotices();
	const { setValidationErrors } = useValidationContext();
	const {
		isSuccessResponse,
		isErrorResponse,
		isFailResponse,
	} = useEmitResponse();

	// set observers on ref so it's always current.
	useEffect( () => {
		currentObservers.current = observers;
	}, [ observers ] );

	const onAddToCartAfterProcessingWithSuccess = useMemo(
		() =>
			emitterSubscribers( subscriber )
				.onAddToCartAfterProcessingWithSuccess,
		[ subscriber ]
	);
	const onAddToCartAfterProcessingWithError = useMemo(
		() =>
			emitterSubscribers( subscriber )
				.onAddToCartAfterProcessingWithError,
		[ subscriber ]
	);
	const onAddToCartBeforeProcessing = useMemo(
		() => emitterSubscribers( subscriber ).onAddToCartBeforeProcessing,
		[ subscriber ]
	);

	const dispatchActions = useMemo(
		() => ( {
			resetForm: () => void dispatch( actions.setPristine() ),
			setQuantity: ( quantity ) =>
				void dispatch( actions.setQuantity( quantity ) ),
			setHasError: ( hasError ) =>
				void dispatch( actions.setHasError( hasError ) ),
			setFormData: ( data ) =>
				void dispatch( actions.setFormData( data ) ),
			setAfterProcessing: ( response ) => {
				dispatch( actions.setProcessingResponse( response ) );
				void dispatch( actions.setAfterProcessing() );
			},
		} ),
		[]
	);

	// emit events.
	useEffect( () => {
		const status = addToCartFormState.status;

		if ( status === STATUS.BEFORE_PROCESSING ) {
			removeNotices( 'error' );
			emitEvent(
				currentObservers.current,
				EMIT_TYPES.ADD_TO_CART_BEFORE_PROCESSING,
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
					dispatch( actions.setIdle() );
				} else {
					dispatch( actions.setProcessing() );
				}
			} );
		}
	}, [
		addToCartFormState.status,
		setValidationErrors,
		addErrorNotice,
		removeNotices,
		dispatch,
	] );

	useEffect( () => {
		if ( addToCartFormState.status === STATUS.AFTER_PROCESSING ) {
			const data = {
				processingResponse: addToCartFormState.processingResponse,
			};

			const handleErrorResponse = ( response ) => {
				if ( response.message ) {
					const errorOptions = response.messageContext
						? { context: response.messageContext }
						: undefined;
					addErrorNotice( response.message, errorOptions );
				}
			};

			if ( addToCartFormState.hasError ) {
				// allow things to customize the error with a fallback if nothing customizes it.
				emitEventWithAbort(
					currentObservers.current,
					EMIT_TYPES.ADD_TO_CART_AFTER_PROCESSING_WITH_ERROR,
					data
				).then( ( response ) => {
					if (
						isErrorResponse( response ) ||
						isFailResponse( response )
					) {
						handleErrorResponse( response );
					} else {
						// no error handling in place by anything so let's fall back to default
						const message =
							data.processingResponse?.message ||
							__(
								'Something went wrong. Please contact us to get assistance.',
								'woo-gutenberg-products-block'
							);
						addErrorNotice( message, {
							id: 'add-to-cart',
						} );
					}
					dispatch( actions.setIdle() );
				} );
				return;
			}

			emitEventWithAbort(
				currentObservers.current,
				EMIT_TYPES.ADD_TO_CART_AFTER_PROCESSING_WITH_SUCCESS,
				data
			).then( ( response ) => {
				if (
					isErrorResponse( response ) ||
					isFailResponse( response )
				) {
					handleErrorResponse( response );
					// this will set an error which will end up
					// triggering the onAddToCartAfterProcessingWithError emitter.
					// and then setting to IDLE state.
					dispatch( actions.setHasError( true ) );
				} else {
					dispatch( actions.setIdle() );
				}
			} );
		}
	}, [
		addToCartFormState.status,
		addToCartFormState.hasError,
		addToCartFormState.processingResponse,
		dispatchActions,
		addErrorNotice,
		isErrorResponse,
		isFailResponse,
		isSuccessResponse,
	] );

	const onSubmit = useCallback( () => {
		dispatch( actions.setBeforeProcessing() );
	}, [] );

	const contextData = {
		showFormElements,
		productId: product.id || 0,
		product,
		quantity: addToCartFormState.quantity,
		minQuantity: 1,
		maxQuantity: product.quantity_limit || 99,
		onSubmit,
		isIdle: addToCartFormState.status === STATUS.IDLE,
		isProcessing: addToCartFormState.status === STATUS.PROCESSING,
		isBeforeProcessing:
			addToCartFormState.status === STATUS.BEFORE_PROCESSING,
		isAfterProcessing:
			addToCartFormState.status === STATUS.AFTER_PROCESSING,
		hasError: addToCartFormState.hasError,
		onAddToCartAfterProcessingWithSuccess,
		onAddToCartAfterProcessingWithError,
		onAddToCartBeforeProcessing,
		dispatchActions,
	};
	return (
		<AddToCartFormStateContext.Provider value={ contextData }>
			{ children }
		</AddToCartFormStateContext.Provider>
	);
};
