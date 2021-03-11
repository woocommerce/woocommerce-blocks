/**
 * External dependencies
 */
import { doAction } from '@wordpress/hooks';
import { useCallback } from '@wordpress/element';

/**
 * Abstraction on top of @wordpress/hooks for dispatching events via doAction for 3rd parties to hook into.
 */
export const useStoreEvents = (
	namespace = 'experimental__woocommerce_blocks'
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
	const dispatchEvent = useCallback(
		(
			eventName: string,
			eventParams: Partial< Record< string, unknown > >
		) => {
			doAction( `${ namespace }-${ eventName }`, eventParams );
			// eslint-disable-next-line no-console
			console.log( {
				event: `${ namespace }-${ eventName }`,
				eventParams,
			} );
		},
		[ namespace ]
	);

	return {
		dispatchEvent,
	};
};
