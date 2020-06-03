/**
 * External dependencies
 */
import { _n, sprintf } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import Title from '@woocommerce/base-components/title';

const CartLineItemsTitle = ( { itemCount = 0, productCount = 0 } ) => {
	const productCountHeading = sprintf(
		_n(
			'%d product',
			'%d products',
			productCount,
			'woo-gutenberg-products-block'
		),
		productCount
	);
	const itemCountHeading = sprintf(
		_n( '%d item', '%d items', itemCount, 'woo-gutenberg-products-block' ),
		itemCount
	);

	return (
		<Title headingLevel="2">
			<span className="wc-block-cart__product-count">
				{ productCountHeading }
			</span>
			<span className="wc-block-cart__item-count">
				{ itemCountHeading }
			</span>
		</Title>
	);
};

CartLineItemsTitle.propTypes = {
	itemCount: PropTypes.number,
	productCount: PropTypes.number,
};

export default CartLineItemsTitle;
