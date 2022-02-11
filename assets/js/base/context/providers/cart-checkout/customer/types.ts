/**
 * External dependencies
 */
import type { ShippingAddress, BillingAddress } from '@woocommerce/settings';

export type CustomerDataContextType = {
	billingData: BillingAddress;
	shippingAddress: ShippingAddress;
	shippingAsBilling: boolean;
	setBillingData: ( billingData: Partial< BillingAddress > ) => void;
	setShippingAddress: ( shippingAddress: Partial< ShippingAddress > ) => void;
	setShippingAsBilling: ( shippingAsBilling: boolean ) => void;
};
