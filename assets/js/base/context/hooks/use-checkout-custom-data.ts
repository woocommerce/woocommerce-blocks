/**
 * External dependencies
 */
import { useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { useCheckoutContext } from '../providers/cart-checkout/checkout-state';

/**
 * Custom hook for setting custom checkout data which is passed to the wc/store/checkout endpoint when processing orders.
 */
export const useCheckoutData = (): {
	customData: Record< string, unknown > | Record< string, never >;
	setCustomData: ( key: string, value: unknown ) => void;
} => {
	const { dispatchActions, customData } = useCheckoutContext();

	const setCustomData = useCallback( ( key, value ) => {
		dispatchActions.setCustomData( {
			...customData,
			[ key ]: value,
		} );
	}, [] );

	return {
		customData,
		setCustomData,
	};
};
