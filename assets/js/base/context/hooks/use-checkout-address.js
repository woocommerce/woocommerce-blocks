/**
 * External dependencies
 */
import { defaultAddressFields } from '@woocommerce/settings';
import { useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
import {
	useShippingDataContext,
	useCustomerDataContext,
} from '../providers/cart-checkout';

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
	} = useCustomerDataContext();

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
			void setShippingAddress( {
				phone: value,
			} ),
		[ setShippingAddress ]
	);

	return {
		shippingAddress,
		billingData,
		shippingAsBilling,
		setShippingAddress,
		setBillingData,
		setEmail,
		setPhone,
		setShippingPhone,
		setShippingAsBilling,
		defaultAddressFields,
		showShippingFields: needsShipping,
		showBillingFields: ! needsShipping || ! shippingAsBilling,
	};
};
