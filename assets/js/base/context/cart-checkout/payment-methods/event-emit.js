/**
 * Internal dependencies
 */
import { actions, reducer, emitEvent, emitEventWithAbort } from '../event-emit';

const EMIT_TYPES = {
	PAYMENT_PROCESSING: 'payment_processing',
	PAYMENT_SUCCESS: 'payment_success',
	PAYMENT_FAIL: 'payment_fail',
	PAYMENT_HAS_ERROR: 'payment_has_error',
};

/**
 * Receives a reducer dispatcher and returns an object with the
 * various event emitters for the payment processing events.
 *
 * Calling the event registration function with the callback will register it
 * for the event emitter and will return a dispatcher for removing the
 * registered callback (useful for implementation in `useEffect`).
 *
 * @param {Function} dispatcher The emitter reducer dispatcher.
 *
 * @return {Object} An object with the various payment event emitter
 *                  registration functions
 */
const emitterSubscribers = ( dispatcher ) => ( {
	onPaymentProcessing: ( callback, priority ) => {
		const action = actions.addEventCallback(
			EMIT_TYPES.PAYMENT_PROCESSING,
			callback,
			priority
		);
		dispatcher( action );
		return () => {
			dispatcher(
				actions.removeEventCallback(
					EMIT_TYPES.PAYMENT_PROCESSING,
					action.id
				)
			);
		};
	},
	onPaymentSuccess: ( callback, priority ) => {
		const action = actions.addEventCallback(
			EMIT_TYPES.PAYMENT_SUCCESS,
			callback,
			priority
		);
		dispatcher( action );
		return () => {
			dispatcher(
				actions.removeEventCallback(
					EMIT_TYPES.PAYMENT_SUCCESS,
					action.id
				)
			);
		};
	},
	onPaymentFail: ( callback, priority ) => {
		const action = actions.addEventCallback(
			EMIT_TYPES.PAYMENT_FAIL,
			callback,
			priority
		);
		dispatcher( action );
		return () => {
			dispatcher(
				actions.removeEventCallback(
					EMIT_TYPES.PAYMENT_FAIL,
					action.id
				)
			);
		};
	},
	onPaymentError: ( callback, priority ) => {
		const action = actions.addEventCallback(
			EMIT_TYPES.PAYMENT_HAS_ERROR,
			callback,
			priority
		);
		dispatcher( action );
		return () => {
			dispatcher(
				actions.removeEventCallback(
					EMIT_TYPES.PAYMENT_HAS_ERROR,
					action.id
				)
			);
		};
	},
} );

export {
	EMIT_TYPES,
	emitterSubscribers,
	reducer,
	emitEvent,
	emitEventWithAbort,
};
