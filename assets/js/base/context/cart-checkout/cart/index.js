/**
 * External dependencies
 */
import { createContext, useContext } from '@wordpress/element';

/**
 * @typedef {import('@woocommerce/type-defs/contexts').CartDataContext} CartDataContext
 */

const CartContext = createContext( {} );

/**
 * @return {CartDataContext} Returns the checkout data context value
 */
export const useCartContext = () => {
	return useContext( CartContext );
};

/**
 * Cart provider
 *
 * @param {Object}  props                     Incoming props for the provider.
 * @param {Array}   props.children            The children being wrapped.
 * @param {boolean} props.isEditor            Whether the checkout is in the
 *                                            editor context or not.
 */
export const CartProvider = ( { children, isEditor } ) => {
	/**
	 * @type {CartDataContext}
	 */
	const checkoutData = {
		isEditor,
	};
	return (
		<CartContext.Provider value={ checkoutData }>
			{ children }
		</CartContext.Provider>
	);
};
