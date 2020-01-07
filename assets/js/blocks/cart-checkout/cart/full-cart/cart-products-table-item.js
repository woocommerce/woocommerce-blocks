/**
 * External dependencies
 */
import PropTypes from 'prop-types';

const CartProductsTableItem = ( {
	name,
	imageUrl,
	imageAltText,
	quantity,
	total,
} ) => {
	return (
		<tr>
			<td className="wc-block-cart__items-image">
				<img src={ imageUrl } alt={ imageAltText } />
			</td>
			<td>{ name }</td>
			<td>{ quantity }</td>
			<td>{ total }</td>
		</tr>
	);
};

CartProductsTableItem.propTypes = {
	name: PropTypes.string,
	imageUrl: PropTypes.string,
	imageAltText: PropTypes.string,
	quantity: PropTypes.number,
	total: PropTypes.string,
};

export default CartProductsTableItem;
