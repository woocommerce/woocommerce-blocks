/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import CartProductsTableItem from './cart-products-table-item';

const CartProductsTable = ( { items = [] } ) => {
	const products = items.map( lineItem =>
		<CartProductsTableItem
			key={ lineItem.id }
			name={ lineItem.name }
			quantity={ lineItem.quantity }
			total={ lineItem.totals.line_total }
		/>
	 );

	return (
		<table>
			<tr>
				<th>{ __( 'Product', 'woo-gutenberg-products-block' ) }</th>
				<th>{ __( 'Quantity', 'woo-gutenberg-products-block' ) }</th>
				<th>{ __( 'Total', 'woo-gutenberg-products-block' ) }</th>
			</tr>
			{ products }
		</table>
	);
};

CartProductsTable.propTypes = {
	items: PropTypes.array,
};

export default CartProductsTable;
