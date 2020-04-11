/**
 * Internal dependencies
 */
import {
	emitterCallback,
	reducer,
	emitEvent,
	emitEventWithAbort,
} from '../event-emit';

const EMIT_TYPES = {
	CHECKOUT_COMPLETE_WITH_SUCCESS: 'checkout_complete',
	CHECKOUT_COMPLETE_WITH_ERROR: 'checkout_complete_error',
	CHECKOUT_BEFORE_PROCESSING: 'checkout_before_processing',
};

/**
 * Receives a reducer dispatcher and returns an object with the
 * onCheckoutComplete callback registration function for the checkout emit
 * events.
 *
 * Calling the event registration function with the callback will register it
 * for the event emitter and will return a dispatcher for removing the
 * registered callback (useful for implementation in `useEffect`).
 *
 * @param {Function} dispatcher The emitter reducer dispatcher.
 *
 * @return {Object} An object with the `onCheckoutComplete` emmitter registration
 */
const emitterSubscribers = ( dispatcher ) => ( {
	onCheckoutCompleteSuccess: emitterCallback(
		EMIT_TYPES.CHECKOUT_COMPLETE_WITH_SUCCESS,
		dispatcher
	),
	onCheckoutCompleteError: emitterCallback(
		EMIT_TYPES.CHECKOUT_COMPLETE_WITH_ERROR,
		dispatcher
	),
	onCheckoutBeforeProcessing: emitterCallback(
		EMIT_TYPES.CHECKOUT_BEFORE_PROCESSING,
		dispatcher
	),
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
