/**
 * External dependencies
 */
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import QuantitySelector from '@woocommerce/base-components/quantity-selector';
import ProductPrice from '@woocommerce/base-components/product-price';
import ProductName from '@woocommerce/base-components/product-name';
import { useStoreCartItemQuantity } from '@woocommerce/base-hooks';
import {
	ProductBackorderBadge,
	ProductImage,
	ProductLowStockBadge,
	ProductMetadata,
	ProductSaleBadge,
} from '@woocommerce/base-components/cart-checkout';
import { getCurrency } from '@woocommerce/price-format';
import { __experimentalApplyCheckoutFilter } from '@woocommerce/blocks-checkout';
import Dinero from 'dinero.js';
import { DISPLAY_CART_PRICES_INCLUDING_TAX } from '@woocommerce/block-settings';

/**
 * @typedef {import('@woocommerce/type-defs/cart').CartItem} CartItem
 */

/**
 * Convert a Dinero object with precision to store currency minor unit.
 *
 * @param {Dinero} priceObject Price object to convert.
 * @param {Object} currency    Currency data.
 * @return {number} Amount with new minor unit precision.
 */
const getAmountFromRawPrice = ( priceObject, currency ) => {
	return priceObject.convertPrecision( currency.minorUnit ).getAmount();
};

/**
 * Cart line item table row component.
 *
 * @param {Object} props
 * @param {CartItem|Object} props.lineItem
 */
