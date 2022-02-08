/**
 * External dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { CART_STORE_KEY as storeKey } from '@woocommerce/block-data';
import {
	CartResponseBillingAddress,
	CartResponseShippingAddress,
} from '@woocommerce/types';

/**
 * This is a custom hook for syncing customer address data (billing and shipping) with the server.
 */
export const useCustomerData = (): {
	billingData: CartResponseBillingAddress;
	shippingAsBilling: boolean;
	shippingAddress: CartResponseShippingAddress;
	setBillingData: ( data: CartResponseBillingAddress ) => void;
	setShippingAddress: ( data: CartResponseShippingAddress ) => void;
	setShippingAsBilling: ( data: boolean ) => void;
} => {
	const customerData = useSelect( ( select ) => {
		const store = select( storeKey );
		return store.getCustomerData();
	} );

	const {
		setBillingData,
		setShippingAddress,
		setShippingAsBilling,
	} = useDispatch( storeKey );

	return {
		billingData: customerData.billingData,
		shippingAddress: customerData.shippingAddress,
		shippingAsBilling: customerData.shippingAsBilling,
		setShippingAsBilling,
		setBillingData,
		setShippingAddress,
	};
};
