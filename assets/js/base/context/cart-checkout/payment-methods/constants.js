/**
 * @typedef {import('@woocommerce/type-defs/contexts').PaymentMethodDataContext} PaymentMethodDataContext
 */

export const STATUS = {
	PRISTINE: 'pristine',
	STARTED: 'started',
	PROCESSING: 'processing',
	ERROR: 'has_error',
	FAILED: 'failed',
	SUCCESS: 'success',
	COMPLETE: 'complete',
};

export const ACTION_TYPES = {
	...STATUS,
	SET_REGISTERED_PAYMENT_METHODS: 'set_registered_payment_methods',
	SET_REGISTERED_EXPRESS_PAYMENT_METHODS:
		'set_registered_express_payment_methods',
};

/**
 * @todo do typedefs for the payment event state.
 */

export const DEFAULT_PAYMENT_DATA = {
	currentStatus: STATUS.PRISTINE,
	paymentMethodData: {
		payment_method: '',
		// arbitrary data the payment method
		// wants to pass along for payment
		// processing server side.
	},
	errorMessage: '',
	paymentMethods: {},
	expressPaymentMethods: {},
};

/**
 * @type {PaymentMethodDataContext}
 */
export const DEFAULT_PAYMENT_METHOD_DATA = {
	setPaymentStatus: () => ( {
		started: () => void null,
		processing: () => void null,
		completed: () => void null,
		error: ( errorMessage ) => void errorMessage,
		failed: ( errorMessage, paymentMethodData ) =>
			void [ errorMessage, paymentMethodData ],
		success: ( paymentMethodData, billingData ) =>
			void [ paymentMethodData, billingData ],
	} ),
	currentStatus: {
		isPristine: true,
		isStarted: false,
		isProcessing: false,
		isFinished: false,
		hasError: false,
		hasFailed: false,
		isSuccessful: false,
	},
	paymentStatuses: STATUS,
	paymentMethodData: {},
	errorMessage: '',
	activePaymentMethod: '',
	setActivePaymentMethod: () => void null,
	customerPaymentMethods: {},
	paymentMethods: {},
	expressPaymentMethods: {},
	paymentMethodsInitialized: false,
	expressPaymentMethodsInitialized: false,
	onPaymentProcessing: () => void null,
	onPaymentSuccess: () => void null,
	onPaymentFail: () => void null,
};
