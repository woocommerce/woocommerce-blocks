/**
 * External dependencies
 */
import { useCartEventsContext } from '@woocommerce/base-context';
import { useDispatch, useSelect } from '@wordpress/data';
import { STORE_NOTICES_STORE_KEY } from '@woocommerce/block-data';
import { useEffect } from '@wordpress/element';
import { Notice } from '@wordpress/notices';

/**
 * This hook will add an observer to the `onProceedToCheckout` event and return an error if there are any non-snackbar
 * error notices present in a WooCommerce Blocks notice context.
 *
 * We keep a record of the registered WooCommerce Blocks notice contexts in the `wc/store/notices` store.
 */
export const usePreventCheckoutWithNotices = () => {
	const { onProceedToCheckout } = useCartEventsContext();
	const { highlightNotice } = useDispatch( STORE_NOTICES_STORE_KEY );

	// We need to know every WooCommerce Blocks notice context, and the notices within them, however we only want
	// to get when the shopper clicks "Proceed to Checkout". Therefore, we only return the selector, not the selector's
	// value. We can execute the selector later to get the value when it is needed.
	const { getRegisteredContainers, getNotices } = useSelect( ( select ) => {
		return {
			getRegisteredContainers: select( STORE_NOTICES_STORE_KEY )
				.getRegisteredContainers,
			getNotices: select( 'core/notices' ).getNotices,
		};
	} );

	// This useEffect will register an observer for the `onProceedToCheckout` event. `onProceedToCheckout` returns an
	// unsubscribe function, so if the component using this hook unmounts, the observer will be unsubscribed.
	useEffect( () => {
		return onProceedToCheckout( () => {
			// Select only notices with status error and type default (i.e. not a snackbar notice). We also only want to
			// select non-dismissible errors, because errors that ARE dismissible should not prevent the checkout.
			const errorNoticesWithContext = getRegisteredContainers().flatMap(
				( context ) => {
					const noticesForContext = getNotices( context ).filter(
						( notice ) =>
							notice.type === 'default' &&
							notice.status === 'error' &&
							! notice.isDismissible
					);
					// Inject the `context` property into the notice object, since it's not there by default, but we do
					// need it later to highlight the notice.
					return noticesForContext.map( ( notice ) => ( {
						...notice,
						context,
					} ) ) as ( Notice & { context: 'string' } )[];
				}
			);

			if ( errorNoticesWithContext.length === 0 ) {
				return true;
			}

			// Only highlight the first notice.
			highlightNotice(
				errorNoticesWithContext[ 0 ].context,
				errorNoticesWithContext[ 0 ].id
			);

			// The observer should return an object with type: error so the event emitter knows not to continue. This will
			// prevent the shopper proceeding to checkout.
			return {
				type: 'error',
				message: errorNoticesWithContext[ 0 ].content,
			};
		} );
	}, [
		onProceedToCheckout,
		highlightNotice,
		getRegisteredContainers,
		getNotices,
	] );
};
