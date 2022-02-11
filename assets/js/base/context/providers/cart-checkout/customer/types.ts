/**
 * External dependencies
 */
import type { ShippingAddress, BillingAddress } from '@woocommerce/settings';

export type CustomerDataContextType = {
	billingData: BillingAddress;
	shippingAddress: ShippingAddress;
	setBillingData: ( billingData: Partial< BillingAddress > ) => void;
	setShippingAddress: ( shippingAddress: Partial< ShippingAddress > ) => void;
};
