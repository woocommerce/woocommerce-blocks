/**
 * Internal dependencies
 */
import { TYPES, DEFAULT_STATE, STATUS } from './constants';
import type { ActionType } from './actions';
import type { CheckoutStateContextState, PaymentResultDataType } from './types';

/**
 * Reducer for the checkout state
 */
export const reducer = (
	state = DEFAULT_STATE,
	{
		url,
		type,
		customerId,
		orderId,
		orderNotes,
		shouldCreateAccount,
		data,
	}: ActionType
): CheckoutStateContextState => {
	let newState = state;
	switch ( type ) {
		case TYPES.SET_PRISTINE:
			newState = DEFAULT_STATE;
			break;
		case TYPES.SET_IDLE:
			newState =
				state.status !== STATUS.IDLE
					? {
							...state,
							status: STATUS.IDLE,
					  }
					: state;
			break;
		case TYPES.SET_REDIRECT_URL:
			newState =
				url !== undefined && url !== state.redirectUrl
					? {
							...state,
							redirectUrl: url,
					  }
					: state;
			break;
		case TYPES.SET_PROCESSING_RESPONSE:
			newState = {
				...state,
				processingResponse: ( data as PaymentResultDataType ) || null,
			};
			break;

		case TYPES.SET_COMPLETE:
			newState =
				state.status !== STATUS.COMPLETE
					? {
							...state,
							status: STATUS.COMPLETE,
							redirectUrl:
								data !== undefined &&
								data.redirectUrl !== undefined
									? ( data.redirectUrl as string )
									: state.redirectUrl,
					  }
					: state;
			break;
		case TYPES.SET_PROCESSING:
			newState =
				state.status !== STATUS.PROCESSING
					? {
							...state,
							status: STATUS.PROCESSING,
							hasError: false,
					  }
					: state;
			// clear any error state.
			newState =
				newState.hasError === false
					? newState
					: { ...newState, hasError: false };
			break;
		case TYPES.SET_BEFORE_PROCESSING:
			newState =
				state.status !== STATUS.BEFORE_PROCESSING
					? {
							...state,
							status: STATUS.BEFORE_PROCESSING,
							hasError: false,
					  }
					: state;
			break;
		case TYPES.SET_AFTER_PROCESSING:
			newState =
				state.status !== STATUS.AFTER_PROCESSING
					? {
							...state,
							status: STATUS.AFTER_PROCESSING,
					  }
					: state;
			break;
		case TYPES.SET_HAS_ERROR:
			newState = state.hasError
				? state
				: {
						...state,
						hasError: true,
				  };
			newState =
				state.status === STATUS.PROCESSING ||
				state.status === STATUS.BEFORE_PROCESSING
					? {
							...newState,
							status: STATUS.IDLE,
					  }
					: newState;
			break;
		case TYPES.SET_NO_ERROR:
			newState = state.hasError
				? {
						...state,
						hasError: false,
				  }
				: state;
			break;
		case TYPES.INCREMENT_CALCULATING:
			newState = {
				...state,
				calculatingCount: state.calculatingCount + 1,
			};
			break;
		case TYPES.DECREMENT_CALCULATING:
			newState = {
				...state,
				calculatingCount: Math.max( 0, state.calculatingCount - 1 ),
			};
			break;
		case TYPES.SET_CUSTOMER_ID:
			newState =
				customerId !== undefined
					? {
							...state,
							customerId,
					  }
					: state;
			break;
		case TYPES.SET_ORDER_ID:
			newState =
				orderId !== undefined
					? {
							...state,
							orderId,
					  }
					: state;
			break;
		case TYPES.SET_SHOULD_CREATE_ACCOUNT:
			if (
				shouldCreateAccount !== undefined &&
				shouldCreateAccount !== state.shouldCreateAccount
			) {
				newState = {
					...state,
					shouldCreateAccount,
				};
			}
			break;
		case TYPES.SET_ORDER_NOTES:
			if ( orderNotes !== undefined && state.orderNotes !== orderNotes ) {
				newState = {
					...state,
					orderNotes,
				};
			}
			break;
	}
	// automatically update state to idle from pristine as soon as it initially changes.
	if (
		newState !== state &&
		type !== TYPES.SET_PRISTINE &&
		newState.status === STATUS.PRISTINE
	) {
		newState.status = STATUS.IDLE;
	}
	return newState;
};
