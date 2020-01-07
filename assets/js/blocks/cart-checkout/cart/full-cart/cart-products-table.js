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
	const products = items.map( ( lineItem ) => {
		// TODO we'll need to handle srcset, correct image size
		const imageValid = lineItem.images && lineItem.images.length;
		const imageUrl = imageValid ? lineItem.images[ 0 ].src : '';
		const imageAltText = imageValid ? lineItem.images[ 0 ].alt : '';
		return (
			<CartProductsTableItem
				key={ lineItem.id }
				imageUrl={ imageUrl }
				imageAltText={ imageAltText }
				name={ lineItem.name }
				quantity={ lineItem.quantity }
				total={ lineItem.totals.line_total }
			/>
		);
	} );

	return (
		<table className="wc-block-cart__items">
			<tr>
				<th colSpan="2">
					{ __( 'Product', 'woo-gutenberg-products-block' ) }
				</th>
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
