/**
 * External dependencies
 */
import { doAction } from '@wordpress/hooks';
import { useCallback, useRef, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { useStoreCart } from './cart/use-store-cart';

type StoreEvent = (
	eventName: string,
	eventParams?: Partial< Record< string, unknown > >
) => void;

/**
 * Abstraction on top of @wordpress/hooks for dispatching events via doAction for 3rd parties to hook into.
 */
export const useStoreEvents = (): {
	dispatchStoreEvent: StoreEvent;
	dispatchCheckoutEvent: StoreEvent;
} => {
	const storeCart = useStoreCart();
	const currentStoreCart = useRef( storeCart );

	useEffect( () => {
		currentStoreCart.current = storeCart;
	}, [ storeCart ] );

	const dispatchStoreEvent = useCallback( ( eventName, eventParams = {} ) => {
		try {
			doAction(
				`experimental__woocommerce_blocks-${ eventName }`,
				eventParams
			);
		} catch ( e ) {
			// We don't handle thrown errors but just console.log for troubleshooting.
			// eslint-disable-next-line no-console
			console.error( e );
		}
	}, [] );

	const dispatchCheckoutEvent = useCallback(
		( eventName, eventParams = {} ) => {
			try {
				const cartParam = currentStoreCart.current;

				doAction(
					`experimental__woocommerce_blocks-checkout-${ eventName }`,
					{
						...eventParams,
						cartParam,
					}
				);
			} catch ( e ) {
				// We don't handle thrown errors but just console.log for troubleshooting.
				// eslint-disable-next-line no-console
				console.error( e );
			}
		},
		[]
	);

	return { dispatchStoreEvent, dispatchCheckoutEvent };
};
