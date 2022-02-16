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

/**
 * Checks if a cart response contains an email property.
 */
const isCartResponseBillingAddress = (
	address: CartResponseBillingAddress | CartResponseShippingAddress
): address is CartResponseBillingAddress => {
	return 'email' in address;
};

/**
 * Does a shallow compare of important address data to determine if the cart needs updating on the server. This takes
 * the current and previous address into account, as well as the billing email field.
 */
const isAddressDirty = <
	T extends CartResponseBillingAddress | CartResponseShippingAddress
>(
	// An object containing all previous address information
	previousAddress: T,
	// An object containing all address information.
	address: T
): boolean => {
	if (
		isCartResponseBillingAddress( address ) &&
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

/**
 * Local cache of customerData used for comparisons.
 */
let customerData = <CustomerData>null;

/**
 * Tracks which props have changed so the correct data gets pushed to the server.
 */
const dirtyProps = {
	billingData: false,
	shippingAddress: false,
};

/**
 * Function to dispatch an update to the server. This is debounced.
 */
const updateCustomerData = debounce( (): void => {
	const customerDataToUpdate = {} as Partial< BillingAddressShippingAddress >;

	if ( dirtyProps.billingData && customerData?.billingData ) {
		customerDataToUpdate.billing_address = customerData?.billingData;
		dirtyProps.billingData = false;
	}

	if ( dirtyProps.shippingAddress && customerData?.shippingAddress ) {
		customerDataToUpdate.shipping_address = customerData.shippingAddress;
		dirtyProps.shippingAddress = false;
	}

	if ( Object.keys( customerDataToUpdate ).length ) {
		dispatch( STORE_KEY )
			.updateCustomerData( customerDataToUpdate )
			.then( () => {
				dispatch( 'core/notices' ).removeNotice(
					'checkout',
					'wc/checkout'
				);
			} )
			.catch( ( response ) => {
				dispatch( 'core/notices' ).createNotice(
					'error',
					formatStoreApiErrorMessage( response ),
					{
						id: 'checkout',
						context: 'wc/checkout',
					}
				);
			} );
	}
}, 1000 );

/**
 * After cart has fully initialized, pushes changes to the server when data in the store is changed. Updates to the
 * server are debounced to prevent excessive requests.
 */
export const pushChanges = (): void => {
	const store = select( STORE_KEY );
	const isInitialized = store.hasFinishedResolution( 'getCartData' );
	const newCustomerData = isInitialized ? store.getCustomerData() : null;

	if ( newCustomerData === null || customerData === null ) {
		customerData = newCustomerData;
		return;
	}

	if (
		isAddressDirty( customerData.billingData, newCustomerData.billingData )
	) {
		dirtyProps.billingData = true;
	}

	if (
		isAddressDirty(
			customerData.shippingAddress,
			newCustomerData.shippingAddress
		)
	) {
		dirtyProps.shippingAddress = true;
	}

	customerData = newCustomerData;
	updateCustomerData();
};
