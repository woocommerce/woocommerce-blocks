/**
 * External dependencies
 */
import { previewCartItems } from '@woocommerce/resource-previews';

/**
 * Internal dependencies
 */
import CheckoutButton from './checkout-button';
import CartProductsTitle from './cart-products-title';
import CartProductsTable from './cart-products-table';

import './style.scss';

/**
 * Component that renders the Cart block when user has something in cart aka "full".
 */
const Cart = () => {
	return (
		<div className="wc-block-cart">
			<div className="wc-block-cart__main">
				<CartProductsTitle itemCount={ previewCartItems.length } />
				<CartProductsTable items={ previewCartItems } />
			</div>
			<div className="wc-block-cart__sidebar">
				<CheckoutButton />
			</div>
		</div>
	);
};

Cart.propTypes = {};

export default Cart;