const CartLineItemRow = ( { lineItem = {} } ) => {
	const {
		name: initialName = '',
		catalog_visibility: catalogVisibility = '',
		short_description: shortDescription = '',
		description: fullDescription = '',
		low_stock_remaining: lowStockRemaining = null,
		show_backorder_badge: showBackorderBadge = false,
		quantity_limit: quantityLimit = 99,
		permalink = '',
		images = [],
		variation = [],
		item_data: itemData = [],
		prices = {
			currency_code: 'USD',
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
			raw_prices: {
				precision: 6,
				price: '0',
				regular_price: '0',
				sale_price: '0',
			},
		},
		totals = {
			currency_code: 'USD',
			currency_minor_unit: 2,
			currency_symbol: '$',
			currency_prefix: '$',
			currency_suffix: '',
			currency_decimal_separator: '.',
			currency_thousand_separator: ',',
			line_total: '0',
			line_total_tax: '0',
		},
		extensions,
	} = lineItem;

	const {
		quantity,
		changeQuantity,
		removeItem,
		isPendingDelete,
	} = useStoreCartItemQuantity( lineItem );

	const priceCurrency = getCurrency( prices );

	const name = __experimentalApplyCheckoutFilter( {
		filterName: 'itemName',
		defaultValue: initialName,
		arg: {
			extensions,
			context: 'cart',
		},
		validation: ( value ) => typeof value === 'string',
	} );

	const regularAmountSingle = Dinero( {
		amount: parseInt( prices.raw_prices.regular_price, 10 ),
		precision: parseInt( prices.raw_prices.precision, 10 ),
	} );
	const purchaseAmountSingle = Dinero( {
		amount: parseInt( prices.raw_prices.price, 10 ),
		precision: parseInt( prices.raw_prices.precision, 10 ),
	} );
	const saleAmountSingle = regularAmountSingle.subtract(
		purchaseAmountSingle
	);
	const saleAmount = saleAmountSingle.multiply( quantity );
	const totalsCurrency = getCurrency( totals );
	let lineTotal = parseInt( totals.line_total, 10 );
	if ( DISPLAY_CART_PRICES_INCLUDING_TAX ) {
		lineTotal += parseInt( totals.line_total_tax, 10 );
	}
	const totalsPrice = Dinero( {
		amount: lineTotal,
	} );

	const firstImage = images.length ? images[ 0 ] : {};
	const isProductHiddenFromCatalog =
		catalogVisibility === 'hidden' || catalogVisibility === 'search';

	// Allow extensions to filter how the price is displayed. Ie: prepending or appending some values.
	const productPriceFormat = __experimentalApplyCheckoutFilter( {
		filterName: 'cartItemPrice',
		defaultValue: '<price/>',
		arg: {
			cartItem: lineItem,
			block: 'cart',
		},
		validation: ( value ) =>
			typeof value === 'string' && value.includes( '<price/>' ),
	} );

	const subtotalPriceFormat = __experimentalApplyCheckoutFilter( {
		filterName: 'subtotalPriceFormat',
		defaultValue: '<price/>',
		arg: {
			lineItem,
		},
		// Only accept strings.
		validation: ( value ) =>
			typeof value === 'string' && value.includes( '<price/>' ),
	} );

	const saleBadgePriceFormat = __experimentalApplyCheckoutFilter( {
		filterName: 'saleBadgePriceFormat',
		defaultValue: '<price/>',
		arg: {
			lineItem,
		},
		// Only accept strings.
		validation: ( value ) =>
			typeof value === 'string' && value.includes( '<price/>' ),
	} );

	return (
		<tr
			className={ classnames( 'wc-block-cart-items__row', {
				'is-disabled': isPendingDelete,
			} ) }
		>
			{ /* If the image has no alt text, this link is unnecessary and can be hidden. */ }
			<td
				className="wc-block-cart-item__image"
				aria-hidden={ ! firstImage.alt }
			>
				{ /* We don't need to make it focusable, because product name has the same link. */ }
				{ isProductHiddenFromCatalog ? (
					<ProductImage image={ firstImage } />
				) : (
					<a href={ permalink } tabIndex={ -1 }>
						<ProductImage image={ firstImage } />
					</a>
				) }
			</td>
			<td className="wc-block-cart-item__product">
				<ProductName
					disabled={ isPendingDelete || isProductHiddenFromCatalog }
					name={ name }
					permalink={ permalink }
				/>
				{ showBackorderBadge ? (
					<ProductBackorderBadge />
				) : (
					!! lowStockRemaining && (
						<ProductLowStockBadge
							lowStockRemaining={ lowStockRemaining }
						/>
					)
				) }

				<div className="wc-block-cart-item__prices">
					<ProductPrice
						currency={ priceCurrency }
						regularPrice={ getAmountFromRawPrice(
							regularAmountSingle,
							priceCurrency
						) }
						price={ getAmountFromRawPrice(
							purchaseAmountSingle,
							priceCurrency
						) }
						format={ subtotalPriceFormat }
					/>
				</div>

				<ProductSaleBadge
					currency={ priceCurrency }
					saleAmount={ getAmountFromRawPrice(
						saleAmountSingle,
						priceCurrency
					) }
					format={ saleBadgePriceFormat }
				/>

				<ProductMetadata
					shortDescription={ shortDescription }
					fullDescription={ fullDescription }
					itemData={ itemData }
					variation={ variation }
				/>

				<div className="wc-block-cart-item__quantity">
					<QuantitySelector
						disabled={ isPendingDelete }
						quantity={ quantity }
						maximum={ quantityLimit }
						onChange={ changeQuantity }
						itemName={ name }
					/>
					<button
						className="wc-block-cart-item__remove-link"
						onClick={ removeItem }
						disabled={ isPendingDelete }
					>
						{ __( 'Remove item', 'woo-gutenberg-products-block' ) }
					</button>
				</div>
			</td>
			<td className="wc-block-cart-item__total">
				<ProductPrice
					currency={ totalsCurrency }
					format={ productPriceFormat }
					price={ getAmountFromRawPrice(
						totalsPrice,
						totalsCurrency
					) }
				/>

				{ quantity > 1 && (
					<ProductSaleBadge
						currency={ priceCurrency }
						saleAmount={ getAmountFromRawPrice(
							saleAmount,
							priceCurrency
						) }
						format={ saleBadgePriceFormat }
					/>
				) }
			</td>
		</tr>
	);
};

CartLineItemRow.propTypes = {
	lineItem: PropTypes.object,
};

export default CartLineItemRow;
