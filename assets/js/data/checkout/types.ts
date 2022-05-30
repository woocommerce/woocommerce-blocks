/**
 * External dependencies
 */
import type { createErrorNotice as originalCreateErrorNotice } from '@wordpress/notices/store/actions';
import type { Notice } from '@wordpress/notices/';
import { FunctionKeys } from 'utility-types';

/**
 * Internal dependencies
 */
import { EventObserversType } from '../../base/context/event-emit/types';
import type { CheckoutActions } from './actions';
import * as selectors from './selectors';
import { CheckoutState } from './default-state';

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
	createErrorNotice,
	notices,
}: {
	observers: EventObserversType;
	createErrorNotice: typeof originalCreateErrorNotice;
	notices: CheckoutAndPaymentNotices;
} ) => ( {
	select,
	dispatch,
}: {
	select: SelectFromMap< typeof selectors >;
	dispatch: CheckoutActions;
} ) => void;

/**
 * Type for emitValidateEventType() thunk
 */
export type emitValidateEventType = ( {
	observers,
	createErrorNotice,
	setValidationErrors,
}: {
	observers: EventObserversType;
	createErrorNotice: typeof originalCreateErrorNotice;
} ) => ( {
	select,
	dispatch,
}: {
	select: SelectFromMap< typeof selectors >;
	dispatch: CheckoutActions;
} ) => void;

/**
 * Maps a "raw" selector object to the selectors available when registered on the @wordpress/data store.
 * Copied from Calypso https://github.com/Automattic/wp-calypso/blob/aa10e05b8b1c7ab369b08a340052578a512cffc4/packages/data-stores/src/mapped-types.ts#L21-L31
 *
 * @template S Selector map, usually from `import * as selectors from './my-store/selectors';`
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type SelectFromMap< S extends object > = {
	[ selector in FunctionKeys< S > ]: (
		...args: TailParameters< CastToFunction< S[ selector ] > >
	) => ReturnType< CastToFunction< S[ selector ] > >;
};

/**
 * Parameters type of a function, excluding the first parameter.
 *
 * This is useful for typing some @wordpres/data functions that make a leading
 * `state` argument implicit.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type TailParameters< F extends Function > = F extends (
	head: any, //eslint-disable-line @typescript-eslint/no-explicit-any
	...tail: infer T
) => any //eslint-disable-line @typescript-eslint/no-explicit-any
	? T
	: never;

// See https://github.com/microsoft/TypeScript/issues/46855#issuecomment-974484444
type Cast< T, U > = T extends U ? T : T & U;
type CastToFunction< T > = Cast< T, ( ...args: any[] ) => any >; //eslint-disable-line @typescript-eslint/no-explicit-any
