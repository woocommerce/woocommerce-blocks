/**
 * External dependencies
 */
import {
	createContext,
	useContext,
	useReducer,
	useEffect,
	useRef,
} from '@wordpress/element';
import {
	useShippingAddress,
	useShippingRates,
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
	if ( Object.keys( ERROR_TYPES ).includes( type ) ) {
		return state;
	}
	return type;
};

const ShippingDataContext = createContext( DEFAULT_SHIPPING_CONTEXT_DATA );

/**
 * @return {ShippingDataContext} Returns data and functions related to
 *                                     shipping methods.
 */
export const useShippingDataContext = () => {
	return useContext( ShippingDataContext );
};

// @todo wire up checkout context needed here (like isCalculating etc)
// @todo useShippingRates needs to be wired up with error handling so we know
// when an invalid address is provided for it (because payment methods might
// provide an invalid address)
export const ShippingDataProvider = ( { children } ) => {
	const { dispatchActions } = useCheckoutContext();
	const { cartNeedsShipping: needsShipping } = useStoreCart();
	const [ shippingErrorStatus, dispatchErrorStatus ] = useReducer(
		errorStatusReducer,
		NONE
	);
	const [ observers, subscriber ] = useReducer( emitReducer, {} );
	const { shippingAddress, setShippingAddress } = useShippingAddress();
	const currentObservers = useRef( observers );
	const { shippingRates, shippingRatesLoading } = useShippingRates();
	const {
		selectShippingRate: setSelectedRates,
		selectedShippingRates: selectedRates,
		isSelectingRate,
	} = useSelectShippingRate( shippingRates );
	const onShippingRateSuccess = emitterSubscribers( subscriber ).onSuccess;
	const onShippingRateFail = emitterSubscribers( subscriber ).onFail;
	const onShippingRateSelectSuccess = emitterSubscribers( subscriber )
		.onSelectSuccess;
	const onShippingRateSelectFail = emitterSubscribers( subscriber )
		.onShippingRateSelectFail;

	// set observers on ref so it's always current
	useEffect( () => {
		currentObservers.current = observers;
	}, [ observers ] );

	// increment/decrement checkout calculating counts when shipping is loading
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

	const currentErrorStatus = {
		isPristine: shippingErrorStatus === NONE,
		isValid: shippingErrorStatus === NONE,
		hasInvalidAddress: shippingErrorStatus === INVALID_ADDRESS,
		hasError:
			shippingErrorStatus === UNKNOWN ||
			shippingErrorStatus === INVALID_ADDRESS,
	};

	// emit events
	// @todo add emitters for shipping rate selection.
	useEffect( () => {
		if ( ! shippingRatesLoading && currentErrorStatus.hasError ) {
			emitEvent(
				currentObservers.current,
				EMIT_TYPES.SHIPPING_RATES_FAIL,
				shippingErrorStatus
			);
		} else if ( ! shippingRatesLoading && shippingRates ) {
			emitEvent(
				currentObservers.current,
				EMIT_TYPES.SHIPPING_RATES_SUCCESS,
				shippingRates
			);
		}
	}, [
		shippingRates,
		shippingRatesLoading,
		currentErrorStatus,
		shippingErrorStatus,
	] );

	//emit shipping rate selection events
	useEffect( () => {
		if ( ! isSelectingRate && currentErrorStatus.hasError ) {
			emitEvent(
				currentObservers.current,
				EMIT_TYPES.SHIPPING_RATE_SELECT_FAIL,
				shippingErrorStatus
			);
		} else if ( ! isSelectingRate && selectedRates ) {
			emitEvent(
				currentObservers.current,
				EMIT_TYPES.SHIPPING_RATE_SELECT_SUCCESS,
				selectedRates
			);
		}
	}, [
		selectedRates,
		isSelectingRate,
		currentErrorStatus,
		shippingErrorStatus,
	] );

	/**
	 * @type {ShippingDataContext}
	 */
	const ShippingData = {
		shippingErrorStatus,
		dispatchErrorStatus,
		shippingErrorTypes: ERROR_TYPES,
		shippingRates,
		setShippingRates: setSelectedRates,
		shippingRatesLoading,
		selectedRates,
		setSelectedRates,
		shippingAddress,
		setShippingAddress,
		onShippingRateSuccess,
		onShippingRateFail,
		onShippingRateSelectSuccess,
		onShippingRateSelectFail,
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
