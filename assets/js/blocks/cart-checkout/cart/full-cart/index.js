/**
 * Internal dependencies
 */
import CheckoutButton from './checkout-button';
import CartProductsTitle from './cart-products-title';
import './style.scss';

/**
 * Component that renders the Cart block when user has something in cart aka "full".
 */
const Cart = () => {
	return (
		<div className="wc-block-cart">
			<div className="wc-block-cart__main">
				<CartProductsTitle />
				<span>
					Cart <b>line items</b> coming soon…
				</span>
			</div>
			<div className="wc-block-cart__sidebar">
				<CheckoutButton />
			</div>
		</div>
	);
};

Cart.propTypes = {};

export default Cart;
