/**
 * External dependencies
 */
import { defaultAddressFields } from '@woocommerce/settings';
import { useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { useShippingDataContext } from '../providers/cart-checkout';
import { useCustomerData } from './use-customer-data';

/**
 * Custom hook for exposing address related functionality for the checkout address form.
 */
export const useCheckoutAddress = () => {
	const { needsShipping } = useShippingDataContext();
	const {
		billingData,
		setBillingData,
		shippingAddress,
		setShippingAddress,
		shippingAsBilling,
		setShippingAsBilling,
	} = useCustomerData();

	/**
	 * Sets shipping address data, and also billing if using the same address.
	 */
	const setShippingFields = setShippingAddress;

	/**
	 * Sets billing address data, and also shipping if shipping is disabled.
	 */
	const setBillingFields = setBillingData;

	const setEmail = useCallback(
		( value ) =>
			void setBillingData( {
				email: value,
			} ),
		[ setBillingData ]
	);

	const setPhone = useCallback(
		( value ) =>
			void setBillingData( {
				phone: value,
			} ),
		[ setBillingData ]
	);

	const setShippingPhone = useCallback(
		( value ) =>
			void setShippingFields( {
				phone: value,
			} ),
		[ setShippingFields ]
	);

	// Note that currentShippingAsBilling is returned rather than the current state of shippingAsBilling--this is so that
	// the billing fields are not rendered before sync (billing field values are debounced and would be outdated)
	return {
		defaultAddressFields,
		shippingFields: shippingAddress,
		setShippingFields,
		billingFields: billingData,
		setBillingFields,
		setEmail,
		setPhone,
		setShippingPhone,
		shippingAsBilling,
		setShippingAsBilling,
		showShippingFields: needsShipping,
		showBillingFields: ! needsShipping || ! shippingAsBilling,
	};
};
