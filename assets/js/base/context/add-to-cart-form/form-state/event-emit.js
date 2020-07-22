/**
 * Internal dependencies
 */
import {
	emitterCallback,
	reducer,
	emitEvent,
	emitEventWithAbort,
} from '../../shared/event-emit';

const EMIT_TYPES = {
	ADD_TO_CART_BEFORE_PROCESSING: 'add_to_cart_before_processing',
	ADD_TO_CART_AFTER_PROCESSING_WITH_SUCCESS:
		'add_to_cart_after_processing_with_success',
	ADD_TO_CART_AFTER_PROCESSING_WITH_ERROR:
		'add_to_cart_after_processing_with_error',
};

/**
 * Receives a reducer dispatcher and returns an object with the
 * callback registration function for the checkout emit
 * events.
 *
 * Calling the event registration function with the callback will register it
 * for the event emitter and will return a dispatcher for removing the
 * registered callback (useful for implementation in `useEffect`).
 *
 * @param {Function} dispatcher The emitter reducer dispatcher.
 *
 * @return {Object} An object with the checkout emitter registration
 */
const emitterSubscribers = ( dispatcher ) => ( {
	onAddToCartAfterProcessingWithSuccess: emitterCallback(
		EMIT_TYPES.ADD_TO_CART_AFTER_PROCESSING_WITH_SUCCESS,
		dispatcher
	),
	onAddToCartProcessingWithError: emitterCallback(
		EMIT_TYPES.ADD_TO_CART_AFTER_PROCESSING_WITH_ERROR,
		dispatcher
	),
	onAddToCartBeforeProcessing: emitterCallback(
		EMIT_TYPES.ADD_TO_CART_BEFORE_PROCESSING,
		dispatcher
	),
} );

export {
	EMIT_TYPES,
	emitterSubscribers,
	reducer,
	emitEvent,
	emitEventWithAbort,
};
