/**
 * External dependencies
 */
import { CART_STORE_KEY } from '@woocommerce/block-data';
import { select, dispatch } from '@wordpress/data';

/**
 * When executed, this will invalidate the getCartData selector, causing a request to be made
 * to the API. This is in place to allow extensions to signal that they have modified the cart,
 * and that it needs to be reloaded in the client.
 */
export const updateCartFromApi = () => {
	const { getCartData } = select( CART_STORE_KEY );
	const { invalidateResolutionForStoreSelector, receiveCart } = dispatch(
		CART_STORE_KEY
	);
	invalidateResolutionForStoreSelector( 'getCartData' );
	receiveCart( getCartData() );
};
