/**
 * External dependencies
 */
import { useEffect, useRef } from '@wordpress/element';
import { BillingAddress } from '@woocommerce/settings';

/**
 * Internal dependencies
 */
import { useCustomerData } from './use-customer-data';

export const useShippingAsBillingCheckbox = (): {
	setShippingAsBilling: ( data: boolean ) => void;
} => {
	const {
		shippingAsBilling,
		billingData,
		shippingAddress,
		setBillingData,
		setShippingAsBilling,
	} = useCustomerData();
	const currentShippingAsBilling = useRef< boolean >( shippingAsBilling );
	const previousBillingData = useRef< BillingAddress >( billingData );

	// When the "Use same address" checkbox is toggled we need to update the current billing address to reflect this.
	// This either sets the billing address to the shipping address, or restores the billing address to it's previous state.
	useEffect( () => {
		if ( currentShippingAsBilling.current !== shippingAsBilling ) {
			if ( shippingAsBilling ) {
				previousBillingData.current = billingData;
				setBillingData( shippingAddress );
			} else {
				const {
					// We need to pluck out email from previous billing data because they can be empty, causing the current email to get emptied. See issue #4155
					/* eslint-disable no-unused-vars */
					email,
					/* eslint-enable no-unused-vars */
					...billingAddress
				} = previousBillingData.current || billingData;

				setBillingData( {
					...billingAddress,
				} );
			}
			currentShippingAsBilling.current = shippingAsBilling;
		}
	}, [ shippingAsBilling, setBillingData, shippingAddress, billingData ] );

	return {
		setShippingAsBilling,
	};
};
