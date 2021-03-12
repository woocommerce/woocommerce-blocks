/**
 * External dependencies
 */
import { useRef } from '@wordpress/element';
import { getSetting } from '@woocommerce/settings';
import { CART_STORE_KEY } from '@woocommerce/block-data';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect } from 'react';

/**
 * Hydrate Cart API data.
 *
 * Makes cart data available without an API request to wc/store/cart/.
 */
const useStoreCartApiHydration = () => {
	const cartData = useRef( getSetting( 'cartData' ) );
	const { getCartFromApi } = useDispatch( CART_STORE_KEY );

	useEffect( () => {
		if ( ! cartData.current ) {
			return;
		}

		const lastCartUpdateRaw = window.localStorage.getItem(
			'lastCartUpdate'
		);
		const lastCartUpdate =
			lastCartUpdateRaw === null ? null : JSON.parse( lastCartUpdateRaw );

		const needsUpdateFromAPI =
			lastCartUpdate.timestamp > cartData.current?.generated_timestamp;

		if ( needsUpdateFromAPI ) {
			// This is where we should call getCartFromApi action
		}
	}, [] );

	useSelect( ( select, registry ) => {
		if ( ! cartData.current ) {
			return;
		}

		const { isResolving, hasFinishedResolution } = select( CART_STORE_KEY );
		const {
			receiveCart,
			receiveError,
			startResolution,
			finishResolution,
		} = registry.dispatch( CART_STORE_KEY );

		if (
			! isResolving( 'getCartData', [] ) &&
			! hasFinishedResolution( 'getCartData', [] )
		) {
			startResolution( 'getCartData', [] );
			if ( cartData.current?.code?.includes( 'error' ) ) {
				receiveError( cartData.current );
			} else {
				receiveCart( cartData.current );
			}
			finishResolution( 'getCartData', [] );
		}
	}, [] );
};

/**
 * HOC that calls the useStoreCartApiHydration hook.
 *
 * @param {Function} OriginalComponent Component being wrapped.
 */
const withStoreCartApiHydration = ( OriginalComponent ) => {
	return ( props ) => {
		useStoreCartApiHydration();
		return <OriginalComponent { ...props } />;
	};
};

export default withStoreCartApiHydration;
