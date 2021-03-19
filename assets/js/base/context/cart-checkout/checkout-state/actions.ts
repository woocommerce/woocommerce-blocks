/**
 * Internal dependencies
 */
import { TYPES } from './constants';
import type { PaymentResultDataType } from './types';

export interface ActionType {
	type: TYPES;
	data?:
		| Record< string, unknown >
		| Record< string, never >
		| PaymentResultDataType;
	url?: string;
	customerId?: number;
	orderId?: number;
	shouldCreateAccount?: boolean;
	hasError?: boolean;
	orderNotes?: string;
}

/**
 * All the actions that can be dispatched for the checkout.
 */
export const actions = {
	setPristine: (): ActionType => ( {
		type: TYPES.SET_PRISTINE,
	} ),
	setIdle: (): ActionType => ( {
		type: TYPES.SET_IDLE,
	} ),
	setProcessing: (): ActionType => ( {
		type: TYPES.SET_PROCESSING,
	} ),
	setRedirectUrl: ( url: string ): ActionType => ( {
		type: TYPES.SET_REDIRECT_URL,
		url,
	} ),
	setProcessingResponse: ( data: PaymentResultDataType ): ActionType => ( {
		type: TYPES.SET_PROCESSING_RESPONSE,
		data,
	} ),
	setComplete: ( data: Record< string, unknown > = {} ): ActionType => ( {
		type: TYPES.SET_COMPLETE,
		data,
	} ),
	setBeforeProcessing: (): ActionType => ( {
		type: TYPES.SET_BEFORE_PROCESSING,
	} ),
	setAfterProcessing: (): ActionType => ( {
		type: TYPES.SET_AFTER_PROCESSING,
	} ),
	setHasError: ( hasError = true ): ActionType => {
		const type = hasError ? TYPES.SET_HAS_ERROR : TYPES.SET_NO_ERROR;
		return { type };
	},
	incrementCalculating: (): ActionType => ( {
		type: TYPES.INCREMENT_CALCULATING,
	} ),
	decrementCalculating: (): ActionType => ( {
		type: TYPES.DECREMENT_CALCULATING,
	} ),
	setCustomerId: ( customerId: number ): ActionType => ( {
		type: TYPES.SET_CUSTOMER_ID,
		customerId,
	} ),
	setOrderId: ( orderId: number ): ActionType => ( {
		type: TYPES.SET_ORDER_ID,
		orderId,
	} ),
	setShouldCreateAccount: ( shouldCreateAccount: boolean ): ActionType => ( {
		type: TYPES.SET_SHOULD_CREATE_ACCOUNT,
		shouldCreateAccount,
	} ),
	setOrderNotes: ( orderNotes: string ): ActionType => ( {
		type: TYPES.SET_ORDER_NOTES,
		orderNotes,
	} ),
};
