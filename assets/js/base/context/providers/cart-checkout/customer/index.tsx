/**
 * External dependencies
 */
import { createContext, useContext, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import type { CustomerDataContextType } from './types';
import { defaultBillingData, defaultShippingAddress } from './constants';
import { isSameAddress } from './utils';
import { useCustomerData } from '../../../hooks/use-customer-data';
import { useCheckoutContext } from '../checkout-state';
import { useStoreCart } from '../../../hooks/cart/use-store-cart';

const CustomerDataContext = createContext< CustomerDataContextType >( {
	billingData: defaultBillingData,
	shippingAddress: defaultShippingAddress,
	setBillingData: () => void 0,
	setShippingAddress: () => void 0,
	shippingAsBilling: true,
	setShippingAsBilling: () => void 0,
} );

export const useCustomerDataContext = (): CustomerDataContextType => {
	return useContext( CustomerDataContext );
};

/**
 * Customer Data context provider.
 */
export const CustomerDataProvider = ( {
	children,
}: {
	children: JSX.Element | JSX.Element[];
} ): JSX.Element => {
	const {
		billingData,
		shippingAddress,
		setBillingData,
		setShippingAddress,
	} = useCustomerData();
	const { cartNeedsShipping } = useStoreCart();
	const { customerId } = useCheckoutContext();
	const [ shippingAsBilling, setShippingAsBilling ] = useState(
		() =>
			cartNeedsShipping &&
			( ! customerId || isSameAddress( shippingAddress, billingData ) )
	);

	const contextValue: CustomerDataContextType = {
		billingData,
		shippingAddress,
		setBillingData,
		setShippingAddress,
		shippingAsBilling,
		setShippingAsBilling,
	};

	return (
		<CustomerDataContext.Provider value={ contextValue }>
			{ children }
		</CustomerDataContext.Provider>
	);
};
