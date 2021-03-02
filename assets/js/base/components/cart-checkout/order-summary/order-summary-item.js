/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import Label from '@woocommerce/base-components/label';
import ProductPrice from '@woocommerce/base-components/product-price';
import ProductName from '@woocommerce/base-components/product-name';
import { getCurrencyFromPriceResponse } from '@woocommerce/price-format';
import {
	__experimentalApplyCheckoutFilter,
	mustBeString,
	mustContain,
} from '@woocommerce/blocks-checkout';
import PropTypes from 'prop-types';
import Dinero from 'dinero.js';
import { DISPLAY_CART_PRICES_INCLUDING_TAX } from '@woocommerce/block-settings';
import { useCallback, useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import ProductBackorderBadge from '../product-backorder-badge';
import ProductImage from '../product-image';
import ProductLowStockBadge from '../product-low-stock-badge';
import ProductMetadata from '../product-metadata';

const OrderSummaryItem = ( { cartItem } ) => {
	const {
		images,
		low_stock_remaining: lowStockRemaining = null,
		show_backorder_badge: showBackorderBadge = false,
		name: initialName,
		permalink,
		prices,
		quantity,
		short_description: shortDescription,
		description: fullDescription,
		item_data: itemData = [],
		variation,
		totals,
		extensions,
	} = cartItem;

	const productPriceValidation = useCallback(
		( value ) => mustBeString( value ) && mustContain( value, '<price/>' ),
		[]
	);

	const arg = useMemo(
		() => ( {
			context: 'summary',
			cartItem,
		} ),
		[ cartItem ]
	);

	const priceCurrency = getCurrencyFromPriceResponse( prices );

	const name = __experimentalApplyCheckoutFilter( {
		filterName: 'itemName',
		defaultValue: initialName,
		extensions,
		arg,
		validation: mustBeString,
	} );

	const regularPriceSingle = Dinero( {
		amount: parseInt( prices.raw_prices.regular_price, 10 ),
		precision: parseInt( prices.raw_prices.precision, 10 ),
	} )
		.convertPrecision( priceCurrency.minorUnit )
		.getAmount();
	const priceSingle = Dinero( {
		amount: parseInt( prices.raw_prices.price, 10 ),
		precision: parseInt( prices.raw_prices.precision, 10 ),
	} )
		.convertPrecision( priceCurrency.minorUnit )
		.getAmount();
	const totalsCurrency = getCurrencyFromPriceResponse( totals );

	let lineSubtotal = parseInt( totals.line_subtotal, 10 );
	if ( DISPLAY_CART_PRICES_INCLUDING_TAX ) {
		lineSubtotal += parseInt( totals.line_subtotal_tax, 10 );
	}
	const subtotalPrice = Dinero( {
		amount: lineSubtotal,
		precision: totalsCurrency.minorUnit,
	} ).getAmount();
	const subtotalPriceFormat = __experimentalApplyCheckoutFilter( {
		filterName: 'subtotalPriceFormat',
		defaultValue: '<price/>',
		extensions,
		arg,
		validation: productPriceValidation,
	} );

	// Allow extensions to filter how the price is displayed. Ie: prepending or appending some values.
	const productPriceFormat = __experimentalApplyCheckoutFilter( {
		filterName: 'cartItemPrice',
		defaultValue: '<price/>',
		extensions,
		arg,
		validation: productPriceValidation,
	} );

	return (
		<div className="wc-block-components-order-summary-item">
			<div className="wc-block-components-order-summary-item__image">
				<div className="wc-block-components-order-summary-item__quantity">
					<Label
						label={ quantity }
						screenReaderLabel={ sprintf(
							/* translators: %d number of products of the same type in the cart */
							__( '%d items', 'woo-gutenberg-products-block' ),
							quantity
						) }
					/>
				</div>
				<ProductImage image={ images.length ? images[ 0 ] : {} } />
			</div>
			<div className="wc-block-components-order-summary-item__description">
				<ProductName
					disabled={ true }
					name={ name }
					permalink={ permalink }
				/>
				<ProductPrice
					currency={ priceCurrency }
					price={ priceSingle }
					regularPrice={ regularPriceSingle }
					className="wc-block-components-order-summary-item__individual-prices"
					priceClassName="wc-block-components-order-summary-item__individual-price"
					regularPriceClassName="wc-block-components-order-summary-item__regular-individual-price"
					format={ subtotalPriceFormat }
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
				<ProductMetadata
					shortDescription={ shortDescription }
					fullDescription={ fullDescription }
					itemData={ itemData }
					variation={ variation }
				/>
			</div>
			<div className="wc-block-components-order-summary-item__total-price">
				<ProductPrice
					currency={ totalsCurrency }
					format={ productPriceFormat }
					price={ subtotalPrice }
				/>
			</div>
		</div>
	);
};

OrderSummaryItem.propTypes = {
	cartItems: PropTypes.shape( {
		images: PropTypes.array,
		low_stock_remaining: PropTypes.number,
		name: PropTypes.string.isRequired,
		permalink: PropTypes.string,
		prices: PropTypes.shape( {
			price: PropTypes.string,
			regular_price: PropTypes.string,
		} ),
		quantity: PropTypes.number,
		summary: PropTypes.string,
		variation: PropTypes.array,
	} ),
};

export default OrderSummaryItem;
