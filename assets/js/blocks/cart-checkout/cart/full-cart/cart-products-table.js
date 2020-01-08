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
		<div className="wc-block-cart__table">
			<div className="wc-block-cart__table-header">
				<div className="wc-block-cart__table-header-product">
					{ __( 'Product', 'woo-gutenberg-products-block' ) }
				</div>
				<div className="wc-block-cart__table-header-quantity">
					{ __( 'Quantity', 'woo-gutenberg-products-block' ) }
				</div>
				<div className="wc-block-cart__table-header-total">
					{ __( 'Total', 'woo-gutenberg-products-block' ) }
				</div>
			</div>
			{ products }
		</div>
	);
};

CartProductsTable.propTypes = {
	items: PropTypes.array,
};

export default CartProductsTable;
