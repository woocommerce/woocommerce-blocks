/**
 * External dependencies
 */
import { doAction, addAction } from '@wordpress/hooks';
import { useRef, useEffect, useCallback } from '@wordpress/element';

/**
 * Abstraction on top of @wordpress/hooks for dispatching events via doAction for 3rd parties to hook into.
 */
export const useStoreEvents = (
	namespace = 'woocommerce_blocks'
): {
	dispatchEvent: (
		eventName: string,
		eventParams: Partial< Record< string, unknown > >
	) => void;
	dispatchEventOnce: (
		eventName: string,
		eventParams: Partial< Record< string, unknown > >
	) => void;
} => {
	const firstMount = useRef( true );

	const dispatchEvent = useCallback(
		(
			eventName: string,
			eventParams: Partial< Record< string, unknown > >
		) => {
			doAction(
				`__experimental_${ namespace }-${ eventName }`,
				eventParams
			);
			// eslint-disable-next-line no-console
			console.log( {
				event: `__experimental_${ namespace }-${ eventName }`,
				eventParams,
			} );
		},
		[ namespace ]
	);

	const dispatchEventOnce = useCallback(
		(
			eventName: string,
			eventParams: Partial< Record< string, unknown > >
		) => {
			if ( firstMount.current ) {
				doAction( `${ namespace }/${ eventName }`, eventParams );
			}
		},
		[ namespace ]
	);

	useEffect( () => {
		firstMount.current = false;
	}, [] );

	return {
		dispatchEvent,
		dispatchEventOnce,
	};
};
