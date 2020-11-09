/**
 * External dependencies
 */
import { useDispatch } from '@wordpress/data';
import { useEffect, useRef, useState, useCallback } from '@wordpress/element';
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
	const { updateCustomerData } = useDispatch( storeKey );
	const { addErrorNotice, removeNotice } = useStoreNotices();
	const {
		billingAddress: initalBillingData,
		shippingAddress: initialShippingAddress,
	} = useStoreCart();

	const [ customerData, setCustomerData ] = useState( {
		billingData: initalBillingData,
		shippingAddress: initialShippingAddress,
	} );
	const previousCustomerData = useRef( customerData );
	const [ debouncedCustomerData ] = useDebounce( customerData, 400 );

	const setBillingData = useCallback( ( newData ) => {
		setCustomerData( ( prevState ) => ( {
			...prevState,
			billingData: {
				...prevState.billingData,
				...newData,
			},
		} ) );
	}, [] );

	const setShippingAddress = useCallback( ( newData ) => {
		setCustomerData( ( prevState ) => ( {
			...prevState,
			shippingAddress: {
				...prevState.shippingAddress,
				...newData,
			},
		} ) );
	}, [] );

	// This will push both billing and shipping addresses to the server as a single request.
	useEffect( () => {
		const shouldUpdateBilling = shouldUpdateAddressStore(
			previousCustomerData.current.billingData,
			debouncedCustomerData.billingData
		);
		const shouldUpdateShipping = shouldUpdateAddressStore(
			previousCustomerData.current.shippingAddress,
			debouncedCustomerData.shippingAddress
		);
		if ( shouldUpdateBilling || shouldUpdateShipping ) {
			// Keep refs in sync to avoid multiple calls to API if debounce triggers again.
			previousCustomerData.current = debouncedCustomerData;

			const requestData = {};

			if ( shouldUpdateBilling ) {
				requestData.billing_address = {
					...debouncedCustomerData.billingData,
					phone: debouncedCustomerData.billingData.phone || null,
					email: debouncedCustomerData.billingData.email || null,
				};
			}

			if ( shouldUpdateShipping ) {
				requestData.shipping_address =
					debouncedCustomerData.shippingAddress;
			}

			removeNotice( 'address' );
			updateCustomerData( requestData ).catch( ( error ) => {
				addErrorNotice( error.message, {
					id: 'address',
				} );
			} );
		}
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
