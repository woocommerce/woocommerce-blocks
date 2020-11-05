/**
 * External dependencies
 */
import { useDispatch } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';
import { useStoreNotices } from '@woocommerce/base-hooks';
import { CART_STORE_KEY as storeKey } from '@woocommerce/block-data';
import {
	useShippingDataContext,
	useBillingDataContext,
} from '@woocommerce/base-context';
import { useDebounce } from 'use-debounce';

/**
 * Internal dependencies
 */
import { shouldUpdateAddressStore } from './utils';

/**
 * AddressProcessor component.
 *
 * This component looks at billing and shipping contexts in the tree, and syncs any important changes
 * (those that impact taxes mainly) to the server so the cart is kept up to date.
 */
const AddressProcessor = () => {
	const { addErrorNotice, removeNotice } = useStoreNotices();
	const { billingData } = useBillingDataContext();
	const { shippingAddress } = useShippingDataContext();
	const { updateCustomerAddress } = useDispatch( storeKey );
	const previousBillingData = useRef( billingData );
	const previousShippingAddress = useRef( shippingAddress );
	const [ debouncedBillingData ] = useDebounce( billingData, 400 );
	const [ debouncedShippingAddress ] = useDebounce( shippingAddress, 400 );

	// This will push both billing and shipping addresses to the server in a single request.
	useEffect( () => {
		const shouldUpdateBilling = shouldUpdateAddressStore(
			previousBillingData.current,
			billingData
		);
		const shouldUpdateShipping = shouldUpdateAddressStore(
			previousShippingAddress.current,
			shippingAddress
		);
		if ( shouldUpdateBilling || shouldUpdateShipping ) {
			// Keep refs in sync to avoid multiple calls to API if debounce triggers again.
			previousBillingData.current = billingData;
			previousShippingAddress.current = shippingAddress;

			const addressData = {};

			if ( shouldUpdateBilling ) {
				addressData.billing_address = {
					...billingData,
					phone: billingData.phone || null,
					email: billingData.email || null,
				};
			}

			if ( shouldUpdateShipping ) {
				addressData.shipping_address = shippingAddress;
			}

			removeNotice( 'address' );
			updateCustomerAddress( addressData ).catch( ( error ) => {
				addErrorNotice( error.message, {
					id: 'address',
				} );
			} );
		}
	}, [
		billingData,
		shippingAddress,
		debouncedBillingData,
		debouncedShippingAddress,
		addErrorNotice,
		removeNotice,
		updateCustomerAddress,
	] );

	return null;
};

export default AddressProcessor;
