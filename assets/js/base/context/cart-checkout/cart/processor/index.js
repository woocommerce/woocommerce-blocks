/**
 * External dependencies
 */
import { useDispatch } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';
import { useStoreNotices } from '@woocommerce/base-hooks';
import { CART_STORE_KEY as storeKey } from '@woocommerce/block-data';
import { useShippingDataContext } from '@woocommerce/base-context';
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
	const { shippingAddress } = useShippingDataContext();
	const { updateCustomerAddress } = useDispatch( storeKey );
	const previousShippingAddress = useRef( shippingAddress );
	const [ debouncedShippingAddress ] = useDebounce( shippingAddress, 400 );

	// When the billing or shipping address changes we need to push the changes to the server to
	// get an updated cart--things such as taxes may be affected. This will push both billing and
	// shipping addresses to the server and get an updated cart in a single request.
	useEffect( () => {
		if (
			shouldUpdateAddressStore(
				previousShippingAddress.current,
				shippingAddress
			)
		) {
			previousShippingAddress.current = shippingAddress;

			updateCustomerAddress( {
				shipping_address: shippingAddress,
			} ).catch( ( error ) => {
				addErrorNotice( error.message, {
					id: 'checkout',
				} );
			} );
		}
	}, [
		debouncedShippingAddress,
		addErrorNotice,
		updateCustomerAddress,
		shippingAddress,
	] );

	return null;
};

export default CartProcessor;
