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
 * CartProcessor component.
 */
const CartProcessor = () => {
	const { addErrorNotice } = useStoreNotices();
	const { billingData } = useBillingDataContext();
	const { shippingAddress } = useShippingDataContext();
	const { updateCustomerAddress } = useDispatch( storeKey );
	const previousBillingData = useRef( billingData );
	const previousShippingAddress = useRef( shippingAddress );
	const [ debouncedBillingData ] = useDebounce( billingData, 400 );
	const [ debouncedShippingAddress ] = useDebounce( shippingAddress, 400 );

	// When the billing or shipping address changes we need to push the changes to the server to
	// get an updated cart--things such as taxes may be affected. This will push both billing and
	// shipping addresses to the server and get an updated cart in a single request.
	useEffect( () => {
		if (
			shouldUpdateAddressStore(
				previousBillingData.current,
				billingData
			) ||
			shouldUpdateAddressStore(
				previousShippingAddress.current,
				shippingAddress
			)
		) {
			previousBillingData.current = billingData;
			previousShippingAddress.current = shippingAddress;

			updateCustomerAddress( {
				shipping_address: shippingAddress,
				billing_address: {
					...billingData,
					phone: billingData.phone || null,
					email: billingData.email || null,
				},
			} ).catch( ( error ) => {
				addErrorNotice( error.message, {
					id: 'checkout',
				} );
			} );
		}
	}, [
		debouncedBillingData,
		debouncedShippingAddress,
		addErrorNotice,
		updateCustomerAddress,
		billingData,
		shippingAddress,
	] );

	return null;
};

export default CartProcessor;
