/**
 * External dependencies
 */
import { __, sprintf, _n } from '@wordpress/i18n';
import PropTypes from 'prop-types';

const CartLineItemsTitle = ( {
	title = __( 'Shopping cart', 'woo-gutenberg-products-block' ),
	itemCount = 1,
} ) => {
	const itemCountHeading = sprintf(
		_n( '%d item', '%d items', itemCount, 'woo-gutenberg-products-block' ),
		itemCount
	);
	return (
		<h2>
			<span>{ title } </span>
			<span className="wc-block-cart__item-count">
				{ itemCountHeading }
			</span>
		</h2>
	);
};

CartLineItemsTitle.propTypes = {
	title: PropTypes.string,
	itemCount: PropTypes.number,
};

export default CartLineItemsTitle;
