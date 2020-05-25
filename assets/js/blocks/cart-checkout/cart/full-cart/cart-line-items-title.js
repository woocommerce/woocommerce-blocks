/**
 * External dependencies
 */
import { __, sprintf, _n } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import Title from '@woocommerce/base-components/title';

const CartLineItemsTitle = ( {
	title = __( 'Shopping cart', 'woo-gutenberg-products-block' ),
	itemCount = 1,
} ) => {
	const itemCountHeading = sprintf(
		_n( '%d item', '%d items', itemCount, 'woo-gutenberg-products-block' ),
		itemCount
	);
	const readableHeading = `${ title } – ${ itemCountHeading }`;

	return (
		<Title level="2" aria-label={ readableHeading }>
			<span>{ title } </span>
			{ !! itemCount && (
				<span className="wc-block-cart__item-count">
					{ itemCountHeading }
				</span>
			) }
		</Title>
	);
};

CartLineItemsTitle.propTypes = {
	title: PropTypes.string,
	itemCount: PropTypes.number,
};

export default CartLineItemsTitle;
