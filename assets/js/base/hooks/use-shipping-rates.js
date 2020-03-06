/**
 * External dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { useReducer, useEffect } from '@wordpress/element';
import isShallowEqual from '@wordpress/is-shallow-equal';
import { useDebounce } from 'use-debounce';
import { CART_STORE_KEY as storeKey } from '@woocommerce/block-data';
/**
 * Internal dependencies
 */
import { useStoreCart } from './use-store-cart';
import { pluckAddress } from '../utils';
/**
 * This is a custom hook that is wired up to the `wc/store/collections` data
store for the `wc/store/cart/shipping-rates` route. Given a query object, this
will ensure a component is kept up to date with the shipping rates matching that
query in the store state.
 *
 * @return {Object} This hook will return an object with three properties:
 * - {Boolean} shippingRatesLoading A boolean indicating whether the shipping
 * rates are still loading or not.
 * - {Function} setShippingAddress  An function that optimistically update shipping address and
 * dispatches async rate fetching.
 * - {Object} shippingAddress       An object containing shipping address.
 * @param addressFields
 */
export const useShippingRates = ( addressFields ) => {
	const { shippingRates } = useStoreCart();
	const derivedAddress = shippingRates[ 0 ]?.destination;
	const initialAddress = { ...addressFields, ...derivedAddress };
	const shippingAddressReducer = ( state, address ) => ( {
		...state,
		...address,
	} );
	const [ shippingAddress, setShippingAddress ] = useReducer(
		shippingAddressReducer,
		initialAddress
	);
	const [ debouncedShippingAddress ] = useDebounce( shippingAddress, 400 );
	const shippingRatesLoading = useSelect(
		( select ) => select( storeKey ).areShippingRatesLoading(),
		[]
	);
	const { updateShippingAddress } = useDispatch( storeKey );

	useEffect( () => {
		if (
			! isShallowEqual(
				pluckAddress( debouncedShippingAddress ),
				pluckAddress( initialAddress )
			) &&
			debouncedShippingAddress.country
		) {
			updateShippingAddress( debouncedShippingAddress );
		}
	}, [ debouncedShippingAddress ] );
	return {
		shippingAddress,
		shippingRatesLoading,
		setShippingAddress,
	};
};
