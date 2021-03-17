/**
 * External dependencies
 */
import { doAction } from '@wordpress/hooks';
import { useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { useStoreCart } from './cart/use-store-cart';
import { useCheckoutContext } from '../context/cart-checkout/checkout-state';

type StoreEvent = (
	eventName: string,
	eventParams?: Partial< Record< string, unknown > >
) => void;

/**
 * Abstraction on top of @wordpress/hooks for dispatching events via doAction for 3rd parties to hook into.
 */
export const useStoreEvents = (
	namespace = 'experimental__woocommerce_blocks'
): {
	dispatchStoreEvent: StoreEvent;
	dispatchCheckoutEvent: StoreEvent;
} => {
	const storeCart = useStoreCart();
	const checkoutData = useCheckoutContext();

	const dispatchStoreEvent = useCallback(
		( eventName, eventParams = {} ) => {
			// eslint-disable-next-line no-console
			console.log( {
				event: `${ namespace }-${ eventName }`,
				eventParams,
			} );

			try {
				doAction( `${ namespace }-${ eventName }`, eventParams );
			} catch ( e ) {
				// We don't handle thrown errors but just console.log for troubleshooting.
				// eslint-disable-next-line no-console
				console.error( e );
			}
		},
		[ namespace ]
	);

	const dispatchCheckoutEvent = useCallback(
		( eventName, eventParams = {} ) => {
			// eslint-disable-next-line no-console
			console.log( {
				event: `${ namespace }-checkout-${ eventName }`,
				eventParams: {
					...eventParams,
					storeCart,
					checkoutData,
				},
			} );

			try {
				doAction( `${ namespace }-checkout-${ eventName }`, {
					...eventParams,
					storeCart,
					checkoutData,
				} );
			} catch ( e ) {
				// We don't handle thrown errors but just console.log for troubleshooting.
				// eslint-disable-next-line no-console
				console.error( e );
			}
		},
		[ namespace, storeCart, checkoutData ]
	);

	return { dispatchStoreEvent, dispatchCheckoutEvent };
};
