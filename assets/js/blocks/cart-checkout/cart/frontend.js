/**
 * External dependencies
 */
import { withRestApiHydration } from '@woocommerce/block-hocs';
import { useCollection } from '@woocommerce/base-hooks';
import { RawHTML } from '@wordpress/element';

/**
 * Internal dependencies
 */
import FullCart from './full-cart';
import renderFrontend from '../../../utils/render-frontend.js';

/**
 * Wrapper component to supply API data and show empty cart view as needed.
 */
const CartFrontend = ( { emptyCart } ) => {
	const { results: cartData, isLoading } = useCollection( {
		namespace: '/wc/store',
		resourceName: 'cart',
	} );

	const cartItems = isLoading ? [] : cartData.items;
	const isCartEmpty = ! isLoading && cartItems.length <= 0;

	if ( isLoading ) {
		return null;
	}

	return isCartEmpty ? (
		<RawHTML>{ emptyCart }</RawHTML>
	) : (
		<FullCart cartItems={ cartItems } cartTotals={ cartData.totals } />
	);
};

const getProps = ( el ) => ( {
	emptyCart: el.innerHTML,
} );

renderFrontend(
	'.wp-block-woocommerce-cart',
	withRestApiHydration( CartFrontend ),
	getProps
);
