/**
 * External dependencies
 */
import { useState, useCallback, useRef, useEffect } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { CART_STORE_KEY as storeKey } from '@woocommerce/block-data';
import {
	defaultAddressFields,
	EnteredAddress,
	BillingAddress,
	ShippingAddress,
} from '@woocommerce/settings';

/**
 * Internal dependencies
 */
import { useStoreCart } from './cart/use-store-cart';

/**
 * Compare two addresses and see if they are the same.
 */
export const isSameAddress = (
	address1: EnteredAddress,
	address2: EnteredAddress
): boolean => {
	return Object.keys( defaultAddressFields ).every(
		( field: string ) =>
			address1[ field as keyof EnteredAddress ] ===
			address2[ field as keyof EnteredAddress ]
	);
};

/**
 * This is a custom hook for syncing customer address data (billing and shipping) with the server.
 */
export const useCustomerData = (): {
	isInitialized: boolean;
	billingData: BillingAddress;
	shippingAddress: ShippingAddress;
	shippingAsBilling: boolean;
	setBillingData: ( data: Partial< BillingAddress > ) => void;
	setShippingAddress: ( data: Partial< ShippingAddress > ) => void;
	setShippingAsBilling: ( shippingAsBilling: boolean ) => void;
} => {
	const { customerData, isInitialized } = useSelect( ( select ) => {
		const store = select( storeKey );
		return {
			customerData: store.getCustomerData(),
			isInitialized: store.hasFinishedResolution( 'getCartData' ),
		};
	} );
	const { cartNeedsShipping } = useStoreCart();
	const [ shippingAsBilling, setShippingAsBillingState ] = useState( false );
	const dispatch = useDispatch( storeKey );
	const initShippingAsBilling = useRef( false );

	// Wait for init before setting shipping as billing state, otherwise addresses will both be blank.
	useEffect( () => {
		if ( isInitialized && ! initShippingAsBilling.current ) {
			setShippingAsBillingState(
				cartNeedsShipping &&
					isSameAddress(
						customerData.shippingAddress,
						customerData.billingData
					)
			);
			initShippingAsBilling.current = true;
		}
	}, [
		cartNeedsShipping,
		customerData.billingData,
		customerData.shippingAddress,
		isInitialized,
	] );

	// When shippingAsBilling changes, update billing address to match.
	const setShippingAsBilling = useCallback(
		( newShippingAsBilling: boolean ) => {
			setShippingAsBillingState( newShippingAsBilling );
			if ( newShippingAsBilling ) {
				dispatch.setBillingData( customerData.shippingAddress );
			}
		},
		[ customerData.shippingAddress, dispatch ]
	);

	/**
	 * Update shipping address, and maybe billing address.
	 */
	const setShippingAddress = useCallback(
		( value: Partial< ShippingAddress > ): void => {
			dispatch.setShippingAddress( value );

			if ( shippingAsBilling ) {
				dispatch.setBillingData( value );
			}
		},
		[ dispatch, shippingAsBilling ]
	);

	/**
	 * Update billing address, and maybe shipping address.
	 */
	const setBillingData = useCallback(
		( value: Partial< BillingAddress > ): void => {
			dispatch.setBillingData( value );

			if ( ! cartNeedsShipping ) {
				dispatch.setShippingAddress( value );
			}
		},
		[ cartNeedsShipping, dispatch ]
	);

	return {
		isInitialized,
		billingData: customerData.billingData,
		shippingAddress: customerData.shippingAddress,
		shippingAsBilling,
		setBillingData,
		setShippingAddress,
		setShippingAsBilling,
	};
};
