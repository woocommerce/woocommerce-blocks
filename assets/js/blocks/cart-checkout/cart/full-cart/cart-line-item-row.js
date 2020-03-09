/**
 * External dependencies
 */
import { RawHTML } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import QuantitySelector from '@woocommerce/base-components/quantity-selector';
import FormattedMonetaryAmount from '@woocommerce/base-components/formatted-monetary-amount';
import { getCurrency, formatPrice } from '@woocommerce/base-utils';
import { useStoreCartItemQuantity } from '@woocommerce/base-hooks';
import { Icon, trash } from '@woocommerce/icons';

/**
 * Internal dependencies
 */
import ProductVariationData from './product-variation-data';
import ProductImage from './product-image';
import ProductLowStockBadge from './product-low-stock-badge';

/**
 * Cart line item table row component.
 */
const CartLineItemRow = ( {
	lineItem = {
		key: '',
		id: 0,
		quantity: 0,
		name: '',
		summary: '',
		short_description: '',
		sku: '',
		remaining_stock: null,
		low_stock_remaining: null,
		sold_individually: false,
		permalink: '',
		images: [],
		variation: [],
		prices: {
			currency_code: 'US',
			currency_minor_unit: 2,
			currency_symbol: '$',
			currency_prefix: '$',
			currency_suffix: '',
			currency_decimal_separator: '.',
			currency_thousand_separator: ',',
			price: '0',
			regular_price: '0',
			sale_price: '0',
			price_range: null,
		},
		totals: {
			currency_code: 'US',
			currency_minor_unit: 2,
			currency_symbol: '$',
			currency_prefix: '$',
			currency_suffix: '',
			currency_decimal_separator: '.',
			currency_thousand_separator: ',',
			line_subtotal: '0',
			line_subtotal_tax: '0',
			line_total: '0',
			line_total_tax: '0',
		},
	},
} ) => {
	/**
	 * @type {import('@woocommerce/type-defs/cart').CartItem}
	 */
	const {
		name,
		summary,
		remaining_stock: remainingStock,
		permalink,
		images,
		variation,
		prices,
	} = lineItem;

	const {
		quantity,
		changeQuantity,
		removeItem,
		isPending: itemQuantityDisabled,
	} = useStoreCartItemQuantity( lineItem );

	const currency = getCurrency( {
		currency_code: prices.currency_code,
		currency_minor_unit: prices.currency_minor_unit,
		currency_symbol: prices.currency_symbol,
		currency_prefix: prices.currency_prefix,
		currency_suffix: prices.currency_suffix,
		currency_decimal_separator: prices.currency_decimal_separator,
		currency_thousand_separator: prices.currency_thousand_separator,
	} );
	const regularPrice = parseInt( prices.regular_price, 10 ) * quantity;
	const purchasePrice = parseInt( prices.price, 10 ) * quantity;
	const saleAmount = regularPrice - purchasePrice;
	let maximum = lineItem.sold_individually ? 1 : undefined;
	// account for stock
	maximum = ! maximum && remainingStock ? remainingStock : maximum;

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
					quantity={ quantity }
					maximum={ maximum }
					onChange={ changeQuantity }
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
		remaining_stock: PropTypes.number,
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
