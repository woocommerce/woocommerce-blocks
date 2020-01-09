/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import CartProductsTableItem from './cart-products-table-item';

const CartProductsTable = ( { lineItems = [] } ) => {
	const products = lineItems.map( ( lineItem ) => (
		<CartProductsTableItem key={ lineItem.id } lineItem={ lineItem } />
	) );

	return (
		<table className="wc-block-cart__table">
			<thead>
				<tr className="wc-block-cart__table-header">
					<th
						className="wc-block-cart__table-header-product"
						colSpan="2"
					>
						{ __( 'Product', 'woo-gutenberg-products-block' ) }
					</th>
					<th className="wc-block-cart__table-header-quantity">
						{ __( 'Quantity', 'woo-gutenberg-products-block' ) }
					</th>
					<th className="wc-block-cart__table-header-total">
						{ __( 'Total', 'woo-gutenberg-products-block' ) }
					</th>
				</tr>
			</thead>
			<tbody>{ products }</tbody>
		</table>
	);
};

CartProductsTable.propTypes = {
	lineItems: PropTypes.shape( {
		key: PropTypes.string.isRequired,
	} ),
};

export default CartProductsTable;
