/**
 * External dependencies
 */
import { dispatch } from '@wordpress/data';
import { CartResponse } from '@woocommerce/type-defs/cart-response';
import { ExtensionCartUpdateArgs } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import { STORE_KEY } from '../../../assets/js/data/cart/constants';

/**
 * When executed, this will invalidate the getCartData selector, causing a request to be made
 * to the API. This is in place to allow extensions to signal that they have modified the cart,
 * and that it needs to be reloaded in the client.
 */
export const extensionCartUpdate = (
	args: ExtensionCartUpdateArgs
): Promise< CartResponse > => {
	const { applyExtensionCartUpdate } = dispatch( STORE_KEY );
	return applyExtensionCartUpdate( args );
};
