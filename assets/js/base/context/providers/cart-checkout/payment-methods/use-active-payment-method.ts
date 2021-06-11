/**
 * External dependencies
 */
import { useState, useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { useStoreEvents } from '../../../hooks/use-store-events';

export const useActivePaymentMethod = (): {
	activePaymentMethod: string;
	activeSavedToken: string;
	setActivePaymentMethod: ( paymentMethodSlug: string ) => void;
	setActiveSavedToken: ( token: string ) => void;
} => {
	const { dispatchCheckoutEvent } = useStoreEvents();

	// The active payment method - e.g. Stripe CC or BACS.
	const [ activePaymentMethod, setActive ] = useState( '' );

	// If a previously saved payment method is active, the token for that method. For example, a for a Stripe CC card saved to user account.
	const [ activeSavedToken, setActiveSavedToken ] = useState( '' );

	/**
	 * Callback function for setting the active payment method and triggering an event to track.
	 */
	const setActivePaymentMethod = useCallback(
		( paymentMethodSlug ) => {
			setActive( paymentMethodSlug );
			dispatchCheckoutEvent( 'set-active-payment-method', {
				paymentMethodSlug,
			} );
		},
		[ dispatchCheckoutEvent ]
	);

	return {
		activePaymentMethod,
		activeSavedToken,
		setActivePaymentMethod,
		setActiveSavedToken,
	};
};
