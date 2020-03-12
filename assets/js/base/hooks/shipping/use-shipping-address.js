/**
 * External dependencies
 */
import { useDispatch } from '@wordpress/data';
import { useEffect, useReducer } from '@wordpress/element';
import isShallowEqual from '@wordpress/is-shallow-equal';
import { useDebounce } from 'use-debounce';
import { CART_STORE_KEY as storeKey } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import { useStoreCart } from '../cart/use-store-cart';
import { pluckAddress } from '../../utils';

const reducer = ( state, address ) =>
	isShallowEqual( pluckAddress( address ), pluckAddress( state ) )
		? state
		: { ...state, ...address };

export const useShippingAddress = () => {
	const { shippingAddress: initialAddress } = useStoreCart();
	const [ shippingAddress, setShippingAddress ] = useReducer(
		reducer,
		initialAddress
	);
	const [ debouncedShippingAddress ] = useDebounce( shippingAddress, 400 );
	const { updateShippingAddress } = useDispatch( storeKey );

	useEffect( () => {
		if ( debouncedShippingAddress.country ) {
			updateShippingAddress( debouncedShippingAddress );
		}
	}, [ debouncedShippingAddress ] );
	return {
		shippingAddress,
		setShippingAddress,
	};
};
