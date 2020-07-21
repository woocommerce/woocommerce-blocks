/**
 * Internal dependencies
 */
import { EMIT_TYPES } from './constants';
import {
	emitterCallback,
	reducer,
	emitEvent,
	emitEventWithAbort,
} from '../../shared/event-emit';

const {
	ADD_TO_CART_AFTER_PROCESSING_WITH_SUCCESS,
	ADD_TO_CART_AFTER_PROCESSING_WITH_ERROR,
	ADD_TO_CART_BEFORE_PROCESSING,
} = EMIT_TYPES;

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
		ADD_TO_CART_AFTER_PROCESSING_WITH_SUCCESS,
		dispatcher
	),
	onAddToCartProcessingWithError: emitterCallback(
		ADD_TO_CART_AFTER_PROCESSING_WITH_ERROR,
		dispatcher
	),
	onAddToCartBeforeProcessing: emitterCallback(
		ADD_TO_CART_BEFORE_PROCESSING,
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
