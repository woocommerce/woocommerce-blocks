/**
 * External dependencies
 */
import defaultAddressFields from '@woocommerce/base-components/cart-checkout/address-form/default-address-fields';
import { useState, useCallback, useEffect } from '@wordpress/element';
import {
	useShippingDataContext,
	useBillingDataContext,
	useCheckoutContext,
} from '@woocommerce/base-context';
import isShallowEqual from '@wordpress/is-shallow-equal';

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
	const {
		shippingAddress,
		setShippingAddress,
		needsShipping,
	} = useShippingDataContext();
	const { billingData, setBillingData } = useBillingDataContext();

	// These are the local states of address fields, which are persisted
	// globally when changed. They default to the global shipping address which
	// is populated from the current customer data or default location.
	const [ shippingFields, setShippingFields ] = useState( shippingAddress );
	const [ billingFields, setBillingFields ] = useState( billingData );

	// This tracks the state of the "shipping as billing" address checkbox. It's
	// initial value is true (if shipping is needed), however, if the user is
	// logged in and they have a different billing address, we can toggle this off.
	const [ shippingAsBilling, setShippingAsBilling ] = useState(
		() =>
			needsShipping &&
			( ! customerId || isSameAddress( shippingAddress, billingData ) )
	);

	// Pushes to global state when changes are made locally.
	useEffect( () => {
		// Update shipping address if it doesn't match local state.
		if ( ! isShallowEqual( shippingFields, shippingAddress ) ) {
			setShippingAddress( shippingFields );
		}

		const billingDataToSet = shippingAsBilling
			? shippingFields
			: billingFields;

		if ( ! isShallowEqual( billingDataToSet, billingData ) ) {
			setBillingData( billingDataToSet );
		}
	}, [ shippingFields, billingFields, shippingAsBilling ] );

	const setEmail = useCallback(
		( value ) => {
			setBillingFields( { email: value } );
		},
		[ setBillingFields ]
	);

	const setPhone = useCallback(
		( value ) => {
			setBillingFields( { phone: value } );
		},
		[ setBillingFields ]
	);

	return {
		defaultAddressFields,
		shippingFields,
		setShippingFields,
		billingFields,
		setBillingFields,
		setEmail,
		setPhone,
		shippingAsBilling,
		setShippingAsBilling,
		showBillingFields: ! needsShipping || ! shippingAsBilling,
	};
};
