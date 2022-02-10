/**
 * External dependencies
 */
import type {
	CartShippingAddress,
	CartBillingAddress,
} from '@woocommerce/types';

export type CustomerDataContextType = {
	billingData: CartBillingAddress;
	shippingAddress: CartShippingAddress;
	shippingAsBilling: boolean;
	setBillingData: ( billingData: Partial< CartBillingAddress > ) => void;
	setShippingAddress: (
		shippingAddress: Partial< CartShippingAddress >
	) => void;
	setShippingAsBilling: ( shippingAsBilling: boolean ) => void;
};
