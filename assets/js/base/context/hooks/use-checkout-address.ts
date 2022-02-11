/**
 * External dependencies
 */
import { defaultAddressFields, AddressFields } from '@woocommerce/settings';
import { useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { useShippingDataContext } from '../providers/cart-checkout';
import type { CustomerDataContextType } from '../providers/cart-checkout/customer/types';
import { useCustomerData } from './use-customer-data';

interface CheckoutAddress extends Partial< CustomerDataContextType > {
	setEmail: ( value: string ) => void;
	setPhone: ( value: string ) => void;
	setShippingPhone: ( value: string ) => void;
	setShippingAsBilling: ( value: boolean ) => void;
	defaultAddressFields: AddressFields;
	showShippingFields: boolean;
	showBillingFields: boolean;
}

/**
 * Custom hook for exposing address related functionality for the checkout address form.
 */
export const useCheckoutAddress = (): CheckoutAddress => {
	const { needsShipping } = useShippingDataContext();
	const {
		billingData,
		setBillingData,
		shippingAddress,
		setShippingAddress,
		shippingAsBilling,
		setShippingAsBilling,
	} = useCustomerData();

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
