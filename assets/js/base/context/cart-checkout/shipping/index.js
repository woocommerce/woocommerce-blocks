/**
 * External dependencies
 */
import {
	createContext,
	useContext,
	useReducer,
	useEffect,
	useMemo,
	useRef,
} from '@wordpress/element';
import {
	useShippingAddress,
	useStoreCart,
	useSelectShippingRate,
} from '@woocommerce/base-hooks';
import { useCheckoutContext } from '@woocommerce/base-context';

/**
 * Internal dependencies
 */
import { ERROR_TYPES, DEFAULT_SHIPPING_CONTEXT_DATA } from './constants';
import {
	EMIT_TYPES,
	emitterSubscribers,
	reducer as emitReducer,
	emitEvent,
} from './event-emit';

/**
 * @typedef {import('@woocommerce/type-defs/contexts').ShippingDataContext} ShippingDataContext
 */

const { NONE, INVALID_ADDRESS, UNKNOWN } = ERROR_TYPES;

/**
 * Reducer for shipping status state
 *
 * @param {string} state  The current status.
 * @param {Object} action The incoming action.
 */
const errorStatusReducer = ( state, { type } ) => {
	if ( Object.values( ERROR_TYPES ).includes( type ) ) {
		return type;
	}
	return state;
};

const ShippingDataContext = createContext( DEFAULT_SHIPPING_CONTEXT_DATA );

/**
 * @return {ShippingDataContext} Returns data and functions related to
 *                               shipping methods.
 */
export const useShippingDataContext = () => {
	return useContext( ShippingDataContext );
};

/**
 * The shipping data provider exposes the interface for shipping in the
 * checkout/cart.
 *
 * @param {Object} props Incoming props for provider
 */
export const ShippingDataProvider = ( { children } ) => {
	const { dispatchActions } = useCheckoutContext();
	const {
		cartNeedsShipping: needsShipping,
		shippingRates,
		shippingRatesLoading,
	} = useStoreCart();
	const [ shippingErrorStatus, dispatchErrorStatus ] = useReducer(
		errorStatusReducer,
		NONE
	);
	const [ observers, subscriber ] = useReducer( emitReducer, {} );
	const { shippingAddress, setShippingAddress } = useShippingAddress();
	const currentObservers = useRef( observers );
	const {
		selectShippingRate: setSelectedRates,
		selectedShippingRates: selectedRates,
		isSelectingRate,
	} = useSelectShippingRate( shippingRates );
	const eventSubscribers = useMemo(
		() => ( {
			onShippingRateSuccess: emitterSubscribers( subscriber ).onSuccess,
			onShippingRateFail: emitterSubscribers( subscriber ).onFail,
			onShippingRateSelectSuccess: emitterSubscribers( subscriber )
				.onSelectSuccess,
			onShippingRateSelectFail: emitterSubscribers( subscriber )
				.onSelectFail,
		} ),
		[ subscriber ]
	);

	// set observers on ref so it's always current.
	useEffect( () => {
		currentObservers.current = observers;
	}, [ observers ] );

	// increment/decrement checkout calculating counts when shipping is loading.
	useEffect( () => {
		if ( shippingRatesLoading ) {
			dispatchActions.incrementCalculating();
		} else {
			dispatchActions.decrementCalculating();
		}
	}, [ shippingRatesLoading ] );

	// increment/decrement checkout calculating counts when shipping rates are
	// being selected.
	useEffect( () => {
		if ( isSelectingRate ) {
			dispatchActions.incrementCalculating();
		} else {
			dispatchActions.decrementCalculating();
		}
	}, [ isSelectingRate ] );

	const currentErrorStatus = useMemo(
		() => ( {
			isPristine: shippingErrorStatus === NONE,
			isValid: shippingErrorStatus === NONE,
			hasInvalidAddress: shippingErrorStatus === INVALID_ADDRESS,
			hasError:
				shippingErrorStatus === UNKNOWN ||
				shippingErrorStatus === INVALID_ADDRESS,
		} ),
		[ shippingErrorStatus ]
	);

	// emit events.
	useEffect( () => {
		if ( ! shippingRatesLoading && currentErrorStatus.hasError ) {
			emitEvent(
				currentObservers.current,
				EMIT_TYPES.SHIPPING_RATES_FAIL,
				currentErrorStatus
			);
		}
	}, [
		shippingRates,
		shippingRatesLoading,
		currentErrorStatus.hasError,
		shippingErrorStatus,
	] );

	useEffect( () => {
		if (
			! shippingRatesLoading &&
			shippingRates &&
			! currentErrorStatus.hasError
		) {
			emitEvent(
				currentObservers.current,
				EMIT_TYPES.SHIPPING_RATES_SUCCESS,
				shippingRates
			);
		}
	}, [ shippingRates, shippingRatesLoading, currentErrorStatus.hasError ] );

	// emit shipping rate selection events.
	useEffect( () => {
		if ( ! isSelectingRate && currentErrorStatus.hasError ) {
			emitEvent(
				currentObservers.current,
				EMIT_TYPES.SHIPPING_RATE_SELECT_FAIL,
				currentErrorStatus
			);
		}
	}, [
		selectedRates,
		isSelectingRate,
		currentErrorStatus,
		shippingErrorStatus,
	] );

	useEffect( () => {
		if (
			! isSelectingRate &&
			selectedRates &&
			! currentErrorStatus.hasError
		) {
			emitEvent(
				currentObservers.current,
				EMIT_TYPES.SHIPPING_RATE_SELECT_SUCCESS,
				selectedRates
			);
		}
	}, [ selectedRates, isSelectingRate, currentErrorStatus.hasError ] );

	/**
	 * @type {ShippingDataContext}
	 */
	const ShippingData = {
		shippingErrorStatus: currentErrorStatus,
		dispatchErrorStatus,
		shippingErrorTypes: ERROR_TYPES,
		shippingRates,
		setShippingRates: setSelectedRates,
		shippingRatesLoading,
		selectedRates,
		setSelectedRates,
		isSelectingRate,
		shippingAddress,
		setShippingAddress,
		onShippingRateSuccess: eventSubscribers.onShippingRateSuccess,
		onShippingRateFail: eventSubscribers.onShippingRateFail,
		onShippingRateSelectSuccess:
			eventSubscribers.onShippingRateSelectSuccess,
		onShippingRateSelectFail: eventSubscribers.onShippingRateSelectFail,
		needsShipping,
	};
	return (
		<>
			<ShippingDataContext.Provider value={ ShippingData }>
				{ children }
			</ShippingDataContext.Provider>
		</>
	);
};
