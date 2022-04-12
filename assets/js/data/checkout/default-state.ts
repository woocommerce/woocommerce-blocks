/**
 * Internal dependencies
 */
import { STATUS } from './constants';

export const defaultState = {
	redirectUrl: '',
	status: STATUS.PRISTINE,
	isComplete: false,
	isIdle: false,
	isCalculating: false,
	isProcessing: false,
	isBeforeProcessing: false,
	isAfterProcessing: false,
	isCart: false,
	hasError: false,
	hasOrder: false,
	orderId: 0,
	customerId: 0,
	calculatingCount: 0,
	orderNotes: '',
	useShippingAsBilling: false,
	shouldCreateAccount: false,
	processingResponse: null,
	extensionData: {},
	onSubmit: () => void null,
	onCheckoutAfterProcessingWithSuccess: () => () => void null,
	onCheckoutAfterProcessingWithError: () => () => void null,
	onCheckoutBeforeProcessing: () => () => void null, // deprecated for onCheckoutValidationBeforeProcessing
	onCheckoutValidationBeforeProcessing: () => () => void null,
	setUseShippingAsBilling: ( value ) => void value, // turn into an action
	setShouldCreateAccount: ( value ) => void value, // turn into an action
};
