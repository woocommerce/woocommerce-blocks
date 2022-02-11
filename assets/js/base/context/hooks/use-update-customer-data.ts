/**
 * External dependencies
 */
import { BillingAddressShippingAddress } from '@woocommerce/type-defs/cart';
import { useEffect, useRef, useState } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { CART_STORE_KEY as storeKey } from '@woocommerce/block-data';
import {
	formatStoreApiErrorMessage,
	pluckAddress,
	pluckEmail,
} from '@woocommerce/base-utils';
import {
	CartResponseBillingAddress,
	CartResponseShippingAddress,
} from '@woocommerce/type-defs/cart-response';
import isShallowEqual from '@wordpress/is-shallow-equal';
import { useDebouncedCallback } from 'use-debounce';

/**
 * Internal dependencies
 */
import { useStoreNotices } from './use-store-notices';
import { useCustomerData } from './use-customer-data';
import { useStoreCart } from './cart';

declare type CustomerData = {
	billingData: CartResponseBillingAddress;
	shippingAddress: CartResponseShippingAddress;
};

function instanceOfCartResponseBillingAddress(
	address: CartResponseBillingAddress | CartResponseShippingAddress
): address is CartResponseBillingAddress {
	return 'email' in address;
}

/**
 * Does a shallow compare of important address data to determine if the cart needs updating on the server.
 *
 * This takes the current and previous address into account, as well as the billing email field.
 *
 * @param {Object} previousAddress An object containing all previous address information
 * @param {Object} address An object containing all address information
 *
 * @return {boolean} True if the store needs updating due to changed data.
 */
const shouldUpdateAddressStore = <
	T extends CartResponseBillingAddress | CartResponseShippingAddress
>(
	previousAddress: T,
	address: T
): boolean => {
	if (
		instanceOfCartResponseBillingAddress( address ) &&
		pluckEmail( address ) !==
			pluckEmail( previousAddress as CartResponseBillingAddress )
	) {
		return true;
	}

	return (
		!! address.country &&
		! isShallowEqual(
			pluckAddress( previousAddress ),
			pluckAddress( address )
		)
	);
};

export const useUpdateCustomerData = (): void => {
	const { updateCustomerData } = useDispatch( storeKey );
	const { addErrorNotice, removeNotice } = useStoreNotices();
	// Grab the initial values from the store cart hook.
	// NOTE: The initial values may not be current if the cart has not yet finished loading. See cartIsLoading.
	const {
		billingAddress: initialBillingAddress,
		shippingAddress: initialShippingAddress,
		cartIsLoading,
	} = useStoreCart();

	// We only want to update the local state once, otherwise the data on the checkout page gets overwritten
	// with the initial state of the addresses. We also only want to start triggering updates to the server when the
	// initial data has fully initialized. Track that header.
	const [ isInitialized, setIsInitialized ] = useState< boolean >( false );
	const {
		setShippingAddress,
		setBillingData,
		...customerData
	} = useCustomerData();

	// Store values last sent to the server in a ref to avoid requests unless important fields are changed.
	const previousCustomerData = useRef< CustomerData >( customerData );

	// When the cart data is resolved from server for the first time (using cartIsLoading) we need to update
	// the initial billing and shipping values to respect customer data from the server.
	useEffect( () => {
		if ( isInitialized || cartIsLoading ) {
			return;
		}
		// Updates local state to the now-resolved cart address.
		previousCustomerData.current = {
			billingData: initialBillingAddress,
			shippingAddress: initialShippingAddress,
		};
		//setCustomerData( initializedCustomerData );
		// We are now initialized.
		setIsInitialized( true );
	}, [
		cartIsLoading,
		isInitialized,
		initialBillingAddress,
		initialShippingAddress,
	] );

	/**
	 * This pushes changes to the API when the local state differs from the address in the cart.
	 *
	 * The function shouldUpdateAddressStore() determines if enough data has changed to trigger the update.
	 */
	const pushCustomerData = () => {
		const customerDataToUpdate: Partial< BillingAddressShippingAddress > = {};

		if (
			shouldUpdateAddressStore(
				previousCustomerData.current.billingData,
				customerData.billingData
			)
		) {
			customerDataToUpdate.billing_address = customerData.billingData;
		}

		if (
			shouldUpdateAddressStore(
				previousCustomerData.current.shippingAddress,
				customerData.shippingAddress
			)
		) {
			customerDataToUpdate.shipping_address =
				customerData.shippingAddress;
		}

		if ( Object.keys( customerDataToUpdate ).length === 0 ) {
			return;
		}

		previousCustomerData.current = customerData;

		updateCustomerData( customerDataToUpdate )
			.then( () => {
				removeNotice( 'checkout' );
			} )
			.catch( ( response ) => {
				addErrorNotice( formatStoreApiErrorMessage( response ), {
					id: 'checkout',
				} );
			} );
	};

	const debouncedPushCustomerData = useDebouncedCallback(
		pushCustomerData,
		1000
	);

	// If data changes, trigger an update to the server only if initialized.
	useEffect( () => {
		if ( ! isInitialized ) {
			return;
		}
		debouncedPushCustomerData();
	}, [ isInitialized, customerData, debouncedPushCustomerData ] );
};
