/**
 * External dependencies
 */
import { useDispatch } from '@wordpress/data';
import { useEffect, useState, useRef, useCallback } from '@wordpress/element';
import isShallowEqual from '@wordpress/is-shallow-equal';
import { useDebounce } from 'use-debounce';
import { CART_STORE_KEY as storeKey } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import { useStoreNotices } from '../use-store-notices';
import { pluckAddress } from '../../utils';
import { DEFAULT_STATE } from './constants';

const shouldUpdateStore = ( oldAddress, newAddress ) =>
	! isShallowEqual( pluckAddress( oldAddress ), pluckAddress( newAddress ) );

export const useBillingData = () => {
	const [ billingData, setBillingDataState ] = useState( DEFAULT_STATE );
	const [ debouncedBillingData ] = useDebounce( billingData, 400 );
	const { updateCustomerAddress } = useDispatch( storeKey );
	const { addErrorNotice } = useStoreNotices();
	const previousBillingData = useRef( DEFAULT_STATE );

	const setBillingData = useCallback( ( newData ) => {
		setBillingDataState( ( prevState ) => ( {
			...prevState,
			...newData,
		} ) );
	}, [] );

	// When the billing address changes we need to push the changes to the server to get an updated
	// cart--things such as taxes may be affected. This will push both billing and shipping addresses
	// to the server and get an updated cart in a single request.
	useEffect( () => {
		if (
			debouncedBillingData.country &&
			shouldUpdateStore(
				previousBillingData.current,
				debouncedBillingData
			)
		) {
			updateCustomerAddress( {
				billing_address: {
					...debouncedBillingData,
					phone: debouncedBillingData?.phone || null,
					email: debouncedBillingData?.email || null,
				},
			} )
				.then( () => {
					previousBillingData.current = debouncedBillingData;
				} )
				.catch( ( error ) => {
					addErrorNotice( error.message, {
						id: 'billing-form',
					} );
				} );
		}
	}, [ debouncedBillingData, updateCustomerAddress, addErrorNotice ] );

	return {
		billingData,
		setBillingData,
	};
};
