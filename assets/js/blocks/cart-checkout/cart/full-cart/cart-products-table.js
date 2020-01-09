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
	const products = lineItems.map( ( lineItem ) => {
		const imageProps = {};
		if ( lineItem.images && lineItem.images.length ) {
			imageProps.imageUrl = lineItem.images[ 0 ].src;
			imageProps.imageAltText = lineItem.images[ 0 ].alt;
			imageProps.imageSrcSet = lineItem.images[ 0 ].srcset;
			imageProps.imageSizes = lineItem.images[ 0 ].sizes;
		}
		return (
			<CartProductsTableItem
				key={ lineItem.id }
				name={ lineItem.name }
				quantity={ lineItem.quantity }
				subtotal={ lineItem.totals.line_subtotal }
				total={ lineItem.totals.line_total }
				{ ...imageProps }
			/>
		);
	} );

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
	lineItems: PropTypes.array,
};

export default CartProductsTable;
