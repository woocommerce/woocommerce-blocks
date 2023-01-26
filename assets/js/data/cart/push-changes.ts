/**
 * External dependencies
 */
import { debounce, pick } from 'lodash';
import { select, dispatch } from '@wordpress/data';
import {
	pluckAddress,
	pluckEmail,
	removeAllNotices,
} from '@woocommerce/base-utils';
import {
	CartBillingAddress,
	CartShippingAddress,
	BillingAddressShippingAddress,
} from '@woocommerce/types';
import isShallowEqual from '@wordpress/is-shallow-equal';

/**
 * Internal dependencies
 */
import { STORE_KEY } from './constants';
import { VALIDATION_STORE_KEY } from '../validation';
import { processErrorResponse } from '../utils';

type CustomerData = {
	billingAddress: CartBillingAddress;
	shippingAddress: CartShippingAddress;
};

/**
 * Checks if a cart response contains an email property.
 */
const isBillingAddress = (
	address: CartBillingAddress | CartShippingAddress
): address is CartBillingAddress => {
	return 'email' in address;
};

/**
 * Does a shallow compare of important address data to determine if the cart needs updating on the server. This takes
 * the current and previous address into account, as well as the billing email field.
 */
const isAddressDirty = < T extends CartBillingAddress | CartShippingAddress >(
	// An object containing all previous address information
	previousAddress: T,
	// An object containing all address information.
	address: T
): boolean => {
	if (
		isBillingAddress( address ) &&
		pluckEmail( address ) !==
			pluckEmail( previousAddress as CartBillingAddress )
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

type BaseAddressKey = keyof CartBillingAddress | keyof CartShippingAddress;

const getDirtyKeys = < T extends CartBillingAddress | CartShippingAddress >(
	// An object containing all previous address information
	previousAddress: T,
	// An object containing all address information.
	address: T
): BaseAddressKey[] => {
	const previousAddressKeys = Object.keys(
		previousAddress
	) as BaseAddressKey[];

	return previousAddressKeys.filter( ( key ) => {
		return previousAddress[ key ] !== address[ key ];
	} );
};

/**
 * Local cache of customerData used for comparisons.
 */
let customerData = <CustomerData>{
	billingAddress: {},
	shippingAddress: {},
};

// Tracks if customerData has been populated.
let customerDataIsInitialized = false;

/**
 * Tracks which props have changed so the correct data gets pushed to the server.
 */
const dirtyProps = <
	{
		billingAddress: BaseAddressKey[];
		shippingAddress: BaseAddressKey[];
	}
>{
	billingAddress: [],
	shippingAddress: [],
};

/**
 * Function to dispatch an update to the server. This is debounced.
 */
const updateCustomerData = debounce( (): void => {
	const { billingAddress, shippingAddress } = customerData;
	const validationStore = select( VALIDATION_STORE_KEY );
	const customerDataToUpdate = {} as Partial< BillingAddressShippingAddress >;

	// Before we push anything, we need to ensure that the data we're pushing (dirty fields) are valid, otherwise we will
	// abort and wait for the validation issues to be resolved.
	const invalidProps = [
		...dirtyProps.billingAddress.filter( ( key ) => {
			return (
				validationStore.getValidationError( 'billing_' + key ) !==
				undefined
			);
		} ),
		...dirtyProps.shippingAddress.filter( ( key ) => {
			return (
				validationStore.getValidationError( 'shipping_' + key ) !==
				undefined
			);
		} ),
	].filter( Boolean );

	if ( invalidProps.length ) {
		return;
	}

	// Find valid data from the list of dirtyProps and prepare to push to the server.
	if ( dirtyProps.billingAddress.length ) {
		customerDataToUpdate.billing_address = pick(
			billingAddress,
			dirtyProps.billingAddress
		);
		dirtyProps.billingAddress = [];
	}

	if ( dirtyProps.shippingAddress.length ) {
		customerDataToUpdate.shipping_address = pick(
			shippingAddress,
			dirtyProps.shippingAddress
		);
		dirtyProps.shippingAddress = [];
	}

	if ( Object.keys( customerDataToUpdate ).length ) {
		dispatch( STORE_KEY )
			.updateCustomerData( customerDataToUpdate )
			.then( () => {
				removeAllNotices();
			} )
			.catch( ( response ) => {
				processErrorResponse( response );
			} );
	}
}, 1000 );

/**
 * After cart has fully initialized, pushes changes to the server when data in the store is changed. Updates to the
 * server are debounced to prevent excessive requests.
 */
export const pushChanges = (): void => {
	const store = select( STORE_KEY );

	if ( ! store.hasFinishedResolution( 'getCartData' ) ) {
		return;
	}

	// Returns all current customer data from the store.
	const newCustomerData = store.getCustomerData();

	// On first run, this will populate the customerData cache with the current customer data in the store.
	// This does not need to be pushed to the server because it's already there.
	if ( ! customerDataIsInitialized ) {
		customerData = newCustomerData;
		customerDataIsInitialized = true;
		return;
	}

	// Check if the billing and shipping addresses are "dirty"--as in, they've changed since the last push.
	const billingIsDirty = isAddressDirty(
		customerData.billingAddress,
		newCustomerData.billingAddress
	);
	const shippingIsDirty = isAddressDirty(
		customerData.shippingAddress,
		newCustomerData.shippingAddress
	);

	// Update local cache of dirty prop keys.
	if ( billingIsDirty ) {
		dirtyProps.billingAddress = [
			...dirtyProps.billingAddress,
			...getDirtyKeys(
				customerData.billingAddress,
				newCustomerData.billingAddress
			),
		];
	}
	if ( shippingIsDirty ) {
		dirtyProps.shippingAddress = [
			...dirtyProps.shippingAddress,
			...getDirtyKeys(
				customerData.shippingAddress,
				newCustomerData.shippingAddress
			),
		];
	}

	// Update local cache of customer data so the next time this runs, it can compare against the latest data.
	customerData = newCustomerData;

	// Trigger the update if we have any dirty props.
	if (
		dirtyProps.billingAddress.length ||
		dirtyProps.shippingAddress.length
	) {
		updateCustomerData();
	}
};
