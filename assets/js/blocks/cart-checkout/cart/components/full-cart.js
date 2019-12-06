/**
 * External dependencies
 */
import { Fragment } from '@wordpress/element';
import PropTypes from 'prop-types';

/**
 * Component to handle edit mode for the Cart block when user has something in cart aka "full".
 */
const Cart = () => {
	return (
		<Fragment>
			<h2>Shopping cart</h2>
			<span>
				Cart block <b>full state</b> coming soon…
			</span>
		</Fragment>
	);
};

Cart.propTypes = {
	/**
	 * The attributes for this block.
	 */
	attributes: PropTypes.object.isRequired,
};

export default Cart;
