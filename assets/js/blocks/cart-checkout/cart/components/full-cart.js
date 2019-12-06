/**
 * External dependencies
 */
import { sprintf, _n } from '@wordpress/i18n';
import PropTypes from 'prop-types';

const CartProductsTable = () => {
	return 'Coming soon!';
}

const CartLineItems = ( { className, ...props } ) => {
	const { lineItems } = props;

	const itemCountHeading = sprintf( _n( '%d item', '%d items', lineItems.length, 'woo-gutenberg-products-block' ), lineItems.length );

	return (
		<div className={ className }>
			<h2>
				<span>Shopping cart</span>
				<span className='wc-blocks-cart__item-count'>{ itemCountHeading }</span>
			</h2>
			<CartProductsTable />
		</div>
	);

}

const sampleCartData = {
	lineItems: [
		{
			name: 'Beanie',
			itemPrice: 18.0,
			quantity: 2,
			linePrice: 36.0,
		},
		{
			name: 'Hoodie',
			itemPrice: 135.0,
			quantity: 3,
			linePrice: 36.0,
		}
	]
};

/**
 * Component to handle edit mode for the Cart block when user has something in cart aka "full".
 */
const Cart = () => {
	return ( <CartLineItems className='wc-blocks-cart' { ...sampleCartData } /> );
};

Cart.propTypes = {
	/**
	 * The attributes for this block.
	 */
	attributes: PropTypes.object.isRequired,
};

export default Cart;
