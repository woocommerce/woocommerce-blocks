/**
 * External dependencies
 */
import { CART_STORE_KEY } from '@woocommerce/block-data';
import { select, dispatch } from '@wordpress/data';

export const updateCartFromApi = () => {
	const { getCartData } = select( CART_STORE_KEY );
	const { invalidateResolutionForStoreSelector, receiveCart } = dispatch(
		CART_STORE_KEY
	);
	invalidateResolutionForStoreSelector( 'getCartData' );
	receiveCart( getCartData() );
};
