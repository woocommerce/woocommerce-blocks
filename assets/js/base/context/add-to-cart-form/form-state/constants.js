export const STATUS = {
	PRISTINE: 'pristine',
	IDLE: 'idle',
	PROCESSING: 'processing',
	BEFORE_PROCESSING: 'before_processing',
	AFTER_PROCESSING: 'after_processing',
};

export const DEFAULT_STATE = {
	status: STATUS.PRISTINE,
	hasError: false,
	quantity: 1,
	processingResponse: null,
	formData: {},
};

export const ACTION_TYPES = {
	SET_IDLE: 'set_idle',
	SET_PRISTINE: 'set_pristine',
	SET_PROCESSING: 'set_processing',
	SET_BEFORE_PROCESSING: 'set_before_processing',
	SET_AFTER_PROCESSING: 'set_after_processing',
	SET_PROCESSING_RESPONSE: 'set_processing_response',
	SET_HAS_ERROR: 'set_has_error',
	SET_NO_ERROR: 'set_no_error',
	SET_QUANTITY: 'set_quantity',
	SET_FORM_DATA: 'set_form_data',
};

export const EMIT_TYPES = {
	ADD_TO_CART_BEFORE_PROCESSING: 'add_to_cart_before_processing',
	ADD_TO_CART_AFTER_PROCESSING_WITH_SUCCESS:
		'add_to_cart_after_processing_with_success',
	ADD_TO_CART_AFTER_PROCESSING_WITH_ERROR:
		'add_to_cart_after_processing_with_error',
};
