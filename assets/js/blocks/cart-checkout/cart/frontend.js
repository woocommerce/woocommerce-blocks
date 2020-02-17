/**
 * External dependencies
 */
import { withRestApiHydration } from '@woocommerce/block-hocs';
import { useCollection } from '@woocommerce/base-hooks';

/**
 * Internal dependencies
 */
import FullCart from './full-cart';
import EmptyCart from './empty-cart';
import renderFrontend from '../../../utils/render-frontend.js';

/**
 * Wrapper component to supply API data and show empty cart view as needed.
 */
const CartFrontend = () => {
	const { results: cartData, isLoading } = useCollection( {
		namespace: '/wc/store',
		resourceName: 'cart',
	} );

	const cartItems = isLoading ? [] : cartData.items;
	const isCartEmpty = ! isLoading && cartItems.length <= 0;

	// @todo render cart loading state/spinner
	return isCartEmpty ? (
		<EmptyCart />
	) : (
		<FullCart cartItems={ cartItems } cartTotals={ cartData.totals } />
	);
};

const isCartEmpty = false; // @todo check if the cart has some products
const selector = '.wp-block-woocommerce-cart';

if ( ! isCartEmpty ) {
	const getProps = () => {
		return {
			attributes: {},
		};
	};

	renderFrontend( selector, withRestApiHydration( CartFrontend ), getProps );
} else {
	// Should this move to a side effect of CartFrontend component?
	const containers = document.querySelectorAll( selector );

	if ( containers.length ) {
		// Use Array.forEach for IE11 compatibility.
		Array.prototype.forEach.call( containers, ( el ) => {
			el.classList.remove( 'is-loading' );
		} );
	}
}
