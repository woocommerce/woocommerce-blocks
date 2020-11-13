/**
 * External dependencies
 */
import { useDispatch } from '@wordpress/data';
import { useEffect, useState, useRef, useCallback } from '@wordpress/element';
import { useStoreNotices, useStoreCart } from '@woocommerce/base-hooks';
import { CART_STORE_KEY as storeKey } from '@woocommerce/block-data';
import { useDebounce } from 'use-debounce';

/**
 * Internal dependencies
 */
import { shouldUpdateAddressStore } from './utils';

/**
 * This is a custom hook for syncing customer address data (billing and shipping) with the server.
 */
export const useCustomerData = () => {
	const firstMount = useRef( true );
	const { updateCustomerData } = useDispatch( storeKey );
	const { addErrorNotice, removeNotice } = useStoreNotices();
	const {
		billingAddress: initialBillingData,
		shippingAddress: initialShippingAddress,
	} = useStoreCart();

	const [ customerData, setCustomerData ] = useState( {
		billingData: initialBillingData,
		shippingAddress: initialShippingAddress,
	} );

	const [ debouncedCustomerData ] = useDebounce( customerData, 400, {
		equalityFn: ( prevData, newData ) => {
			return ! (
				shouldUpdateAddressStore(
					prevData.billingData,
					newData.billingData
				) ||
				shouldUpdateAddressStore(
					prevData.shippingAddress,
					newData.shippingAddress
				)
			);
		},
	} );

	/**
	 * Set billing data.
	 *
	 * Contains special handling for email and phone so those fields are not overwritten if simply updating address.
	 */
	const setBillingData = useCallback( ( newData ) => {
		setCustomerData( ( prevState ) => {
			if ( newData.email === undefined ) {
				newData.email = prevState.email || '';
			}
			if ( newData.phone === undefined ) {
				newData.phone = prevState.phone || '';
			}
			return {
				...prevState,
				billingData: newData,
			};
		} );
	}, [] );

	const setShippingAddress = useCallback( ( newData ) => {
		setCustomerData( ( prevState ) => ( {
			...prevState,
			shippingAddress: newData,
		} ) );
	}, [] );

	useEffect( () => {
		// Avoid API call on first mount.
		if ( firstMount.current ) {
			firstMount.current = false;
			return;
		}
		removeNotice( 'address' );
		updateCustomerData( {
			billing_address: {
				...debouncedCustomerData.billingData,
				email: debouncedCustomerData.billingData.email || null,
			},
			shipping_address: debouncedCustomerData.shippingAddress,
		} ).catch( ( error ) => {
			addErrorNotice( error.message, {
				id: 'address',
			} );
		} );
	}, [
		debouncedCustomerData,
		addErrorNotice,
		removeNotice,
		updateCustomerData,
	] );

	return {
		billingData: customerData.billingData,
		shippingAddress: customerData.shippingAddress,
		setBillingData,
		setShippingAddress,
	};
};
