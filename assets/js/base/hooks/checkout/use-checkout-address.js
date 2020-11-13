/**
 * External dependencies
 */
import defaultAddressFields from '@woocommerce/base-components/cart-checkout/address-form/default-address-fields';
import { useState, useEffect } from '@wordpress/element';
import {
	useShippingDataContext,
	useCustomerDataContext,
	useCheckoutContext,
} from '@woocommerce/base-context';

/**
 * Compare two addresses and see if they are the same.
 *
 * @param {Object} address1 First address.
 * @param {Object} address2 Second address.
 */
const isSameAddress = ( address1, address2 ) => {
	return Object.keys( defaultAddressFields ).every(
		( field ) => address1[ field ] === address2[ field ]
	);
};

/**
 * Custom hook for tracking address field state on checkout and persisting it to
 * context globally on change.
 */
export const useCheckoutAddress = () => {
	const { customerId } = useCheckoutContext();
	const { needsShipping } = useShippingDataContext();
	const {
		billingData,
		setBillingData,
		shippingAddress,
		setShippingAddress,
	} = useCustomerDataContext();

	// This tracks the state of the "shipping as billing" address checkbox. It's
	// initial value is true (if shipping is needed), however, if the user is
	// logged in and they have a different billing address, we can toggle this off.
	const [ shippingAsBilling, setShippingAsBilling ] = useState(
		() =>
			needsShipping &&
			( ! customerId || isSameAddress( shippingAddress, billingData ) )
	);

	// This syncs billing data with shipping data if the checkbox is checked.
	useEffect( () => {
		if ( shippingAsBilling ) {
			setBillingData( shippingAddress );
		}
	}, [ shippingAddress, shippingAsBilling, setBillingData ] );

	const setEmail = ( value ) => void setBillingData( { email: value } );
	const setPhone = ( value ) => void setBillingData( { phone: value } );

	return {
		defaultAddressFields,
		shippingFields: shippingAddress,
		setShippingFields: setShippingAddress,
		billingFields: billingData,
		setBillingFields: setBillingData,
		setEmail,
		setPhone,
		shippingAsBilling,
		setShippingAsBilling,
		showBillingFields: ! needsShipping || ! shippingAsBilling,
	};
};
