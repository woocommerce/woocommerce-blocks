/**
 * External dependencies
 */
import { PaymentResult } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import { ACTION_TYPES as types } from './action-types';
import { ReturnOrGeneratorYieldUnion } from '../mapped-types';

// `Thunks are functions that can be dispatched, similar to actions creators
export * from './thunks';

/**
 * Set the checkout status to `idle`
 */
export const __internalSetIdle = () => ( {
	type: types.SET_IDLE,
} );

/**
 * Set the checkout status to `before_processing`
 */
export const __internalSetBeforeProcessing = () => ( {
	type: types.SET_BEFORE_PROCESSING,
} );

/**
 * Set the checkout status to `processing`
 */
export const __internalSetProcessing = () => ( {
	type: types.SET_PROCESSING,
} );

/**
 * Set the checkout status to `after_processing`
 */
export const __internalSetAfterProcessing = () => ( {
	type: types.SET_AFTER_PROCESSING,
} );

/**
 * Set the checkout status to `complete`
 */
export const __internalSetComplete = (
	data: Record< string, unknown > = {}
) => ( {
	type: types.SET_COMPLETE,
	data,
} );

/**
 * Set the url to redirect to after checkout completes`
 *
 * @param  redirectUrl the url to redirect to
 */
export const __internalSetRedirectUrl = ( redirectUrl: string ) => ( {
	type: types.SET_REDIRECT_URL,
	redirectUrl,
} );

/**
 * Store the result of the payment attempt from the /checkout StoreApi call
 *
 * @param  data The result of the payment attempt through the StoreApi /checkout endpoints
 */
export const __internalSetPaymentResult = ( data: PaymentResult ) => ( {
	type: types.SET_PAYMENT_RESULT,
	data,
} );

/**
 * Set whether the checkout has an error or not
 *
 * @param  hasError Wether the checkout has an error or not
 */
export const __internalSetHasError = ( hasError = true ) => ( {
	type: types.SET_HAS_ERROR,
	hasError,
} );

/**
 * Used when any of the totals, taxes, shipping, etc need to be calculated, the `calculatingCount` will be increased
 * A `calculatingCount` of 0 means nothing is being updated.
 */
export const __internalIncrementCalculating = () => ( {
	type: types.INCREMENT_CALCULATING,
} );

/**
 * When any of the totals, taxes, shipping, etc are done beign calculated, the `calculatingCount` will be decreased
 * A `calculatingCount` of 0 means nothing is being updated.
 */
export const __internalDecrementCalculating = () => ( {
	type: types.DECREMENT_CALCULATING,
} );

/**
 * Set the customer id
 *
 * @param  customerId ID of the customer who is checking out.
 */
export const __internalSetCustomerId = ( customerId: number ) => ( {
	type: types.SET_CUSTOMER_ID,
	customerId,
} );

/**
 * Whether to use the shipping address as the billing address
 *
 * @param  useShippingAsBilling True if shipping address should be the same as billing, false otherwise
 */
export const __internalSetUseShippingAsBilling = (
	useShippingAsBilling: boolean
) => ( {
	type: types.SET_SHIPPING_ADDRESS_AS_BILLING_ADDRESS,
	useShippingAsBilling,
} );

/**
 * Whether an account should be created for the user while checking out
 *
 * @param  shouldCreateAccount True if an account should be created, false otherwise
 */
export const __internalSetShouldCreateAccount = (
	shouldCreateAccount: boolean
) => ( {
	type: types.SET_SHOULD_CREATE_ACCOUNT,
	shouldCreateAccount,
} );

/**
 * Set the notes for the order
 *
 * @param  orderNotes String that represents a note for the order
 */
export const __internalSetOrderNotes = ( orderNotes: string ) => ( {
	type: types.SET_ORDER_NOTES,
	orderNotes,
} );

/**
 * Register some extra data for an extension. This works with the
 *
 * @param  extensionData An object containing the data to register for an extension
 */
export const __internalSetExtensionData = (
	extensionData: Record< string, Record< string, unknown > >
) => ( {
	type: types.SET_EXTENSION_DATA,
	extensionData,
} );

export type CheckoutAction =
	| ReturnOrGeneratorYieldUnion<
			| typeof __internalSetIdle
			| typeof __internalSetComplete
			| typeof __internalSetProcessing
			| typeof __internalSetPaymentResult
			| typeof __internalSetBeforeProcessing
			| typeof __internalSetAfterProcessing
			| typeof __internalSetRedirectUrl
			| typeof __internalSetHasError
			| typeof __internalIncrementCalculating
			| typeof __internalDecrementCalculating
			| typeof __internalSetCustomerId
			| typeof __internalSetUseShippingAsBilling
			| typeof __internalSetShouldCreateAccount
			| typeof __internalSetOrderNotes
			| typeof __internalSetExtensionData
	  >
	| Record< string, never >;
