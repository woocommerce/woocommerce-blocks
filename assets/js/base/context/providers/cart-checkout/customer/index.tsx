/**
 * External dependencies
 */
import { createContext, useContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import type { CustomerDataContextType } from './types';
import { defaultBillingData, defaultShippingAddress } from './constants';
import { useCustomerData } from '../../../hooks/use-customer-data';

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
		shippingAsBilling,
		setBillingData,
		setShippingAddress,
		setShippingAsBilling,
	} = useCustomerData();

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
