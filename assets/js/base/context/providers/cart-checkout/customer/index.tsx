/**
 * External dependencies
 */
import {
	createContext,
	useContext,
	useState,
	useCallback,
} from '@wordpress/element';

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
		setBillingData: setCustomerBillingData,
		setShippingAddress: setCustomerShippingAddress,
	} = useCustomerData();
	const { cartNeedsShipping } = useStoreCart();
	const { customerId } = useCheckoutContext();
	const [ shippingAsBilling, setShippingAsBillingState ] = useState(
		() =>
			cartNeedsShipping &&
			( ! customerId || isSameAddress( shippingAddress, billingData ) )
	);

	// When shippingAsBilling changes, update billing address to match.
	const setShippingAsBilling = useCallback(
		( newShippingAsBilling: boolean ) => {
			setShippingAsBillingState( newShippingAsBilling );
			if ( newShippingAsBilling ) {
				setCustomerBillingData( shippingAddress );
			}
		},
		[ setCustomerBillingData, shippingAddress ]
	);

	/**
	 * Update shipping address, and maybe billing address.
	 */
	const setShippingAddress = useCallback(
		(
			value: Partial< CustomerDataContextType[ 'shippingAddress' ] >
		): void => {
			setCustomerShippingAddress( value );

			if ( shippingAsBilling ) {
				setCustomerBillingData( value );
			}
		},
		[
			setCustomerShippingAddress,
			shippingAsBilling,
			setCustomerBillingData,
		]
	);

	/**
	 * Update billing address, and maybe shipping address.
	 */
	const setBillingData = useCallback(
		(
			value: Partial< CustomerDataContextType[ 'billingData' ] >
		): void => {
			setCustomerBillingData( value );

			if ( ! cartNeedsShipping ) {
				setCustomerShippingAddress( value );
			}
		},
		[
			cartNeedsShipping,
			setCustomerShippingAddress,
			setCustomerBillingData,
		]
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
