/**
 * External dependencies
 */
import {
	defaultAddressFields,
	AddressFields,
	EnteredAddress,
	ShippingAddress,
	BillingAddress,
} from '@woocommerce/settings';
import { useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
import {
	useShippingDataContext,
	useCheckoutContext,
} from '../providers/cart-checkout';
import type { CustomerDataContextType } from '../providers/cart-checkout/customer/types';
import { useCustomerData } from './use-customer-data';

interface CheckoutAddress extends Partial< CustomerDataContextType > {
	shippingAddress: ShippingAddress;
	billingData: BillingAddress;
	setShippingAddress: ( data: Partial< EnteredAddress > ) => void;
	setBillingData: ( data: Partial< EnteredAddress > ) => void;
	setEmail: ( value: string ) => void;
	setPhone: ( value: string ) => void;
	setShippingPhone: ( value: string ) => void;
	shippingAsBilling: boolean;
	setShippingAsBilling: ( shippingAsBilling: boolean ) => void;
	defaultAddressFields: AddressFields;
	showShippingFields: boolean;
	showBillingFields: boolean;
}

/**
 * Custom hook for exposing address related functionality for the checkout address form.
 */
export const useCheckoutAddress = (): CheckoutAddress => {
	const { needsShipping } = useShippingDataContext();
	const { shippingAsBilling, setShippingAsBilling } = useCheckoutContext();
	const {
		billingData,
		setBillingData,
		shippingAddress,
		setShippingAddress,
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
		setShippingAddress,
		setBillingData,
		setEmail,
		setPhone,
		setShippingPhone,
		defaultAddressFields,
		shippingAsBilling,
		setShippingAsBilling,
		showShippingFields: needsShipping,
		showBillingFields: ! needsShipping || ! shippingAsBilling,
	};
};
