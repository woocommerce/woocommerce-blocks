/**
 * Internal dependencies
 */
import { ACTION } from './constants';
import type { PaymentResultDataType } from './types';

export interface ActionType {
	type: ACTION;
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
		type: ACTION.SET_PRISTINE,
	} ),
	setIdle: (): ActionType => ( {
		type: ACTION.SET_IDLE,
	} ),
	setProcessing: (): ActionType => ( {
		type: ACTION.SET_PROCESSING,
	} ),
	setRedirectUrl: ( url: string ): ActionType => ( {
		type: ACTION.SET_REDIRECT_URL,
		url,
	} ),
	setProcessingResponse: ( data: PaymentResultDataType ): ActionType => ( {
		type: ACTION.SET_PROCESSING_RESPONSE,
		data,
	} ),
	setComplete: ( data: Record< string, unknown > = {} ): ActionType => ( {
		type: ACTION.SET_COMPLETE,
		data,
	} ),
	setBeforeProcessing: (): ActionType => ( {
		type: ACTION.SET_BEFORE_PROCESSING,
	} ),
	setAfterProcessing: (): ActionType => ( {
		type: ACTION.SET_AFTER_PROCESSING,
	} ),
	setHasError: ( hasError = true ): ActionType => {
		const type = hasError ? ACTION.SET_HAS_ERROR : ACTION.SET_NO_ERROR;
		return { type };
	},
	incrementCalculating: (): ActionType => ( {
		type: ACTION.INCREMENT_CALCULATING,
	} ),
	decrementCalculating: (): ActionType => ( {
		type: ACTION.DECREMENT_CALCULATING,
	} ),
	setCustomerId: ( customerId: number ): ActionType => ( {
		type: ACTION.SET_CUSTOMER_ID,
		customerId,
	} ),
	setOrderId: ( orderId: number ): ActionType => ( {
		type: ACTION.SET_ORDER_ID,
		orderId,
	} ),
	setShouldCreateAccount: ( shouldCreateAccount: boolean ): ActionType => ( {
		type: ACTION.SET_SHOULD_CREATE_ACCOUNT,
		shouldCreateAccount,
	} ),
	setOrderNotes: ( orderNotes: string ): ActionType => ( {
		type: ACTION.SET_ORDER_NOTES,
		orderNotes,
	} ),
};
