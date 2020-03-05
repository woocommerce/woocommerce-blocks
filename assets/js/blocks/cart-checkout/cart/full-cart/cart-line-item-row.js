/**
 * External dependencies
 */
import { RawHTML, useState, useEffect } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import QuantitySelector from '@woocommerce/base-components/quantity-selector';
import FormattedMonetaryAmount from '@woocommerce/base-components/formatted-monetary-amount';
import { getCurrency, formatPrice } from '@woocommerce/base-utils';
import { useStoreCartItem } from '@woocommerce/base-hooks';
import { Icon, trash } from '@woocommerce/icons';
import { useDebounce } from 'use-debounce';

/**
 * Internal dependencies
 */
import ProductVariationData from './product-variation-data';
import ProductImage from './product-image';
import ProductLowStockBadge from './product-low-stock-badge';

/**
 * Cart line item table row component.
 */
const CartLineItemRow = ( { lineItem = {} } ) => {
	const {
		key = '',
		name = '',
		summary = '',
		permalink = '',
		images = [],
		variation = [],
		quantity = 1,
		prices = {},
	} = lineItem;

	const currency = getCurrency();
	const regularPrice = parseInt( prices.regular_price, 10 ) * quantity;
	const purchasePrice = parseInt( prices.price, 10 ) * quantity;
	const saleAmount = regularPrice - purchasePrice;

	const {
		changeQuantity,
		removeItem,
		isPending: itemQuantityDisabled,
	} = useStoreCartItem( key );

	// Store item quantity in local state so the UI can update independently
	// of store/server updates.
	const [ localQuantity, updateLocalQuantity ] = useState( quantity );
	// Debounce updates to the local quantity value, and update the store
	// and server when value stablises.
	// Note that other dependent values in the row (e.g. total) are updated
	// independently (after debounce).
	const [ debouncedQuantity ] = useDebounce( localQuantity, 400 );
	useEffect( () => {
		if ( debouncedQuantity !== localQuantity ) {
			changeQuantity( debouncedQuantity );
		}
	}, [ debouncedQuantity ] );

	return (
		<tr className="wc-block-cart-items__row">
			<td className="wc-block-cart-item__image">
				<a href={ permalink }>
					<ProductImage image={ images.length ? images[ 0 ] : {} } />
				</a>
			</td>
			<td className="wc-block-cart-item__product">
				<a
					className="wc-block-cart-item__product-name"
					href={ permalink }
				>
					{ name }
				</a>
				<ProductLowStockBadge
					lowStockRemaining={ lineItem.low_stock_remaining }
				/>
				<div className="wc-block-cart-item__product-metadata">
					<RawHTML>{ summary }</RawHTML>
					<ProductVariationData variation={ variation } />
				</div>
			</td>
			<td className="wc-block-cart-item__quantity">
				<QuantitySelector
					disabled={ itemQuantityDisabled }
					quantity={ localQuantity }
					maximum={ lineItem.sold_individually ? 1 : undefined }
					onChange={ updateLocalQuantity }
					itemName={ name }
				/>
				<button
					disabled={ itemQuantityDisabled }
					className="wc-block-cart-item__remove-link"
					onClick={ removeItem }
				>
					{ __( 'Remove item', 'woo-gutenberg-products-block' ) }
				</button>
				<button
					disabled={ itemQuantityDisabled }
					className="wc-block-cart-item__remove-icon"
					onClick={ removeItem }
				>
					<Icon srcElement={ trash } />
				</button>
			</td>
			<td className="wc-block-cart-item__total">
				{ saleAmount > 0 && (
					<FormattedMonetaryAmount
						className="wc-block-cart-item__regular-price"
						currency={ currency }
						value={ regularPrice }
					/>
				) }
				<FormattedMonetaryAmount
					className="wc-block-cart-item__price"
					currency={ currency }
					value={ purchasePrice }
				/>
				{ saleAmount > 0 && (
					<div className="wc-block-cart-item__sale-badge">
						{ sprintf(
							/* translators: %s discount amount */
							__( 'Save %s!', 'woo-gutenberg-products-block' ),
							formatPrice( saleAmount, currency )
						) }
					</div>
				) }
			</td>
		</tr>
	);
};

CartLineItemRow.propTypes = {
	lineItem: PropTypes.shape( {
		key: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		summary: PropTypes.string.isRequired,
		images: PropTypes.array.isRequired,
		quantity: PropTypes.number.isRequired,
		low_stock_remaining: PropTypes.number,
		sold_individually: PropTypes.bool,
		variation: PropTypes.arrayOf(
			PropTypes.shape( {
				attribute: PropTypes.string.isRequired,
				value: PropTypes.string.isRequired,
			} )
		).isRequired,
		totals: PropTypes.shape( {
			line_subtotal: PropTypes.string.isRequired,
			line_total: PropTypes.string.isRequired,
		} ).isRequired,
		prices: PropTypes.shape( {
			price: PropTypes.string.isRequired,
			regular_price: PropTypes.string.isRequired,
		} ).isRequired,
	} ),
};

export default CartLineItemRow;
