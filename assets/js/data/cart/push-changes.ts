/**
 * External dependencies
 */
import { removeAllNotices, debounce, pick } from '@woocommerce/base-utils';
import {
	CartBillingAddress,
	CartShippingAddress,
	BillingAddressShippingAddress,
} from '@woocommerce/types';
import { select, dispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { STORE_KEY } from './constants';
import { VALIDATION_STORE_KEY } from '../validation';
import { processErrorResponse } from '../utils';
import { normalizeAddressProp } from './utils';

type BaseAddressKey = keyof CartBillingAddress & keyof CartShippingAddress;

// Local cache of customerData used for comparisons.
let customerData = {
	billingAddress: {},
	shippingAddress: {},
} as {
	billingAddress: CartBillingAddress;
	shippingAddress: CartShippingAddress;
};

// Tracks if customerData has been populated.
let customerDataIsInitialized = false;

// Tracks if a push is currently in progress.
let doingPush = false;

// Tracks which props have changed so the correct data gets pushed to the server.
const dirtyProps = {
	billingAddress: [],
	shippingAddress: [],
} as {
	billingAddress: BaseAddressKey[];
	shippingAddress: BaseAddressKey[];
};

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
		return (
			normalizeAddressProp( key, previousAddress[ key ] ) !==
			normalizeAddressProp( key, address[ key ] )
		);
	} );
};

/**
 * Validates dirty props before push.
 */
const hasValidDirtyProps = () => {
	const validationStore = select( VALIDATION_STORE_KEY );

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

	return invalidProps.length === 0;
};

/**
 * Function to dispatch an update to the server. This is debounced.
 */
const updateCustomerData = debounce( (): void => {
	if ( ! hasValidDirtyProps() ) {
		return;
	}

	if ( doingPush ) {
		updateCustomerData();
		return;
	}

	// Prevent multiple pushes from happening at the same time.
	doingPush = true;

	// Find valid data from the list of dirtyProps and prepare to push to the server.
	const customerDataToUpdate = {} as Partial< BillingAddressShippingAddress >;

	if ( dirtyProps.billingAddress.length ) {
		customerDataToUpdate.billing_address = pick(
			customerData.billingAddress,
			dirtyProps.billingAddress
		);
	}

	if ( dirtyProps.shippingAddress.length ) {
		customerDataToUpdate.shipping_address = pick(
			customerData.shippingAddress,
			dirtyProps.shippingAddress
		);
	}

	if ( Object.keys( customerDataToUpdate ).length === 0 ) {
		doingPush = false;
		return;
	}

	// If there is customer data to update, push it to the server.
	dispatch( STORE_KEY )
		.updateCustomerData( customerDataToUpdate )
		.then( () => {
			// Data was successfully pushed to the server. Remove dirty props and notices.
			dirtyProps.billingAddress = [];
			dirtyProps.shippingAddress = [];
			removeAllNotices();
		} )
		.catch( ( response ) => {
			processErrorResponse( response );
		} )
		.finally( () => {
			doingPush = false;
		} );
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

	dirtyProps.billingAddress = [
		...dirtyProps.billingAddress,
		...getDirtyKeys(
			customerData.billingAddress,
			newCustomerData.billingAddress
		),
	];

	dirtyProps.shippingAddress = [
		...dirtyProps.shippingAddress,
		...getDirtyKeys(
			customerData.shippingAddress,
			newCustomerData.shippingAddress
		),
	];

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

// Cancel the debounced updateCustomerData function and trigger it immediately.
export const flushChanges = (): void => {
	updateCustomerData.flush();
};
