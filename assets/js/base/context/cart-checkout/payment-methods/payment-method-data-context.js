/**
 * Internal dependencies
 */
import {
	STATUS,
	DEFAULT_PAYMENT_DATA,
	DEFAULT_PAYMENT_METHOD_DATA,
} from './constants';
import reducer from './reducer';
import {
	statusOnly,
	error,
	failed,
	success,
	setRegisteredPaymentMethod,
	setRegisteredExpressPaymentMethod,
} from './actions';
import {
	usePaymentMethods,
	useExpressPaymentMethods,
} from './use-payment-method-registration';
import { useBillingDataContext } from '../billing';
import {
	EMIT_TYPES,
	emitterSubscribers,
	emitEvent,
	emitEventWithAbort,
	reducer as emitReducer,
} from './event-emit';

/**
 * External dependencies
 */
import {
	createContext,
	useContext,
	useState,
	useReducer,
	useCallback,
	useEffect,
	useRef,
} from '@wordpress/element';
import { getSetting } from '@woocommerce/settings';

/**
 * @typedef {import('@woocommerce/type-defs/contexts').PaymentMethodDataContext} PaymentMethodDataContext
 * @typedef {import('@woocommerce/type-defs/contexts').PaymentStatusDispatch} PaymentStatusDispatch
 * @typedef {import('@woocommerce/type-defs/contexts').PaymentStatusDispatchers} PaymentStatusDispatchers
 * @typedef {import('@woocommerce/type-defs/billing').BillingData} BillingData
 * @typedef {import('@woocommerce/type-defs/contexts').CustomerPaymentMethod} CustomerPaymentMethod
 */

const {
	STARTED,
	PROCESSING,
	COMPLETE,
	PRISTINE,
	ERROR,
	FAILED,
	SUCCESS,
} = STATUS;

const PaymentMethodDataContext = createContext( DEFAULT_PAYMENT_METHOD_DATA );

/**
 * @return {PaymentMethodDataContext} The data and functions exposed by the
 *                                    payment method context provider.
 */
export const usePaymentMethodDataContext = () => {
	return useContext( PaymentMethodDataContext );
};

/**
 * PaymentMethodDataProvider is automatically included in the
 * CheckoutDataProvider.
 *
 * This provides the api interface (via the context hook) for payment method
 * status and data.
 *
 * @param {Object} props                     Incoming props for provider
 * @param {Object} props.children            The wrapped components in this
 *                                           provider.
 * @param {string} props.activePaymentMethod The initial active payment method
 *                                           to set for the context.
 */
export const PaymentMethodDataProvider = ( {
	children,
	activePaymentMethod: initialActivePaymentMethod,
} ) => {
	const { setBillingData } = useBillingDataContext();
	const [ activePaymentMethod, setActive ] = useState(
		initialActivePaymentMethod
	);
	const [ observers, subscriber ] = useReducer( emitReducer, {} );
	const currentObservers = useRef( observers );
	const customerPaymentMethods = getSetting( 'customerPaymentMethods', {} );
	const [ paymentStatus, dispatch ] = useReducer(
		reducer,
		DEFAULT_PAYMENT_DATA
	);
	const setActivePaymentMethod = ( paymentMethodSlug ) => {
		setActive( paymentMethodSlug );
		dispatch( statusOnly( PRISTINE ) );
	};
	const paymentMethodsInitialized = usePaymentMethods( ( paymentMethod ) =>
		dispatch( setRegisteredPaymentMethod( paymentMethod ) )
	);
	const expressPaymentMethodsInitialized = useExpressPaymentMethods(
		( paymentMethod ) => {
			dispatch( setRegisteredExpressPaymentMethod( paymentMethod ) );
		}
	);
	// ensure observers are always current.
	useEffect( () => {
		currentObservers.current = observers;
	}, [ observers ] );
	const onPaymentProcessing = useMemo(
		() => emitterSubscribers( subscriber ).onPaymentProcessing,
		[ subscriber ]
	);
	const onPaymentSuccess = useMemo(
		() => emitterSubscribers( subscriber ).onPaymentSuccess,
		[ subscriber ]
	);
	const onPaymentFail = useMemo(
		() => emitterSubscribers( subscriber ).onPaymentFail,
		[ subscriber ]
	);
	const onPaymentError = useMemo(
		() => emitterSubscribers( subscriber ).onPaymentError,
		[ subscriber ]
	);
	// set initial active payment method if it's undefined.
	useEffect( () => {
		const paymentMethodKeys = Object.keys( paymentStatus.paymentMethods );
		if (
			paymentMethodsInitialized &&
			! activePaymentMethod &&
			paymentMethodKeys.length > 0
		) {
			setActivePaymentMethod(
				Object.keys( paymentStatus.paymentMethods )[ 0 ]
			);
		}
	}, [
		activePaymentMethod,
		paymentMethodsInitialized,
		paymentStatus.paymentMethods,
	] );

	/**
	 * @type {PaymentStatusDispatch}
	 */
	const setPaymentStatus = useCallback(
		() => ( {
			started: () => dispatch( statusOnly( STARTED ) ),
			processing: () => dispatch( statusOnly( PROCESSING ) ),
			completed: () => dispatch( statusOnly( COMPLETE ) ),
			/**
			 * @param {string} errorMessage An error message
			 */
			error: ( errorMessage ) => dispatch( error( errorMessage ) ),
			/**
			 * @param {string} errorMessage An error message
			 * @param {Object} paymentMethodData Arbitrary payment method data to accompany the checkout submission.
			 * @param {BillingData} billingData The billing data accompanying the payment method.
			 */
			failed: ( errorMessage, paymentMethodData, billingData = null ) => {
				if ( billingData ) {
					setBillingData( billingData );
				}
				dispatch(
					failed( {
						errorMessage,
						paymentMethodData,
					} )
				);
			},
			/**
			 * @param {Object} paymentMethodData Arbitrary payment method data to accompany the checkout.
			 * @param {BillingData} billingData The billing data accompanying the payment method.
			 */
			success: ( paymentMethodData, billingData = null ) => {
				if ( billingData ) {
					setBillingData( billingData );
				}
				dispatch(
					success( {
						paymentMethodData,
					} )
				);
			},
		} ),
		[ dispatch ]
	);

	const currentStatus = {
		isPristine: paymentStatus === PRISTINE,
		isStarted: paymentStatus === STARTED,
		isProcessing: paymentStatus === PROCESSING,
		isFinished: [ ERROR, FAILED, SUCCESS ].includes( paymentStatus ),
		hasError: paymentStatus === ERROR,
		hasFailed: paymentStatus === FAILED,
		isSuccessful: paymentStatus === SUCCESS,
	};

	/**
	 * @type {PaymentMethodDataContext}
	 */
	const paymentData = {
		setPaymentStatus,
		currentStatus,
		paymentStatuses: STATUS,
		paymentMethodData: paymentStatus.paymentMethodData,
		errorMessage: paymentStatus.errorMessage,
		activePaymentMethod,
		setActivePaymentMethod,
		onPaymentProcessing,
		onPaymentSuccess,
		onPaymentFail,
		onPaymentError,
		customerPaymentMethods,
		paymentMethods: paymentStatus.paymentMethods,
		expressPaymentMethods: paymentStatus.expressPaymentMethods,
		paymentMethodsInitialized,
		expressPaymentMethodsInitialized,
	};
	return (
		<PaymentMethodDataContext.Provider value={ paymentData }>
			{ children }
		</PaymentMethodDataContext.Provider>
	);
};
