/**
 * External dependencies
 */
import PropTypes from 'prop-types';

const CartProductsTableItem = ( { name, quantity, total } ) => {
	return (
		<tr>
			<td>{ name }</td>
			<td>{ quantity }</td>
			<td>{ total }</td>
		</tr>
	);
};

CartProductsTableItem.propTypes = {
	name: PropTypes.string,
	quantity: PropTypes.number,
	total: PropTypes.string,
};

export default CartProductsTableItem;
