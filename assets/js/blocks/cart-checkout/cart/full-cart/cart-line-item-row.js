/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import QuantitySelector from '@woocommerce/base-components/quantity-selector';
import { getCurrency } from '@woocommerce/base-utils';
import { useStoreCartItemQuantity } from '@woocommerce/base-hooks';
import { Icon, trash } from '@woocommerce/icons';
import { getSetting } from '@woocommerce/settings';
import {
	ProductImage,
	ProductLowStockBadge,
	ProductMetadata,
	ProductName,
	ProductPrice,
	ProductSaleBadge,
} from '@woocommerce/base-components/cart-checkout';
import Dinero from 'dinero.js';

/**
 * @typedef {import('@woocommerce/type-defs/cart').CartItem} CartItem
 */

/**
 *
 * @param {boolean}     backOrdersAllowed Whether to allow backorders or not.
 * @param {number|null} lowStockAmount    If present the number of stock
 *                                        remaining.
 *
 * @return {number} The maximum number value for the quantity input.
 */
const getMaximumQuantity = ( backOrdersAllowed, lowStockAmount ) => {
	const maxQuantityLimit = getSetting( 'quantitySelectLimit', 99 );
	if ( backOrdersAllowed || ! lowStockAmount ) {
		return maxQuantityLimit;
	}
	return Math.min( lowStockAmount, maxQuantityLimit );
};

/**
 * Cart line item table row component.
 */
const CartLineItemRow = ( { lineItem } ) => {
	const {
		name,
		summary,
		low_stock_remaining: lowStockRemaining = null,
		backorders_allowed: backOrdersAllowed,
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

	const currency = getCurrency( prices );
	const regularPrice = Dinero( {
		amount: parseInt( prices.raw_prices.regular_price, 10 ),
		precision: parseInt( prices.raw_prices.precision, 10 ),
	} ).multiply( quantity );
	const purchasePrice = Dinero( {
		amount: parseInt( prices.raw_prices.price, 10 ),
		precision: parseInt( prices.raw_prices.precision, 10 ),
	} ).multiply( quantity );
	const saleAmount = regularPrice.subtract( purchasePrice );

	return (
		<tr className="wc-block-cart-items__row">
			<td className="wc-block-cart-item__image">
				<a href={ permalink }>
					<ProductImage image={ images.length ? images[ 0 ] : {} } />
				</a>
			</td>
			<td className="wc-block-cart-item__product">
				<ProductName permalink={ permalink } name={ name } />
				<ProductLowStockBadge lowStockRemaining={ lowStockRemaining } />
				<ProductMetadata summary={ summary } variation={ variation } />
			</td>
			<td className="wc-block-cart-item__quantity">
				<QuantitySelector
					disabled={ itemQuantityDisabled }
					quantity={ quantity }
					maximum={ getMaximumQuantity(
						backOrdersAllowed,
						lowStockRemaining
					) }
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
				<ProductPrice
					currency={ currency }
					regularValue={ regularPrice
						.convertPrecision( currency.minorUnit )
						.getAmount() }
					value={ purchasePrice
						.convertPrecision( currency.minorUnit )
						.getAmount() }
				/>
				<ProductSaleBadge
					currency={ currency }
					saleAmount={ saleAmount
						.convertPrecision( currency.minorUnit )
						.getAmount() }
				/>
			</td>
		</tr>
	);
};

CartLineItemRow.propTypes = {
	lineItem: PropTypes.object.isRequired,
};

export default CartLineItemRow;
