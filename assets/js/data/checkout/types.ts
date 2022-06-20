/**
 * External dependencies
 */
import type { Notice } from '@wordpress/notices/';

/**
 * Internal dependencies
 */
import type { EventObserversType } from '../../base/context/event-emit/types';
import type { CheckoutState } from './default-state';
import type { DispatchFromMap, SelectFromMap } from '../mapped-types';
import * as selectors from './selectors';
import * as actions from './actions';

export type CheckoutAfterProcessingWithErrorEventData = {
	redirectUrl: CheckoutState[ 'redirectUrl' ];
	orderId: CheckoutState[ 'orderId' ];
	customerId: CheckoutState[ 'customerId' ];
	orderNotes: CheckoutState[ 'orderNotes' ];
	processingResponse: CheckoutState[ 'processingResponse' ];
};
export type CheckoutAndPaymentNotices = {
	checkoutNotices: Notice[];
	paymentNotices: Notice[];
	expressPaymentNotices: Notice[];
};

/**
 * Type for emitAfterProcessingEventsType() thunk
 */
export type emitAfterProcessingEventsType = ( {
	observers,
	notices,
}: {
	observers: EventObserversType;
	notices: CheckoutAndPaymentNotices;
} ) => ( {
	select,
	dispatch,
}: {
	select: SelectFromMap< typeof selectors >;
	dispatch: DispatchFromMap< typeof actions >;
} ) => void;

/**
 * Type for emitValidateEventType() thunk
 */
export type emitValidateEventType = ( {
	observers,
	setValidationErrors,
}: {
	observers: EventObserversType;
	setValidationErrors: ( errors: Array< unknown > ) => void;
} ) => ( {
	dispatch,
}: {
	dispatch: DispatchFromMap< typeof actions >;
} ) => void;
