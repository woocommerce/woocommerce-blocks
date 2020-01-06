/**
 * External dependencies
 */
import { __, sprintf, _n } from '@wordpress/i18n';
import PropTypes from 'prop-types';

const CartProductsTitle = ( {
	title = __(
		'Shopping cart',
		'woo-gutenberg-products-block'
	),
	itemCount = 1,
} ) => {
	const itemCountHeading = sprintf( _n( '%d item', '%d items', itemCount, 'woo-gutenberg-products-block' ), itemCount );
	return (
		<h3>
			<span>{ title } </span>
			<span className='wc-block-cart__item-count'>{ itemCountHeading }</span>
		</h3>
	);
};

CartProductsTitle.propTypes = {
	title: PropTypes.string,
	itemCount: PropTypes.number,
};

export default CartProductsTitle;
