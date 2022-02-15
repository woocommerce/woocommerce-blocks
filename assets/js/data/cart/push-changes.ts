/**
 * External dependencies
 */
import { debounce } from 'lodash';
import { select, dispatch } from '@wordpress/data';
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
import { BillingAddressShippingAddress } from '@woocommerce/type-defs/cart';

/**
 * Internal dependencies
 */
import { STORE_KEY } from './constants';

declare type CustomerData = {
	billingData: CartResponseBillingAddress;
	shippingAddress: CartResponseShippingAddress;
} | null;

const instanceOfCartResponseBillingAddress = (
	address: CartResponseBillingAddress | CartResponseShippingAddress
): address is CartResponseBillingAddress => {
	return 'email' in address;
};

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

let customerData = <CustomerData>null;
let customerDataToUpdate: Partial< BillingAddressShippingAddress > = {};

const updateCustomerData = (): void => {
	if ( Object.keys( customerDataToUpdate ).length === 0 ) {
		return;
	}
	dispatch( STORE_KEY )
		.updateCustomerData( customerDataToUpdate )
		.then( () => {
			customerDataToUpdate = {};
			dispatch( 'core/notices' ).removeNotice( 'checkout' );
		} )
		.catch( ( response ) => {
			dispatch( 'core/notices' ).createNotice(
				'error',
				formatStoreApiErrorMessage( response ),
				{
					id: 'checkout',
				}
			);
		} );
};
const denbouncedUpdateCustomerData = debounce( updateCustomerData, 1000 );

export const pushChanges = (): void => {
	const store = select( STORE_KEY );
	const isInitialized = store.hasFinishedResolution( 'getCartData' );

	// Wait for cart to fully initialize before syncing anything back to the server.
	if ( ! isInitialized ) {
		return;
	}

	const newCustomerData = store.getCustomerData();

	// When first initialized, update the local cache once.
	if ( customerData === null ) {
		customerData = newCustomerData;
		return;
	}

	if (
		shouldUpdateAddressStore(
			customerData.billingData,
			newCustomerData.billingData
		)
	) {
		customerDataToUpdate.billing_address = newCustomerData.billingData;
	}

	if (
		shouldUpdateAddressStore(
			customerData.shippingAddress,
			newCustomerData.shippingAddress
		)
	) {
		customerDataToUpdate.shipping_address = newCustomerData.shippingAddress;
	}

	if ( Object.keys( customerDataToUpdate ).length === 0 ) {
		return;
	}

	// Debounce the update to the server.
	denbouncedUpdateCustomerData();

	// Update our local cache to the new values.
	customerData = newCustomerData;
};
