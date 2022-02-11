/**
 * External dependencies
 */
<<<<<<< HEAD
import {
	defaultAddressFields,
	AddressFields,
	EnteredAddress,
	ShippingAddress,
	BillingAddress,
} from '@woocommerce/settings';
=======
import { defaultAddressFields, AddressFields } from '@woocommerce/settings';
>>>>>>> 26258afe5 (Merge with #5810 changes)
import { useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
<<<<<<< HEAD
import {
	useShippingDataContext,
	useCheckoutContext,
} from '../providers/cart-checkout';
import { useCustomerData } from './use-customer-data';

interface CheckoutAddress {
	shippingAddress: ShippingAddress;
	billingData: BillingAddress;
	setShippingAddress: ( data: Partial< EnteredAddress > ) => void;
	setBillingData: ( data: Partial< EnteredAddress > ) => void;
	setEmail: ( value: string ) => void;
	setBillingPhone: ( value: string ) => void;
	setShippingPhone: ( value: string ) => void;
	useShippingAsBilling: boolean;
	setUseShippingAsBilling: ( useShippingAsBilling: boolean ) => void;
=======
import { useShippingDataContext } from '../providers/cart-checkout';
import type { CustomerDataContextType } from '../providers/cart-checkout/customer/types';
import { useCustomerData } from './use-customer-data';

interface CheckoutAddress extends Partial< CustomerDataContextType > {
	setEmail: ( value: string ) => void;
	setPhone: ( value: string ) => void;
	setShippingPhone: ( value: string ) => void;
	setShippingAsBilling: ( value: boolean ) => void;
>>>>>>> 26258afe5 (Merge with #5810 changes)
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
<<<<<<< HEAD
		useShippingAsBilling,
		setUseShippingAsBilling,
	} = useCheckoutContext();
	const {
=======
>>>>>>> 26258afe5 (Merge with #5810 changes)
		billingData,
		setBillingData,
		shippingAddress,
		setShippingAddress,
<<<<<<< HEAD
=======
		shippingAsBilling,
		setShippingAsBilling,
>>>>>>> 26258afe5 (Merge with #5810 changes)
	} = useCustomerData();

	const setEmail = useCallback(
		( value ) =>
			void setBillingData( {
				email: value,
			} ),
		[ setBillingData ]
	);

<<<<<<< HEAD
	const setBillingPhone = useCallback(
=======
	const setPhone = useCallback(
>>>>>>> 26258afe5 (Merge with #5810 changes)
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
<<<<<<< HEAD
		setShippingAddress,
		setBillingData,
		setEmail,
		setBillingPhone,
		setShippingPhone,
		defaultAddressFields,
		useShippingAsBilling,
		setUseShippingAsBilling,
		showShippingFields: needsShipping,
		showBillingFields: ! needsShipping || ! useShippingAsBilling,
=======
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
>>>>>>> 26258afe5 (Merge with #5810 changes)
	};
};
